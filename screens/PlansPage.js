import { React, useState, useEffect } from 'react';
import { Text, View, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { supabase } from '../supabaseClient';

import {
  StyledContainer,
  InnerContainer,
  ScrollContainer,
  PageTitle2,
  PlanspageView,
  FitnessnDietView,
  SubTitleView,
  DateText,
  DateTextView,
  WeeksView,
  WeeksText,
  ExerciseSwitch,
  ExerciseView,
  ExerciseText,
  Colors,
  StyledButton,
  ButtonText,
  ExerciseDoneText,
  DietView1,
  DietView2,
  DietText,
  DietTextView,
  DietIconView,
} from '../components/styles';
// Progress Bar
import CircularProgress from 'react-native-circular-progress-indicator';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { set } from 'react-native-reanimated';
import { getDrawerStatusFromState } from '@react-navigation/drawer';

// Import Icons
import { Ionicons } from '@expo/vector-icons';

// Colors
const { primary, secondary, grey, black, tertiary } = Colors;

const PlansPage = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(0);
  const [plan, setPlan] = useState([]);
  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState('');
  const [BMR, setBMR] = useState('');
  //sample styling without selecting plans from Exercise table in supabase
  //after using real data from supabase, need to add useState variables for multiple switches
  const [completed, setCompleted] = useState(false);
  const [fullDate, setFullDate] = useState(null);

  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDate = () => {
    let today = new Date();
    let date = today.getDate();
    let day = days[today.getDay()];
    let month = months[today.getMonth()];
    setFullDate(day + '     ' + month + ' ' + date);
    console.log(fullDate);
  };

  // Get user health data
  async function getHealthData() {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    return data[0];
  }

  // Get Fitness Plan
  async function getPlan() {
    //console.log("plan running")
    const { data, error } = await supabase
      .from('Exercise')
      .select()
      .eq('id', supabase.auth.user().id)
      .order('Day', { ascending: true });
    setPlan(data);
  }

  // Get BMR from supabase
  async function handleBMR() {
    const data = await getHealthData();
    let bmr = data.BMR;
    setBMR(bmr);
  }
  handleBMR();

  // Render once only
  useEffect(() => {
    getPlan();
    getDate();
  }, []);

  // Updates when plan state is updated
  useEffect(() => {
    getPlan();
    getProgress();
  }, [plan]);

  // Get Percentage of Excercises completed this week
  async function getProgress() {
    let { data, error, status } = await supabase
      .from('Exercise')
      .select('*', { count: 'exact' }) // if you don't want to return any rows, you can use { count: 'exact', head: true }
      .eq('id', supabase.auth.user().id)
      .eq('Status', 1);
    let result = (data.length / plan.length) * 100;
    //console.log(data.length/plan.length * 100);
    if (isFinite(result)) {
      setProgress(result);
    } else {
      setProgress(0);
    }
    //console.log('progress ' + progress);
  }

  function progressValue(i) {
    if (typeof i == 'number') {
      console.log('lol');
      return i;
    } else {
      return 0;
    }
  }

  return (
    <StyledContainer>
      <ScrollContainer>
        <PageTitle2>Personal Plans</PageTitle2>

        <PlanspageView>
          <CircularProgress
            radius={110}
            value={progress}
            title={`Weekly Goal Completed`}
            titleFontSize={12}
            titleStyle={{ fontWeight: 'bold' }}
            fontSize={20}
            valueSuffix={'%'}
            subtitle={fullDate}
            subtitleFontSize={16}
            subtitleColor={black}
            subtitleStyle={{ fontWeight: 'bold' }}
            activeStrokeColor={secondary}
            inActiveStrokeColor={grey}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={6}
            duration={2000}
            onAnimationComplete={() => setValue(50)}
          />
        </PlanspageView>
        {/*<DateTextView>
          <DateText> {fullDate} </DateText>
        </DateTextView>
        <Button color="red" onPress={() => getHealthData()}>
          Health Data
        </Button>
        <Button color="red" onPress={() => getPlan()}>
          get plan
        </Button>
        <Button color="red" onPress={() => getProgress()}>
          get progress
        </Button>
        */}
        <StyledButton onPress={() => navigation.navigate('ExercisePage')}>
          <ButtonText>Fitness Plan</ButtonText>
        </StyledButton>
        <FitnessnDietView>
          <DietView1>
            <DietText>{fullDate}</DietText>
          </DietView1>
          <DietView2>
            <DietTextView>
              <DietText>Recommended Calories Intake: {BMR}</DietText>
            </DietTextView>
            <DietIconView>
              <Ionicons name={'flame-outline'} size={50} color={tertiary} />
            </DietIconView>
          </DietView2>
          <StyledButton onPress={() => navigation.navigate('DietPage')}>
            <ButtonText>Diet Plan</ButtonText>
          </StyledButton>
        </FitnessnDietView>
      </ScrollContainer>
    </StyledContainer>
  );
};

export default PlansPage;

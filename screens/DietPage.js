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
  SubTitleView,
  WeeksView,
  WeeksText,
  ExerciseSwitch,
  ExerciseView,
  ExerciseText,
  Colors,
  StyledButton,
  ButtonText,
  DietView1,
  DietView2,
  DietText,
  DietIconView,
  DietTextView,
  MealView,
  MealTextView,
  MealTitle,
  MealText,
} from '../components/styles';
// Progress Bar
import { Header } from 'react-native/Libraries/NewAppScreen';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { or, set } from 'react-native-reanimated';

// import icons
import { Ionicons } from '@expo/vector-icons';

// Colors
const { primary, secondary, tertiary, grey } = Colors;

const DietPage = () => {
  const navigation = useNavigation();
  const [plan, setPlan] = useState([]);
  const [fullDate, setFullDate] = useState(null);
  const [day, setDay] = useState('');
  const [dayName, setDayName] = useState('');
  const [BMR, setBMR] = useState(null);

  // Get user health data
  async function getHealthData() {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    return data[0];
  }

  // Get BMR from supabase
  async function handleBMR() {
    const data = await getHealthData();
    let bmr = data.BMR;
    setBMR(bmr);
  }

  // Get date
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
    let day = today.getDay();
    let dayName = days[day];
    let month = months[today.getMonth()];
    setFullDate(dayName + ' ' + month + ' ' + date);
    setDay(day);
    setDayName(dayName);
    console.log(fullDate);
  };

  // Get Diet Plan
  async function getPlan() {
    //console.log("plan running")
    const { data, error } = await supabase
      .from('Diet')
      .select()
      .eq('id', supabase.auth.user().id)
      .order('Day', { ascending: true });
    setPlan(data);
  }

  // Render once only
  useEffect(() => {
    handleBMR();
    getDate();
    getPlan();
  }, []);

  return (
    <StyledContainer>
      <ScrollContainer>
        <PageTitle2>Your Weekly Diet Plan</PageTitle2>
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
        <View>
          {plan.map((item, i) => {
            if (i == day)
              return (
                <View key={i}>
                  <MealView>
                    <DietIconView>
                      <Ionicons
                        name={'cafe-outline'}
                        size={55}
                        color={secondary}
                      />
                    </DietIconView>
                    <MealTextView>
                      <MealTitle>Breakfast</MealTitle>
                      <MealText>{item.Breakfast}</MealText>
                    </MealTextView>
                  </MealView>
                  <MealView>
                    <DietIconView>
                      <Ionicons
                        name={'restaurant-outline'}
                        size={55}
                        color={secondary}
                      />
                    </DietIconView>
                    <MealTextView>
                      <MealTitle>Lunch</MealTitle>
                      <MealText>{item.Lunch}</MealText>
                    </MealTextView>
                  </MealView>
                  <MealView>
                    <DietIconView>
                      <Ionicons
                        name={'fast-food-outline'}
                        size={55}
                        color={secondary}
                      />
                    </DietIconView>
                    <MealTextView>
                      <MealTitle>Dinner</MealTitle>
                      <MealText>{item.Dinner}</MealText>
                    </MealTextView>
                  </MealView>
                  <MealView>
                    <DietIconView>
                      <Ionicons
                        name={'nutrition-outline'}
                        size={55}
                        color={secondary}
                      />
                    </DietIconView>
                    <MealTextView>
                      <MealTitle>Snack</MealTitle>
                      <MealText>{item.Lunch}</MealText>
                    </MealTextView>
                  </MealView>
                </View>
              );
          })}
        </View>

        {/*
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
        <StyledButton onPress={() => navigation.navigate('PlansPage')}>
          <ButtonText>Back</ButtonText>
        </StyledButton>
      </ScrollContainer>
    </StyledContainer>
  );
};

export default DietPage;

import { React, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { signOut, supabase } from '../supabaseClient';

import RNSpeedometer from 'react-native-speedometer';
import {
  StyledContainer,
  InnerContainer,
  ScrollContainer,
  PageTitle2,
  SubTitleView,
  DataViewR1,
  DataViewR2,
  DataTextR,
  BMRImage,
} from '../components/styles';

const ReportPage = () => {
  const navigation = useNavigation();
  const [BMI, setBMI] = useState('');
  const [BFP, setBFP] = useState('');
  const [BMR, setBMR] = useState('');

  const [isMale, setIsMale] = useState('');

  // Get User Input Data
  async function getHealthData() {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    //.then(response => {return response})
    //console.log(data[0]);
    return data[0];
  }

  // get User Gender
  async function checkGender() {
    const data = await getHealthData();
    data.Gender == 'male' ? setIsMale(true) : setIsMale(false);
    //console.log(isMale);
  }

  // Get BMR, BMI & BFP from supabase
  async function handleReportData() {
    const data = await getHealthData();
    setBMR(data.BMR);
    setBMI(data.BMI);
    setBFP(data.BFP);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      handleReportData();
    });
    return unsubscribe;
  }, [navigation]);

  // Get Supabase session data
  async function getSessionData() {
    const session = supabase.auth.session();
    console.log(session);
  }

  return (
    <StyledContainer>
      <ScrollContainer>
        <PageTitle2>Your Report</PageTitle2>
        <DataViewR1>
          <DataTextR>Your BMI: </DataTextR>
          <RNSpeedometer
            value={parseFloat(BMI)}
            minValue={15.1}
            maxValue={28.3}
            size={200}
            allowedDecimals={2}
            labels={[
              {
                name: 'Underweight',
                labelColor: 'dodgerblue',
                activeBarColor: 'dodgerblue',
              },
              {
                name: 'Normal',
                labelColor: 'forestgreen',
                activeBarColor: 'forestgreen',
              },
              {
                name: 'Overweight',
                labelColor: 'orange',
                activeBarColor: 'orange',
              },
            ]}
          />
        </DataViewR1>
        <DataViewR1>
          <DataTextR>Your BFP: </DataTextR>
          {isMale ? (
            <RNSpeedometer
              value={parseInt(BFP)}
              minValue={12.5}
              maxValue={36.5}
              size={200}
              allowedDecimals={0}
              labels={[
                {
                  name: 'Healthy ',
                  labelColor: 'forestgreen',
                  activeBarColor: 'forestgreen',
                },
                {
                  name: 'Healthy',
                  labelColor: 'forestgreen',
                  activeBarColor: 'forestgreen',
                },
                {
                  name: 'Slightly Overweight',
                  labelColor: 'orange',
                  activeBarColor: 'orange',
                },
                {
                  name: 'Moderately Overweight',
                  labelColor: 'orangered',
                  activeBarColor: 'orangered',
                },
                {
                  name: 'Extremely Overweight',
                  labelColor: 'orangered',
                  activeBarColor: 'orangered',
                },
                {
                  name: 'Extremely Overweight ',
                  labelColor: 'orangered',
                  activeBarColor: 'orangered',
                },
              ]}
            />
          ) : (
            <RNSpeedometer
              value={parseInt(BFP)}
              minValue={14.5}
              maxValue={40}
              size={200}
              allowedDecimals={0}
              labels={[
                {
                  name: 'Underfat',
                  labelColor: 'dodgerblue',
                  activeBarColor: 'dodgerblue',
                },
                {
                  name: 'Healthy',
                  labelColor: 'forestgreen',
                  activeBarColor: 'forestgreen',
                },
                {
                  name: 'Slightly Overweight',
                  labelColor: 'orange',
                  activeBarColor: 'orange',
                },
                {
                  name: 'Moderately Overweight',
                  labelColor: 'orangered',
                  activeBarColor: 'orangered',
                },
                {
                  name: 'Extremely Overweight',
                  labelColor: 'red',
                  activeBarColor: 'red',
                },
              ]}
            />
          )}
        </DataViewR1>
        <DataViewR2>
          <DataTextR>Your BMR: {BMR} Calories </DataTextR>
          <BMRImage
            resizeMode="cover"
            source={require('./../assets/img/TDEE.png')}
          />
        </DataViewR2>
        {/*
        <Button color="red" onPress={() => getHealthData()}>
          Health Data
        </Button>
        <Button color="red" onPress={() => getSessionData()}>
          get data
        </Button>
        */}
      </ScrollContainer>
    </StyledContainer>
  );
};

export default ReportPage;

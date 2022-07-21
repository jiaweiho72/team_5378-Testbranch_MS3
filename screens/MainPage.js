import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { supabase } from '../supabaseClient';

import {
  StyledContainer,
  PageTitle2,
  Colors,
  UserinfoView,
  DataView,
  DataText,
  InnerContainer,
  ScrollContainer,
  StyledButton,
  ButtonText,
  DataTitleText,
  ProfilePicture
} from '../components/styles';

// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';

// Colors
const { grey, lightGrey, black } = Colors;

const MainPage = () => {
  const navigation = useNavigation();
  const user = supabase.auth.user();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [BFP, setBFP] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [GOAL, setGOAL] = useState('');
  const [healthData, setHealthData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  

  // Get User Input Data
  async function getHealthData() {
    console.log('get health');
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    setHealthData(data[0]);
    return data[0];
  }

  //get detailed data
  async function setDetailedData() {
    console.log('set health');
    const data = await getHealthData();
    //const data = healthData;
    setAge(data.Age);
    setGender(data.Gender);
    setWeight(data.Weight);
    setHeight(data.Height);
    setBFP(data.BFP);
    setSleepTime(data.Sleep);
    setGOAL(data.Goal);
    setAvatarUrl(data.avatar_url);
  }
  // Render once only
  /*
  useEffect(() => {
    getHealthData();
    setDetailedData();
  }, []);
*/
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setDetailedData();
    });
    return unsubscribe;
  }, [navigation]);



  return (
    <StyledContainer>
      <ScrollContainer>
        <PageTitle2>WELCOME!😊</PageTitle2>
        {avatarUrl ? 
          (
            <ProfilePicture 
              resizeMode="cover"
              //source={{ uri: `https://xpiordhecqmaqsczvzgs.supabase.co/storage/v1/object/sign/${avatarUrl}${`?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL0JDREVDNTFGLUFEQkMtNEMyNi05NENFLTk3MzYyNzNGMTUxRC5qcGciLCJpYXQiOjE2NTgzODUzNjMsImV4cCI6MTk3Mzc0NTM2M30.tIzpVgT_ttoMRa2RPgfraH-1y4mS8AIRS8fxcZBUxyk&t=2022-07-21T06%3A36%3A03.463Z`}`}}
              source={{ uri: `https://xpiordhecqmaqsczvzgs.supabase.co/storage/v1/object/public/${avatarUrl}`}}
              //style={{width: 400, height: 400}}
            />
          ):( 
          <ProfilePicture
              resizeMode="cover"
              source={require('./../assets/img/adaptive-icon.png')}
            />
          )
          }

        <UserinfoView>
          <DataView>
            <DataTitleText>Age:</DataTitleText>
            <DataText>{age}</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Gender:</DataTitleText>
            <DataText>{gender}</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Weight:</DataTitleText>
            <DataText>{weight}kg</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Height:</DataTitleText>
            <DataText>{height} cm</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Body Fat Percentage:</DataTitleText>
            <DataText>{BFP}%</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Sleep Time:</DataTitleText>
            <DataText>{sleepTime} hours</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Goal:</DataTitleText>
            <DataText>{GOAL}</DataText>
          </DataView>
        </UserinfoView>
        {/*
        <Button color="red" onPress={() => console.log(getUser())}>
          Get user
        </Button>
        */}
      </ScrollContainer>
    </StyledContainer>
  );
};

export default MainPage;

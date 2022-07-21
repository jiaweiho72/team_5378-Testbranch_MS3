import { React, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut, supabase } from '../supabaseClient';

import {
  StyledContainer,
  ScrollContainer,
  PageTitle2,
  StyledButton,
  ButtonText,
} from '../components/styles';

const SettingsPage = () => {
  const navigation = useNavigation();

  // Sign user out of Supabase
  async function doSignOut() {
    const { error } = await signOut();
    if (error) {
      Alert.alert('Error Signing Out', error.message, [
        { text: 'OK', onPress: () => null },
      ]);
    } else {
      navigation.navigate('Launch');
    }
  }

  async function getSessionData() {
    const session = supabase.auth.session();
    console.log(session);
  }

  return (
    <StyledContainer>
      <ScrollContainer>
        <PageTitle2>User Profile Settings</PageTitle2>
        <View>
          {/*
          <Button color="red" onPress={() => getSessionData()}>
            get data
          </Button>
           <Button
              color="warning"
              onPress={() => navigation.navigate("UserData")}
            >
              Update Profile
            </Button>

          */}
          <StyledButton onPress={() => navigation.navigate('EditProfile')}>
            <ButtonText>Edit Data</ButtonText>
          </StyledButton>
          <StyledButton onPress={() => doSignOut()}>
            <ButtonText>Sign Out</ButtonText>
          </StyledButton>
        </View>

        {/*<Button color="warning" onPress={() => navigation.navigate("MainPage")}>Main</Button>
            <Button color="warning" onPress={() => navigation.navigate("ReportPage")}>Report</Button>
            */}
      </ScrollContainer>
    </StyledContainer>
  );
};

export default SettingsPage;

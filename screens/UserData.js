import { React, useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userData, supabase } from '../supabaseClient';
import { Dropdown } from 'react-native-element-dropdown';

import { StatusBar } from 'expo-status-bar';
// import formik
import { Formik } from 'formik';
import {
  StyledContainer,
  InnerContainer,
  PageTitle2,
  StyledFormArea,
  StyledTextInput2,
  StyledButton,
  DisabledButton,
  LeftIcon2,
  ButtonText,
  Colors,
  ExitIcon,
} from '../components/styles';
// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';

// Colors
const { grey, lightGrey, black } = Colors;

//dropdown data
var minAge = 18,
  minWeight = 30,
  minHeight = 130,
  minBodyFat = 15,
  minSleepTime = 1.0,
  maxAge = 100,
  maxWeight = 250,
  maxHeight = 200,
  maxBodyFat = 36,
  maxSleepTime = 15.0;
// age
const age = [];
for (var i = minAge; i <= maxAge; i++) {
  age.push({ label: i.toString(), value: i });
}
// gender
const gender = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
];
// weight
const weight = [];
for (var i = minWeight; i <= maxWeight; i++) {
  weight.push({ label: i.toString(), value: i });
}
// height
const height = [];
for (var i = minHeight; i <= maxHeight; i++) {
  height.push({ label: i.toString(), value: i });
}
// bodyFatPercentage
const bodyFat = [];
for (var i = minBodyFat; i <= maxBodyFat; i++) {
  bodyFat.push({ label: i.toString(), value: i });
}
// sleepTime
const sleepTime = [];
for (var i = minSleepTime; i <= maxSleepTime; i++) {
  sleepTime.push({ label: i.toString(), value: i });
}

const UserData = () => {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);
  const [value6, setValue6] = useState(null);

  const navigation = useNavigation();
  const [BMR, setBMR] = useState(null);
  const [BMI, setBMI] = useState(null);
  // enable navigation to next page only after userinput data is complete
  let isEnabled;
  //calculate BMR and BMI
  async function handleBMRnBMI(age, gender, weight, height) {
    let bmr = 0;
    if (gender == 'male') {
      //console.log("you are male");
      // Formula: 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years)
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
    let bmi = (weight / ((height * height) / 10000)).toFixed(2);
    setBMR(Math.round(bmr, 1));
    setBMI(bmi);
  }

  // Insert into profiles table in Supabase
  async function doUpdate(values, bmr, bmi) {
    //console.log(values.gender)
    const { data, error } = await supabase.from('profiles').upsert({
      id: supabase.auth.user().id,
      Age: values.age,
      Gender: values.gender,
      Weight: values.weight,
      Height: values.height,
      BFP: values.bodyFatPercentage,
      Sleep: values.sleepTime,
      BMR: bmr,
      BMI: bmi,
    });
    if (error) {
      Alert.alert('Error Updating', error.message, [
        { text: 'OK', onPress: () => null },
      ]);
      //console.log("Error");
    } else {
      console.log(BMR);
      console.log(BMI);
      navigation.navigate('UserGoal');
    }
  }

  useEffect(() => {
    handleBMRnBMI(value1, value2, value3, value4);
  }, [value1, value2, value3, value4]);

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <ExitIcon onPress={() => navigation.navigate('SignUp')}>
          <Octicons name={'arrow-left'} size={30} color={black} />
        </ExitIcon>
        <PageTitle2>Tell Us About Yourself</PageTitle2>

        <StyledFormArea>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={age}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Age"
            value={value1}
            searchPlaceholder="Search..."
            onChange={(item) => {
              setValue1(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={gender}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Gender"
            searchPlaceholder="Search..."
            value={value2}
            onChange={(item) => {
              setValue2(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={weight}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Weight(kg)"
            searchPlaceholder="Search..."
            value={value3}
            onChange={(item) => {
              setValue3(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={height}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Height(cm)"
            searchPlaceholder="Search..."
            value={value4}
            onChange={(item) => {
              setValue4(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={bodyFat}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="BodyFatPercentage"
            searchPlaceholder="Search..."
            value={value5}
            onChange={(item) => {
              setValue5(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={sleepTime}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="SleepTime(hr)"
            searchPlaceholder="Search..."
            value={value6}
            onChange={(item) => {
              setValue6(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          {value1 && value2 && value3 && value4 && value5 && value6
            ? (isEnabled = true)
            : (isEnabled = false)}
          {isEnabled ? (
            <StyledButton
              onPress={() => {
                let test = {
                  age: value1,
                  gender: value2,
                  weight: value3,
                  height: value4,
                  bodyFatPercentage: value5,
                  sleepTime: value6,
                };
                handleBMRnBMI(value1, value2, value3, value4);
                doUpdate(test, BMR, BMI);
              }}
            >
              <ButtonText>Next</ButtonText>
            </StyledButton>
          ) : (
            <DisabledButton disabled={true}>
              <ButtonText>Next</ButtonText>
            </DisabledButton>
          )}
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    padding: 10,
    height: 45,
    backgroundColor: lightGrey,
    borderRadius: 8,
  },
  icon: {
    width: 25,
    height: 25,
  },
  dropdownTextStyle: {
    fontSize: 16,
    marginLeft: 10,
  },
  inputSearchStyle: {
    height: 35,
    fontSize: 18,
  },
});

export default UserData;

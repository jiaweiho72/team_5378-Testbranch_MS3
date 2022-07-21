import { useEffect, useState, useRef, createRef, useCallback } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, Platform, Image } from 'react-native';
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
  ProfilePicture,
  ProfilePicture2,
} from '../components/styles';
// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';

import BottomSheet from 'reanimated-bottom-sheet';
//import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import Animated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker'
import { Constants } from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';


// Colors
const { grey, lightGrey, black } = Colors;

//dropdown data
var minAge = 18,
  minWeight = 30,
  minHeight = 130,
  minBodyFat = 15,
  minSleepTime = 1,
  maxAge = 100,
  maxWeight = 250,
  maxHeight = 200,
  maxBodyFat = 36,
  maxSleepTime = 15;
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

const goal = [
  { label: 'Lose Weight', value: 'lose-weight' },
  { label: 'Build Muscles', value: 'build-muscles' },
  { label: 'Become Healthier', value: 'become-healthier' },
];

const EditProfile = () => {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);
  const [value6, setValue6] = useState(null);
  const [value7, setValue7] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);


  const user = supabase.auth.user();
  // Get User Input Data
  async function getHealthData() {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    return data[0];
  }

  //get detailed data
  async function setDetailedData() {
    const data = await getHealthData();
    setValue1(data.Age);
    setValue2(data.Gender);
    setValue3(data.Weight);
    setValue4(data.Height);
    setValue5(data.BFP);
    setValue6(data.Sleep);
    setValue7(data.Goal);
    setAvatarUrl(data.avatar_url);
    //console.log(`https://xpiordhecqmaqsczvzgs.supabase.co/storage/v1/object/sign/${avatarUrl}${`?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL0JDREVDNTFGLUFEQkMtNEMyNi05NENFLTk3MzYyNzNGMTUxRC5qcGciLCJpYXQiOjE2NTgzODUzNjMsImV4cCI6MTk3Mzc0NTM2M30.tIzpVgT_ttoMRa2RPgfraH-1y4mS8AIRS8fxcZBUxyk&t=2022-07-21T06%3A36%3A03.463Z`}`)
  }

  // Render once only
  useEffect(() => {
    setDetailedData();
  }, []);
  

  const navigation = useNavigation();
  // enable navigation to next page only after userinput data is complete
  let isEnabled;

  // Insert into profiles table in Supabase
  async function doUpdate(values) {
    //console.log(values.gender)
    const { data, error } = await supabase.from('profiles').upsert({
      id: supabase.auth.user().id,
      Age: values.age,
      Gender: values.gender,
      Weight: values.weight,
      Height: values.height,
      BFP: values.bodyFatPercentage,
      Sleep: values.sleepTime,
      Goal: values.goal,
    });

    if (error) {
      Alert.alert('Error Updating', error.message, [
        { text: 'OK', onPress: () => null },
      ]);
      //console.log("Error");
    } else {
      navigation.navigate('MainPage');
    }
  }

  // Bottom Sheet Display
  const renderInner = () => (
    <View
      style={{
      backgroundColor: 'white',
      padding: 0,
      height: 600,
    }}
    >
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <StyledButton
          onPress={() => {bs.current.snapTo(1); navigation.navigate('CameraPage')}}
        >
        <ButtonText>Take picture</ButtonText>
      </StyledButton>

      <StyledButton
          onPress={async () => {
            const response = await pickImage();
          }}
        >
        <ButtonText>Choose From Library</ButtonText>
      </StyledButton>

      <StyledButton
          onPress={() => bs.current.snapTo(1)}
        >
        <ButtonText>Close</ButtonText>
      </StyledButton>
    </View>
  )


  //Bottom sheet
  const bs = createRef();
  const fall = new Animated.Value(1);

  const [isOpen, setIsOpen] = useState(true)
  const [imageUpdated, setImageUpdated] = useState(false)


  // Request permission for image picker
  useEffect(() => {
    (async () => {
      //const { status } = await Camera.requestCameraPermissionsAsync();
      //setHasPermission(status === 'granted');

      if (Platform.OS != 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== 'granted') {
          alert('Sorry! We need camera roll permissions to make this work!')
        }
      }
    })();
  }, []);
  

  // Updates image url column in profiles table
  const updateUrl = async (url) => {
    setImageUpdated(!imageUpdated);
    const { data, error } = await supabase
      .from('profiles')
      .upsert({id: supabase.auth.user().id, avatar_url: url})
      .eq('id', supabase.auth.user().id);
  }

  // Uploads image to supabase storage bucket
  const uploadFromURI = async (photo) => {
    console.log("upload supabase")
    if (!photo.cancelled) {
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1)
      const fileName = photo.uri.replace(/^.*[\\\/]/, "");
      var formData = new FormData();
      formData.append("files", {
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `imagee/${ext}` : `video/${ext}`
      })
      const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, formData);
      if (error) throw new Error(error.message);
      let avatar = ""
    if (data) {
      setAvatarUrl(data.Key)
      avatar = data.Key
    }
    updateUrl(avatar);
    return { ...photo, imageData: data };
    } else {
      return photo
    }
  }


  // To use image picker, to select an image
  const pickImage = async () => {
    console.log("pick image")
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    try {
    console.log(photo)
    return await uploadFromURI(photo);
    } catch (e) {
      console.log(e.message)
      return null;
    }
  }

  // Updates profile picture upon toggling to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setDetailedData();
    });
    return unsubscribe;
  }, [navigation]);


  // Updates profile picture upon selecting new image
  useEffect(() => {
    setDetailedData();
  }, [imageUpdated]);

  return (
    
    <StyledContainer> 
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      {/*
      <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
          <Text>
            Hello
          </Text>
        </BottomSheetView>
      </BottomSheet>
      </GestureHandlerRootView>
      */}
      <StatusBar style="dark" />
      
      <InnerContainer>
        <TouchableOpacity onPress={() => {isOpen ? (bs.current.snapTo(0)) : (bs.current.snapTo(1)); setIsOpen(!isOpen);}}>

          {avatarUrl ? 
          (
            <ProfilePicture2 
              resizeMode="cover"
              //source={{ uri: `https://xpiordhecqmaqsczvzgs.supabase.co/storage/v1/object/sign/${avatarUrl}${`?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL0JDREVDNTFGLUFEQkMtNEMyNi05NENFLTk3MzYyNzNGMTUxRC5qcGciLCJpYXQiOjE2NTgzODUzNjMsImV4cCI6MTk3Mzc0NTM2M30.tIzpVgT_ttoMRa2RPgfraH-1y4mS8AIRS8fxcZBUxyk&t=2022-07-21T06%3A36%3A03.463Z`}`}}
              source={{ uri: `https://xpiordhecqmaqsczvzgs.supabase.co/storage/v1/object/public/${avatarUrl}`}}
              //style={{width: 400, height: 400}}
            />
          ):( 
          <ProfilePicture2
              resizeMode="cover"
              source={require('./../assets/img/adaptive-icon.png')}
            />
          )
          }  
        </TouchableOpacity>
        <Ionicons name="create-outline" color='rgb(255,153,48)' size={30} style={{ position: 'absolute', top: 100, left: 230 }} />

        <ExitIcon onPress={() => navigation.navigate('SettingsPage')}>
          <Octicons name={'arrow-left'} size={30} color={black} />
        </ExitIcon>
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

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={goal}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Goal"
            searchPlaceholder="Search..."
            value={value7}
            onChange={(item) => {
              setValue7(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />

          {value1 && value2 && value3 && value4 && value5 && value6 && value7
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
                  goal: value7,
                };
                //console.log(test.age);
                //console.log(test);
                doUpdate(test);
              }}
            >
              <ButtonText>Confirm</ButtonText>
            </StyledButton>
          ) : (
            <DisabledButton disabled={true}>
              <ButtonText>Confirm</ButtonText>
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

export default EditProfile;

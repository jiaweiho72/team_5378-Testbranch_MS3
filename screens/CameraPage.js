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
} from '../components/styles';
// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';

import BottomSheet from 'reanimated-bottom-sheet';

import { Camera, CameraType } from 'expo-camera';


// Colors
const { grey, lightGrey, black } = Colors;

const CameraPage = () => {
  const navigation = useNavigation();
  // enable navigation to next page only after userinput data is complete


  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState(null);

  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);

  /*
  useEffect( async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
    if (Platform.OS != 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermission
      if(status !== 'granted') {
        alert('Permission Denied!')
      }
    }
  }, [])
  */

  // Get Camera Permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const [ avatarUrl, setAvatarUrl] = useState(null)
  
  // Updates image url column in profiles table
  const updateUrl = async (url) => {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({id: supabase.auth.user().id, avatar_url: url})
      .eq('id', supabase.auth.user().id);
  }

  // To capture image
  const takePhoto = async () => {
    if (cameraRef) {
      console.log("in take picture")
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
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
          if (error) throw Error(error.message);

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
      } catch (e) {
        console.log(e)
      }
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={
              async () => {const r = await takePhoto();
                if (!r.cancelled) {
                  
                  setImage(r.uri);
                }
                navigation.navigate('EditProfile');
              }
            }>
            <Text style={styles.text}> Take Picture </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
              onPress={() => navigation.navigate('EditProfile')
            }>
            <Text style={styles.text}> Cancel </Text>
          </TouchableOpacity>
        
        </View>
      </Camera>
      
      </View>
    
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

  },container: {
    flex: 1,
    flexDirection: "row",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default CameraPage;

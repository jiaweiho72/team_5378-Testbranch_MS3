import Constants from 'expo-constants';

const StatusBarHeight = Constants.StatusBarHeight;

import styled from 'styled-components';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Switch,
} from 'react-native';

export const Colors = {
  primary: '#ffffff', //white
  secondary: 'rgb(255,153,48)', //theme color - orange
  tertiary: 'rgb(255,77,0)', // darker orange than 'secondary'
  grey: 'rgb(182,182,182)',
  lightGrey: 'rgb(250,249,249)',
  black: 'rgb(0,0,0)',
  red: 'rgb(250,0,0)',
  purpleBlue: 'rgb(105,121,249)',
};

const {
  primary,
  secondary,
  tertiary,
  grey,
  lightGrey,
  black,
  red,
  purpleBlue,
} = Colors;

//${StatusBarHeight && `padding-top:${StatusBarHeight}px`}
export const StyledContainer = styled.SafeAreaView`
  flex: 1;
  padding: 25px;
  background-color: ${primary};
  align-items: center;
`;

export const InnerContainer = styled.View`
  width: 100%;
  align-items: center;
`;

// scrollview component for mainpage/reportpage/planspage
export const ScrollContainer = styled.ScrollView`
  margin-vertical: 10px;
  width: ${Dimensions.get('screen').width - 65}px;
`;

export const PageLogo = styled.Image`
  width: 275px;
  height: 275px;
  margin-top: ${Dimensions.get('screen').height / 8}px;
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

// features in launch, login and signup pages
export const PageTitle1 = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: ${black};
  padding-right: 30px;
  padding-bottom: 20px;
  margin-top: 75px;
  margin-bottom: 25px;
  text-align: left;
  font-family: 'Georgia';
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${lightGrey};
  padding-horizontal: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin: 10px 20px 10px 20px;
  color: ${grey};
`;

export const LeftIcon = styled.View`
  left: 35px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 35px;
  top: 23px;
  position: absolute;
  z-index: 1;
`;

// pagetitle in userdata/usergoal/main/plans/report/settings pages
export const PageTitle2 = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: ${black};
  padding-right: 30px;
  margin: 55px 20px 15px 20px;
  font-family: 'Georgia';
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 5px;
  background-color: ${secondary};
  justify-content: center;
  border-radius: 35px;
  margin: 15px 30px 5px 30px;
  height: 60px;
  align-items: center;
`;

// disabled button style when user data is incomplete or user goal is not chosen
export const DisabledButton = styled.TouchableOpacity`
  padding: 5px;
  background-color: ${grey};
  justify-content: center;
  border-radius: 35px;
  margin: 15px 30px 5px 30px;
  height: 60px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-size: 13px;
  font-family: 'Georgia';
  font-weight:bold;
  color: ${grey}};
`;

export const SubTitleView = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 7px;
`;

// link to signup/signin page
export const TextLink = styled.TouchableOpacity`
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${secondary};
  font-size: 13px;
  font-weight: bold;
  font-family: 'Georgia';
`;

// clickable left arrow to exit to previous page
export const ExitIcon = styled.TouchableOpacity`
  align-items: center;
  right: 335px;
  top: 20px;
  position: absolute;
  z-index: 1;
`;

// error message when user input validation fails
export const ErrorMesssage = styled.Text`
  color: ${red};
  left: 10px;
  font-size: 14px;
  margin-bottom: 5px;
  font-family: 'Georgia';
`;

//styling in ReportPage
export const DataViewR1 = styled.View`
  align-items: center;
  margin-vertical: 50px;
  flex-direction: row;
`;
export const DataViewR2 = styled.View`
  margin-vertical: 50px;
`;
export const DataTextR = styled.Text`
  font-family: 'Georgia';
  font-size: 20px;
  margin-bottom: 20px;
`;
export const BMRImage = styled.Image`
  height: ${Dimensions.get('screen').width - 65}px;
  width: ${Dimensions.get('screen').width - 65}px;
`;

// styling in PlansPage
export const PlanspageView = styled.View`
  margin-vertical: 10px;
  align-items: center;
`;
export const FitnessnDietView = styled.View`
  margin-vertical: 30px;
`;
export const DateTextView = styled.View`
  margin-vertical: 20px;
  align-items: center;
`;
export const DateText = styled.Text`
  margin-bottom: 10px;
  font-size: 20px;
  font-family: 'Helvetica';
  font-weight: bold;
`;
export const WeeksView = styled.View`
  margin-bottom: 7px;
`;
export const WeeksText = styled.Text`
  color: ${purpleBlue};
  font-family: 'Georgia';
  font-size: 20px;
  font-weight: bold;
  margin-vertical: 10px;
`;
export const ExerciseSwitch = styled.Switch`
  transform: scale(0.8);
  margin-left: ${Dimensions.get('screen').width - 120}px;
  position: absolute;
`;
export const ExerciseText = styled.Text`
  color: ${black};
  font-family: 'Georgia';
  font-size: 18px;
  margin-vertical: 5px;
`;

export const ExerciseView = styled.View`
  flex: 1;
  flex-direction: row;
`;
// styling on DietPage
// styling for date and recommended calories intake info
export const DietView1 = styled.View`
  padding: 10px;
  align-items: center;
  border-width: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-color: ${black};
`;

export const DietView2 = styled.View`
  padding: 20px;
  flex-direction: row;
  border-width: 2px;
  margin-bottom: 25px;
  border-top-width: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-color: ${black};
`;

export const DietIconView = styled.View`
  padding-hotizontal: 5px;
  align-items: center;
  justify-content: center;
`;

export const DietTextView = styled.View`
  align-items: center;
  padding: 5px 15px 5px 10px;
`;
export const DietText = styled.Text`
  font-size: 18px;
  font-family: 'Helvetica';
  font-weight: bold;
`;
// styling for Meal Lists
export const MealView = styled.View`
  padding: 20px;
  flex-direction: row;
`;

export const MealTextView = styled.View`
  margin-horizontal: 25px;
`;

export const MealTitle = styled.Text`
  font-size: 19px;
  font-weight: bold;
  font-family: 'Helvetica';
`;

export const MealText = styled.Text`
  font-size: 16px;
  font-family: 'Helvetica';
`;

// styling in main page
export const UserinfoView = styled.View`
  align-items: center;
`;
export const DataView = styled.View`
  width: 100%;
  background-color: ${lightGrey};
  padding: 20px;
  margin-vertical: 10px;
  border-radius: 10px;
  flex-direction: row;
`;
export const DataTitleText = styled.Text`
  font-size: 22px;
  margin-left: 10px;
  font-family: 'Georgia';
`;
export const DataText = styled.Text`
  font-size: 20px;
  margin-left: 10px;
  font-family: 'Georgia';
  font-weight: bold;
  color: ${tertiary};
`;

export const ExerciseDoneText = styled.Text`
  color: ${grey};
  font-family: 'Georgia';
  font-size: 18px;
  margin-vertical: 5px;
`;

export const ProfilePicture = styled.Image`
  width: 150px;
  height: 150px;
  marginTop: 0px;
  borderWidth: 0.1px;
  borderColor: ${secondary};
  border-radius: 400/ 2;
`;

export const ProfilePicture2 = styled.Image`
  width: 140px;
  height: 140px;
  marginTop: 0px;
  borderWidth: 2px;
  borderColor: ${secondary};

`;

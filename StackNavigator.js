//rnfe
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useNavigation } from '@react-navigation/native';
import Launch from "./screens/Launch";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import MainPage from "./screens/MainPage";
import { signIn } from "./supabaseClient";
import SettingsPage from "./screens/SettingsPage";
import UserData from "./screens/UserData"
import UserGoal from "./screens/UserGoal"
import ReportPage from "./screens/ReportPage"
import PlansPage from "./screens/PlansPage"
import DietPage from "./screens/DietPage"
import ExercisePage from "./screens/ExercisePage"
import EditProfile from "./screens/EditProfile"
import CameraPage from "./screens/CameraPage"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Octicons, Ionicons } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageTitle1,
    StyledFormArea,
    SubTitle,
    StyledTextInput,
    StyledButton,
    LeftIcon,
    RightIcon,
    ButtonText,
    Colors,
    TextLink,
    TextLinkContent,
    SubTitleView,
    ExitIcon,
  } from './components/styles';

const { grey, lightGrey, black } = Colors;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();


// Home Page -> Sign Up/In + Getting Started -> Main Page
const StackNavigator = () => {
    return (
        //<Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="Launch" component={Launch} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="UserData" component={UserData} />
                <Stack.Screen name="UserGoal" component={UserGoal} />
                <Stack.Screen name="Tabs" component={TabNavigator} />
                {/*
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="SettingsPage" component={SettingsPage} />              
                <Stack.Screen name="ReportPage" component={ReportPage} />
                */}
    
            </Stack.Group>

        </Stack.Navigator>
    )

}

// Tabs of Main, Reports, Plan and Settings Page
const TabNavigator = () => {
    return (
        //<Stack.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel:false,
            //tabBarStyle: {backgroundColor: 'rgb(255,153,48)'},
        }}>
            <Tab.Group>
                <Tab.Screen name="MainPage" component={MainPage} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    )
                }}/>
                <Tab.Screen name="ReportPage" component={ReportPage} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="stats-chart-outline" color={color} size={size} />
                    )
                }}/>
                <Tab.Screen name="PlansNavigator" component={PlansNavigator} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="body-outline" color={color} size={size} />
                    )
                }}/>
                <Tab.Screen name="SettingsNavigator" component={SettingsNavigator}  options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="cog-outline" color={color} size={size} />
                    )
                }}/>
            </Tab.Group>

        </Tab.Navigator>
    )
}

// For additional tabs in Plans Page
const PlansNavigator = () => {
    return (
        //<Stack.Navigator>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="PlansPage" component={PlansPage} />
                <Stack.Screen name="ExercisePage" component={ExercisePage} />
                <Stack.Screen name="DietPage" component={DietPage} />
                {/*
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="SettingsPage" component={SettingsPage} />              
                <Stack.Screen name="ReportPage" component={ReportPage} />
                */}
    
            </Stack.Group>

        </Stack.Navigator>
    )

}

const ProfileNavigator = () => {
    const navigation = useNavigation();
    return (
        //<Stack.Navigator>
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Group>
                <ProfileStack.Screen 
                name="MainPage" 
                component={MainPage}
                options={{
                    title: '',
                    headerRight: () => (
                        <StyledButton onPress={() => navigation.navigate('EditProfile')}>
                            <Octicons name={'arrow-left'} size={30} color={black} />
                        </StyledButton>
                    )
                }}
                />
            </ProfileStack.Group>

        </ProfileStack.Navigator>
    )
}


const SettingsNavigator = () => {
    return (
        //<Stack.Navigator>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="SettingsPage" component={SettingsPage} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="CameraPage" component={CameraPage} /> 
            </Stack.Group>

        </Stack.Navigator>
    )

}

export default StackNavigator;
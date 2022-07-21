import { React, useState, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, Pressable } from 'react-native';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { signIn, signUp, supabase } from '../supabaseClient';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';

import { StatusBar } from 'expo-status-bar';
// import formik
import { Formik } from 'formik';
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
  ErrorMesssage,
} from '../components/styles';
// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';

// Colors
const { grey, lightGrey } = Colors;

const SignUp = () => {
  const navigation = useNavigation();

  // Performs Sign Up in Supabase
  async function doSignUp(email, password) {
    const { user, session, error } = await signUp(email, password);

    console.log('test');
    if (error) {
      console.log('error');
      Alert.alert('Error Signing Up', error.message, [
        { text: 'OK', onPress: () => null },
      ]);
      //console.log("Error");
    } else {
      console.log('pass Sign Up');
      navigation.navigate('UserData');
      //signIn(email, password);
    }
    console.log(supabase.auth.user());
  }

  // optional hide-password feature
  const [hidePassword, setHidePassword] = useState(true);
  // enabling submit button if both validation suceeds
  let isEnabled;

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle1>Create your Account</PageTitle1>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => doSignUp(values.email, values.password)}
          // validataion:
          // 1. password length has to >= 6
          // 2. email address has to be valid
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = 'Required';
            } else if (values.password.length < 6) {
              errors.password = 'Must be at least 6 characters';
            }
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <StyledFormArea>
              <UserTextInput
                icon="mail"
                placeholder="Email"
                placeholderTextColor={grey}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email ? (
                <ErrorMesssage>{errors.email}</ErrorMesssage>
              ) : null}
              <UserTextInput
                icon="lock"
                placeholder="Password"
                placeholderTextColor={grey}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              {touched.password && errors.password ? (
                <ErrorMesssage>{errors.password}</ErrorMesssage>
              ) : null}
              {values.password.length >= 6 &&
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ==
                true
                ? (isEnabled = true)
                : (isEnabled = false)}

              {/*<StyledButton disabled={!isEnabled} onPress={handleSubmit}>*/}
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Sign Up</ButtonText>
              </StyledButton>
              {/*
              <StyledButton onPress={() => navigation.navigate('Tabs')}>
                <ButtonText>Bypass Sign Up</ButtonText>
              </StyledButton>
              */}
            </StyledFormArea>
          )}
        </Formik>
        <SubTitleView>
          <SubTitle>Already have an account? </SubTitle>
          <TextLink onPress={() => navigation.navigate('SignIn')}>
            <TextLinkContent>Sign in</TextLinkContent>
          </TextLink>
        </SubTitleView>
      </InnerContainer>
    </StyledContainer>
  );
};

const UserTextInput = ({
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={20} color={grey} />
      </LeftIcon>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'md-eye-off' : 'md-eye'}
            size={30}
            color={grey}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default SignUp;

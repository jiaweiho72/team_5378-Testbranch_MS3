import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { Button } from '@rneui/base';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { supabase } from './supabaseClient';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import 'react-native-url-polyfill/auto';

export default function App() {
  console.log('App executed');
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

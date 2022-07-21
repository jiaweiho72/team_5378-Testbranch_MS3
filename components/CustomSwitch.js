import { React, useState, useEffect } from 'react';
import { Text, View, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { signOut, supabase } from '../supabaseClient';

import {
  StyledContainer,
  InnerContainer,
  ScrollContainer,
  PageTitle2,
  PlanspageView,
  SubTitleView,
  ProgressText,
  WeeksView,
  WeeksText,
  ExerciseSwitch,
  ExerciseView,
  ExerciseText,
  Colors,
} from '../components/styles';

const { primary, secondary, grey } = Colors;

export default function CustomSwitch(props){
    return (
      <ExerciseView>
        <ExerciseSwitch
                      trackColor={{ false: primary, true: secondary }}
                      thumbColor={primary}
                      ios_backgroundColor={primary}
                      onValueChange={props.toggleSwitch}
                      value={props.completed}
                    />
                    </ExerciseView>
    )
}
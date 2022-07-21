import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Button,
} from 'react-native';
// import simpleSelectButton Package
import SimpleSelectButton from 'react-native-simple-select-button';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import {
  StyledContainer,
  InnerContainer,
  PageTitle2,
  StyledFormArea,
  StyledButton,
  DisabledButton,
  ButtonText,
  Colors,
  ExitIcon,
} from '../components/styles';
// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';
import styledComponents from 'styled-components';
import { userData, supabase } from '../supabaseClient';

// Colors
const { lightGrey, black, secondary, primary } = Colors;

const UserGoal = () => {
  const [goal, setGoal] = useState('');
  const button_list = [
    { label: 'Lose Weight', value: 'lose-weight' },
    { label: 'Build Muscles', value: 'build-muscles' },
    { label: 'Become Healthier', value: 'become-healthier' },
  ];
  const navigation = useNavigation();
  //enable button navigation to next page only after user has chosen a goal
  let isEnabled;

  // Insert User Goal into Profiles Table
  async function doUpdate(usergoal) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: supabase.auth.user().id, Goal: usergoal });
    if (error) {
      Alert.alert('Error Updating', error.message, [
        { text: 'OK', onPress: () => null },
      ]);
      //console.log("Error");
    } else {
      navigation.navigate('Tabs');
    }
  }

  // Get Health Data
  async function getHealthData() {
    const { data1, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    return data1[0];
  }

  // Logic to create fitness and diet plans based on user-selected goal
  async function createPlan(usergoal) {
    if (usergoal == 'build-muscles') {
      const { dataA } = await supabase.from('Exercise').upsert([
        {
          id: supabase.auth.user().id,
          Name: 'Abs',
          Day: 1,
          Amount: '2x 10reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Push-ups',
          Day: 1,
          Amount: '3x 8reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Sit-ups',
          Day: 2,
          Amount: '2x 20reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Crunches',
          Day: 2,
          Amount: '2x 10reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Squats',
          Day: 3,
          Amount: '2x 20reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Cardio',
          Day: 3,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Planks',
          Day: 5,
          Amount: '4x 90s',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Pull-ups',
          Day: 5,
          Amount: '5x 6reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Barbell Curls',
          Day: 7,
          Amount: '3x 25reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Burpees',
          Day: 7,
          Amount: '3x 8reps',
        },
      ]);
      const { dataB } = await supabase.from('Diet').upsert([
        {
          id: supabase.auth.user().id,
          Day: 'Monday',
          Breakfast:
            'Protein shake, whole bagel with fried eggs and sugar-free peanut butter',
          Lunch:
            'Whole wheat pasta, chicken breast and a cup of mixed vegetables',
          Dinner: 'Steak, brown rice, and grilled broccoli',
          Snack: 'Apple and Handful of Cashews',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Tuesday',
          Breakfast: 'Whole wheat bread, egg whites, and milk',
          Lunch: 'Cobb salad',
          Dinner: 'Shrimp fried quinoa with vegetables',
          Snack: 'Orange and greek yugurt',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Wednesday',
          Breakfast: 'Frozen mixed berries, whole milk, and rolled oats',
          Lunch: 'Chicken breast, fried mixed vegetables, and egg noodles',
          Dinner: 'Whole grain salmon burger with lettuce',
          Snack: 'Apple and protein smoothie',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Thursday',
          Breakfast:
            'Boiled eggs, protein shake, cashews, and steamed sweet potatoes',
          Lunch: 'Hainanese chicken rice',
          Dinner: 'Sesame zoodles With crispy tofu',
          Snack: 'Cherry tomatoes and protein bars',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Friday',
          Breakfast: 'Egg whites, whole wheat toast, and protein shake',
          Lunch:
            'Steak, grilled potatoes, and boiled vegetables with soy sauce',
          Dinner: 'Turkey lettuce wraps',
          Snack: 'Apple and handful of Cashews',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Saturday',
          Breakfast: 'Chocolate protein pancakes with fried eggs',
          Lunch: 'Steak and bean burrito bowl',
          Dinner: 'Soba noodles with boiled chicken breast and cucumber',
          Snack: 'Orange and beef jerky',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Sunday',
          Breakfast: 'Overnight oats and boiled eggs',
          Lunch:
            'Sushi rolles with high protein(California Roll, Sashimi, etc)',
          Dinner: 'Sweet potato chicken bowl',
          Snack: 'Avocado toast with greek yogurt',
        },
      ]);
    } else if (usergoal == 'become-healthier') {
      const { dataA } = await supabase.from('Exercise').upsert([
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 1,
          Amount: '7500',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 2,
          Amount: '7500',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 3,
          Amount: '7500',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Body Yoga',
          Day: 4,
          Amount: '10mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 5,
          Amount: '7500',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Swim/Ball Sports',
          Day: 6,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 7,
          Amount: '12000',
        },
      ]);
      const { dataB } = await supabase.from('Diet').upsert([
        {
          id: supabase.auth.user().id,
          Day: 'Monday',
          Breakfast: 'Oatmeal, scrambled eggs, and fruit',
          Lunch: 'Roasted chicken wrap',
          Dinner: 'Fresh garden salad with beef ham',
          Snack: 'No-salt added almonds',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Tuesday',
          Breakfast:
            'Banana and sugar-free yogurt blend with cocoa powder, and 1 boiled egg',
          Lunch: 'Beef Noodle Soup',
          Dinner: 'Turkey Burger Wraps',
          Snack: 'No-sugar added yogurt',
        },

        {
          id: supabase.auth.user().id,

          Day: 'Wednesday',
          Breakfast: 'Spinach Loaded, omelette, and tea',
          Lunch: 'Avocado pasta',
          Dinner: 'Vietnamese rice paper rolls',
          Snack: 'Whole fruits',
        },
        {
          id: supabase.auth.user().id,

          Day: 'Thursday',
          Breakfast: 'Overnight oats and fried eggs without oil',
          Lunch: 'Soba noodle salad with chicken',
          Dinner: 'Baked salmon and caprese zoodles',
          Snack: 'Yogurt with fruits',
        },
        {
          id: supabase.auth.user().id,

          Day: 'Friday',
          Breakfast: 'Sugar-free latte with egg sandwich',
          Lunch: 'Chicken Caesar Salad',
          Dinner: 'Cabbage burritos',
          Snack: 'Whole fruits',
        },

        {
          id: supabase.auth.user().id,

          Day: 'Saturday',
          Breakfast: 'Healthy eggs benedict',
          Lunch: 'Non-spicy Chinese hot pot with low fat/sugar dipping sauces',
          Dinner: 'Garlicky lemon mahi mahi',
          Snack: 'No-salt added walnuts',
        },

        {
          id: supabase.auth.user().id,

          Day: 'Sunday',
          Breakfast: 'Vietnamese beef pho',
          Lunch: 'Rainbow roll with seaweed salad',
          Dinner: 'Turkey meatball pad thai',
          Snack: 'Baked rice cakes and fruits',
        },
      ]);
    } else if (usergoal == 'lose-weight') {
      const { dataA } = await supabase.from('Exercise').upsert([
        {
          id: supabase.auth.user().id,
          Name: 'Rower',
          Day: 1,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Jumping Jacks',
          Day: 1,
          Amount: '6x 30reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Squats',
          Day: 2,
          Amount: '5x 15reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Elliptical',
          Day: 2,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'HIIT',
          Day: 3,
          Amount: '20mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 4,
          Amount: '12000',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Pull-ups',
          Day: 5,
          Amount: '5x 10reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Jump Rope',
          Day: 5,
          Amount: '5x 200reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Indoor Cycle',
          Day: 7,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Burpees',
          Day: 7,
          Amount: '3x 10reps',
        },
      ]);
      const { dataB } = await supabase.from('Diet').upsert([
        {
          id: supabase.auth.user().id,
          Day: 'Monday',
          Breakfast: 'Boiled egg, whole wheat bread, 0 fat milk',
          Lunch: 'Vegetable salad with healthy salad dressing, grilled chicken',
          Dinner: 'Salmon salad with cannellini beans',
          Snack: 'Grapefruit and sugar-free yogurt',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Tuesday',
          Breakfast: 'Whole grain toast, fried eggs, and sugar-free yogurt',
          Lunch: 'Chicken caesar salad on a spinach wrap',
          Dinner: 'Grilled fish tacos topped with cabbage-cilantro slaw',
          Snack: 'Cherry tomatoes',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Wednesday',
          Breakfast: 'Oatmeal with milk, boiled eggs',
          Lunch: 'Boiled corn, grilled beef tenderloin and broccoli',
          Dinner: 'Shirataki noodle with cucumber and shrimp',
          Snack: 'Cucumber',
        },

        {
          id: supabase.auth.user().id,

          Day: 'Thursday',
          Breakfast: 'Boiled egg, whole wheat bread, 0 fat milk',
          Lunch: 'Mediterranean chickpea quinoa bowl',
          Dinner: 'Vegetable udon soup with tofu',
          Snack: 'Grapefruit and sugar-free yogurt',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Friday',
          Breakfast: 'Shakshuka',
          Lunch:
            'Mixed grain rice with fried Chinese cabbage and boiled chicken slices',
          Dinner: 'Spicy tofu tacos',
          Snack: 'Cherry tomatoes',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Saturday',
          Breakfast: 'Whole grain toast, fried eggs, and sugar-free yogurt',
          Lunch: 'Tuna rolls with cucumber',
          Dinner: 'Boiled vegetables and shrimp',
          Snack: 'Apple and 0 fat milk',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Sunday',
          Breakfast: 'Boiled egg, whole wheat bread, 0 fat milk',
          Lunch: 'Grilled potatoes, veges, and fish',
          Dinner: 'Whole wheat low-fat tuna sandwhich',
          Snack: 'Cherry tomatoes',
        },
      ]);
    }
  }

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <ExitIcon>
          <Octicons
            onPress={() => navigation.navigate('UserData')}
            name={'arrow-left'}
            size={30}
            color={black}
          />
        </ExitIcon>
        <PageTitle2>What is Your Goal?</PageTitle2>
        <View
          style={{
            marginTop: 35,
            width: Dimensions.get('screen').width - 65,
          }}
        >
          <FlatList
            data={button_list}
            keyExtractor={(item) => item.value}
            extraData={goal}
            renderItem={({ item }) => (
              <SimpleSelectButton
                style={styles.goals}
                onPress={() => {
                  setGoal(item.value);
                  // console.log(goal);
                }}
                isChecked={goal === item.value}
                text={item.label}
                textSize={20}
                iconName="checkcircleo"
                iconColor="#fff"
                iconSize={25}
                buttonDefaultColor="#e5e5e5"
                buttonSelectedColor="#ff9c5b"
                textDefaultColor="#333"
                textSelectedColor="#fff"
              />
            )}
          />
          {goal ? (isEnabled = true) : (isEnabled = false)}
          {isEnabled ? (
            <StyledButton
              onPress={() => goal && doUpdate(goal) && createPlan(goal)}
            >
              <ButtonText>Next</ButtonText>
            </StyledButton>
          ) : (
            <DisabledButton disabled={true}>
              <ButtonText>Next</ButtonText>
            </DisabledButton>
          )}
        </View>
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  goals: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 20,
  },
});

export default UserGoal;

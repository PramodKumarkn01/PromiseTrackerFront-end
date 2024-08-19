import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WCscree from '../Screens/wcScreen';
import Signup from '../Screens/Signup';
import SingIn from '../Screens/SingIn';
import ForgetPassword from '../Screens/ForgetPassword'
import User from '../Screens/User';
import UserEdit from '../Screens/UserEdit';
import ResetPassword from '../Screens/ResetPassword';

const Stack = createStackNavigator();

const FirstStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WCscree"
        component={WCscree}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SingIn"
        component={SingIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default FirstStack;

const styles = StyleSheet.create({});

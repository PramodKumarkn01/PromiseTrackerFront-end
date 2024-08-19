import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector, Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from './Redux/Action/UserAction';
import Store from './Redux/Store/Store';

import Home from './Screens/Home';
import Notifications from './Component/Notifications';
import Calenderone from './Screens/Calenderone';
import AddTask from './Screens/AddTask';
import User from './Screens/User';
import UserEdit from './Screens/UserEdit';
import Approval from './Component/Approval';
import Updatetask from './Component/Updatetask';
import ProjectGroupEdit from './Component/ProjectGroupEdit';
import AddRoles from './Component/AddRoles';
import AddUser from './Component/AddUser';
import AddRoleToUser from './Component/AddRoleToUser';
import CreateProjectGroup from './Component/CreateProjectGroup';
import EditProjectGroup from './Component/EditProjectGroup1';
import ProjectsView from './Component/ProjectsView';
import WCscree from './Screens/wcScreen';
import Signup from './Screens/Signup';
import SingIn from './Screens/SingIn';
import ForgetPassword from './Screens/ForgetPassword';
import ResetPassword from './Screens/ResetPassword';
import HomeFooter from './Component/HomeFooter';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            display: 'none',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Calenderone"
          component={Calenderone}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="AddTask"
          component={AddTask}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Approval"
          component={Approval}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="UserEdit"
          component={UserEdit}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Updatetask"
          component={Updatetask}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ProjectGroupEdit"
          component={ProjectGroupEdit}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="AddRoles"
          component={AddRoles}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="AddUser"
          component={AddUser}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="AddRoleToUser"
          component={AddRoleToUser}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="CreateProjectGroup"
          component={CreateProjectGroup}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="EditProjectGroup"
          component={EditProjectGroup}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ProjectsView"
          component={ProjectsView}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
      <HomeFooter />
    </>
  );
};

const FirstStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WCscree"
        component={WCscree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingIn"
        component={SingIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');

        if (storedToken) {
          dispatch(setToken(storedToken));
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  }, [dispatch]);

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
            <Stack.Screen name="Tabs" component={Tabs} />
          ) : (
            <Stack.Screen name="FirstStack" component={FirstStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});

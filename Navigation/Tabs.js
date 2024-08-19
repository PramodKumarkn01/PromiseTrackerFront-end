import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../Screens/Home';
import Notifications from '../Component/Notifications';
import Calender from '../Screens/Calender';
import HomeFooter from '../Component/HomeFooter';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddTask from '../Screens/AddTask';
import User from '../Screens/User';
import UserEdit from '../Screens/UserEdit';
import Calenderone from '../Screens/Calenderone';
import Approval from '../Component/Approval';
import Updatetask from '../Component/Updatetask';
import ProjectGroupEdit from '../Component/ProjectGroupEdit'
import AddRoles from '../Component/AddRoles';
import AddUser from '../Component/AddUser';
import AddRoleToUser from '../Component/AddRoleToUser';
import CreateProjectGroup from '../Component/CreateProjectGroup';
import EditProjectGroup from '../Component/EditProjectGroup1';
import ProjectsView from '../Component/ProjectsView';
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            display: 'none',
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: false}}
        />
        {/* <Tab.Screen
          name="Calender"
          component={Calender}
          options={{headerShown: false}}
        /> */}
        <Tab.Screen
          name="Calenderone"
          component={Calenderone}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="AddTask"
          component={AddTask}
          options={{headerShown: false}}
        />
        {/* <Tab.Screen
          name="Approvals"
          component={Approvals}
          options={{headerShown: false}}
        /> */}
         <Tab.Screen
          name="Approval"
          component={Approval}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="UserEdit"
          component={UserEdit}
          options={{headerShown: false}}
        />
        {/* <Tab.Screen
          name="GroupMembers"
          component={GroupMembers}
          options={{headerShown: false}}
        /> */}
        
        <Tab.Screen
          name="Updatetask"
          component={Updatetask}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="ProjectGroupEdit"
          component={ProjectGroupEdit}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="AddRoles"
          component={AddRoles}
          options={{headerShown: false}}
        />
         <Tab.Screen
          name="AddUser"
          component={AddUser}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="AddRoleToUser"
          component={AddRoleToUser}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="CreateProjectGroup"
          component={CreateProjectGroup}
          options={{headerShown: false}}
        />
         <Tab.Screen
          name="EditProjectGroup"
          component={EditProjectGroup}
          options={{headerShown: false}}
        />
         <Tab.Screen
          name="ProjectsView"
          component={ProjectsView}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
      <HomeFooter />
    </>
  );
};

export default Tabs;

const styles = StyleSheet.create({});

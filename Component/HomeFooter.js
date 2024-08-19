import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCalendar,
  faCheck,
  faCheckCircle,
  faFile,
  faHouse,
  faListCheck,
  faListDots,
  faListNumeric,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';

const HomeFooter = () => {
  const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState('Home');

  const pressHome = () => {
    setActiveIcon('Home');
    navigation.navigate('Tabs', { screen: 'Home' });
  };
  const pressCalendar = () => {
    setActiveIcon('Calendar');
    navigation.navigate('Calenderone');
  };
  const pressUser = () => {
    setActiveIcon('User');
    navigation.navigate('User');
  };
  const pressAddTask = () => {
    // setActiveIcon('AddTask');
    navigation.navigate('AddTask');
  };
  const pressFile = () => {
    setActiveIcon('Approval');
    navigation.navigate('Approval');
  };

  const getIconColor = (iconName) => (activeIcon === iconName ? '#EA791D' : 'white');

  const [isVisibleHome, setisVisiableHome] = useState(false);
  const [isVisibleCalender, setisVisiableCalender] = useState(false);
  const [isVisibleAddtask, setisVisiableAddtask] = useState(false);
  const [isVisibleApprovels, setisVisiableAPProvels] = useState(false)
  const [isVisibleProfile, setisVisiableProfile] = useState(false)

const LongpressHome = () => {
  setisVisiableHome(true);
} 

const LongpressCalender = () => {
  setisVisiableCalender(true);
}

const LongpressAddtask = () => {
  setisVisiableAddtask(true);
}

const LongpressApprovels = () => {
  setisVisiableAPProvels(true);
}

const LongpressProfile = () =>{
  setisVisiableProfile(true)
}

const onPressOut = () => {
  setisVisiableHome(false)
  setisVisiableCalender(false)
  setisVisiableAddtask(false)
  setisVisiableAPProvels(false)
  setisVisiableProfile(false)
}

const deviceHeight = Dimensions.get('window').height;
let top;
if (deviceHeight < 375) {
  top = 680;
} else if (deviceHeight >= 375 && deviceHeight < 768) {
  top = 650;
} else {
  top = 740;
}

  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
    <View style={{position: 'absolute',  right:0, left:0, bottom: 0, top}}>
      <View style={styles.icon}>

        <Tooltip
        isVisible={isVisibleHome}
        content={<Text style={{color:'black'}}>Home</Text>}
        placement="top"
        >
        <TouchableOpacity onPress={pressHome} onLongPress={LongpressHome} onPressOut={onPressOut}>
          <FontAwesomeIcon icon={faHouse} size={35} color={getIconColor('Home')} />
        </TouchableOpacity>
        </Tooltip>

        <Tooltip
        isVisible={isVisibleCalender}
        content={<Text style={{color:'black'}}>Calendar</Text>}
        placement="top"
        >
        <TouchableOpacity onPress={pressCalendar} onLongPress={LongpressCalender} onPressOut={onPressOut}>
          <FontAwesomeIcon icon={faCalendar} size={35} color={getIconColor('Calendar')} />
        </TouchableOpacity>
        </Tooltip>

        <Tooltip
        isVisible={isVisibleAddtask}
        content={<Text style={{color:'black'}}>Add Task</Text>}
        placement="top"
        >
        <TouchableOpacity onPress={pressAddTask} onLongPress={LongpressAddtask} onPressOut={onPressOut}>
          <View style={styles.plus}>
            <FontAwesomeIcon icon={faPlus} size={20}  color='white' />
          </View>
        </TouchableOpacity>
        </Tooltip>

        <Tooltip
        isVisible={isVisibleApprovels}
        content={<Text style={{color:'black'}}>Approvels</Text>}
        placement="top"
        >
        <TouchableOpacity onPress={pressFile} onLongPress={LongpressApprovels} onPressOut={onPressOut}>
          <FontAwesomeIcon icon={faListCheck} size={35} color={getIconColor('Approval')} />
        </TouchableOpacity>
        </Tooltip>

        <Tooltip
        isVisible={isVisibleProfile}
        content={<Text style={{color:'black'}}>Profile</Text>}
        placement="top"
        >
        <TouchableOpacity onPress={pressUser} onLongPress={LongpressProfile} onPressOut={onPressOut}>
          <FontAwesomeIcon icon={faUser} size={35} color={getIconColor('User')} />
        </TouchableOpacity>
        </Tooltip>
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
};

export default HomeFooter;

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0A91d0',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    width: '100%',
  },
  plus: {
    backgroundColor: '#EA791D',
    width: 55,
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 3,
    bottom:30,
  },
  footerContainer:{
    flex: 1,
    // marginTop:670,
    position: 'absolute',
    right:0,
    left:0
  }
});

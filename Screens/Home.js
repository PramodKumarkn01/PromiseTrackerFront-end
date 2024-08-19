import {
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  faArrowRightFromBracket,
  faBell,
  faClose,
  faRefresh,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import ProgressScrol from '../Component/ProgressScrol';
import TaskGroup from '../Component/TaskGroup';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFeather,
  faBriefcase,
  faGlobe,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';

import {connect} from 'react-redux';
import {fetchUserData, logout} from '../Redux/Action/UserAction';
import {createTaskGroup} from '../Redux/Action/TaskAction';
import CProgress from '../Component/CProgress';
import {fetchCompletedTasksCount} from '../Redux/Action/TaskAction';
import {fetchTaskGroups} from '../Redux/Action/TaskGroupaction';
import Tooltip from 'react-native-walkthrough-tooltip';
import {
  updateNotifications,
  fetchNotifications,
  updateNotificationAction,
} from '../Redux/Action/NotificationAction';

const Home = () => {
  const dispatch = useDispatch();
  const {completedCount, totalCount} = useSelector(state => state.tasks);
  const notifications = useSelector(state => state.notifications.notifications);

  const currentUserID = useSelector(state => state.user.userData);
  
    // console.log('check',currentUserID);
    // console.log('notifiaction',notifications)

  // useEffect(() => {
  //   if (!notifications) {
  //   }
  // }, [dispatch, notifications]);


  // console.log("home notification",notifications)

  const userData = useSelector(state => state.user.userData);
  // console.log('user',userData)
  const task = useSelector(state => state.tasks.taskGroups);

  useEffect(() => {
    dispatch(fetchCompletedTasksCount());
  }, [dispatch]);
  

  // const [isNotification, setNotification] = useState(false);
  const navigation = useNavigation();

  const Notification = () => {
    // Check if currentUserID is available
    if (currentUserID && currentUserID._id) {
      navigation.navigate('Notifications');
      dispatch(updateNotificationAction(currentUserID._id));
      dispatch(fetchNotifications());
    } else {
      console.warn('currentUserID is null or undefined. No notifications will be filtered.');
    }
  };

  const PressUser = () => {
    navigation.navigate('User');
  };
  const Viewtask = () => {
    navigation.navigate('Calenderone');
  };
  // const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    navigation.navigate('CreateProjectGroup');
    // setModalVisible(!isModalVisible);
  };

  // const [groupName, setGroupName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('defaultIcon');
  const handleIconChange = IconName => {
    setSelectedIcon(IconName);
  };

  const [groupName, setGroupName] = useState('');
  const [icon, setIcon] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateTaskGroup = () => {
    // console.log("task")
    dispatch(createTaskGroup(groupName, selectedIcon));
    setGroupName('');
    setIcon('');
    setModalVisible(!isModalVisible);
  };

  const Logout = async () => {
    dispatch(logout());
    navigation.navigate('FirstStack',{Screen: 'SingIn'})
    // navigation.navigate('SingIn');

    // navigation.navigate('FirstStack')
    setModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const [isTaskGroupScrolling, setIsTaskGroupScrolling] = useState(false);

  const handleTaskGroupScrollStart = () => {
    setTaskGroupHeight(Dimensions.get('window').height * 0.8);
  };
  const [taskGroupHeight, setTaskGroupHeight] = useState(
    Dimensions.get('window').height * 0.5,
  );
  const addRole = () => {
    navigation.navigate('AddRoles');
  };
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    dispatch(fetchTaskGroups());
    dispatch(fetchCompletedTasksCount());
    dispatch(fetchNotifications());
  };
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchTaskGroups());
    setRefreshing(false);
    dispatch(fetchCompletedTasksCount());
    dispatch(fetchNotifications());
  };
  const [logoutToolTipVisible, setLogoutToolTipVisible] = useState(false);
  const [notificationToolTipVisible, setNotificationToolTipVisible] =
    useState(false);
  const [isVisibleuser, setisViableuser] = useState(false);

  const handleLongPressLogout = () => {
    setLogoutToolTipVisible(true);
  };

  const handleLongPressNotification = () => {
    setNotificationToolTipVisible(true);
  };

  const hanldePrssUser = () => {
    setisViableuser(true);
  };

  const handlePressOut = () => {
    setLogoutToolTipVisible(false);
    setNotificationToolTipVisible(false);
    setisViableuser(false);
  };

  // console.log(notifications);
  let filteredNotifications = [];

  if (notifications && Array.isArray(notifications)) {
    if (currentUserID && currentUserID._id) {
      filteredNotifications = notifications.filter(notification =>
        (notification.action === true || notification.action === "true") && notification.userId === currentUserID._id
      );
    } else {
      console.log('currentUserID is null or undefined. No notifications will be filtered.');
    }
  } else {
    console.warn('notifications is null, undefined, or not an array.');
  }
  
  const notificationCount = filteredNotifications.length;
  
  
  return !userData ? (
    <View style={[styles.activity, styles.horizontal]}>
      <ActivityIndicator size="large" color="#3C6491" />
    </View>
  ) : (
    <View>
      <View style={styles.Home}>
        <View style={styles.prl}>
          <View>
            <TouchableOpacity onPress={PressUser}>
              <Image
                source={
                  userData.profilePic
                    ? {uri: userData.profilePic}
                    : require('../Images/profile.png')
                }
                style={styles.userI}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{fontSize: 14, fontWeight: '500', color: 'black'}}>
              Hello!
            </Text>
            <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
              {userData.name}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Are you sure you want to log out?
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.text}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={Logout}>
                    <Text style={styles.text}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={refresh} style={{marginTop:5}}>
              <FontAwesomeIcon icon={faRefresh} size={22} color="#14447B" />
            </TouchableOpacity>
          {userData.userRole == 0 || userData.userRole == 1 ? (
            <Tooltip
              isVisible={isVisibleuser}
              content={<Text style={{color: 'black'}}>Crete Newuser</Text>}
              placement="bottom">
              <TouchableOpacity
                onPress={addRole}
                onLongPress={hanldePrssUser}
                onPressOut={handlePressOut}>
                <FontAwesomeIcon icon={faUserPlus} size={30} color="#14447B" />
              </TouchableOpacity>
            </Tooltip>
          ) : null}

          <Tooltip
            isVisible={notificationToolTipVisible}
            content={<Text style={{color: 'black'}}>Notification</Text>}
            placement="bottom"
            onClose={() => setNotificationToolTipVisible(false)}>
            <TouchableOpacity
              onLongPress={handleLongPressNotification}
              onPressOut={handlePressOut}
              onPress={Notification}>
              <View>
                <FontAwesomeIcon icon={faBell} size={30} color={'#14447B'} />
                {Array.isArray(notifications) &&
                  notifications.map(
                    notification =>
                      notification.action === 'true' &&
                      notification.userId === currentUserID._id && (
                        <View
                          style={{
                            backgroundColor: 'red',
                            paddingHorizontal: 7,
                            position: 'absolute',
                            left: 8,
                            bottom: 11,
                            borderRadius: 10,
                          }}
                          key={notification._id}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 12,
                            }}>
                            {notificationCount}
                          </Text>
                        </View>
                      ),
                  )}
              </View>
            </TouchableOpacity>
          </Tooltip>

          <Tooltip
            isVisible={logoutToolTipVisible}
            content={<Text style={{color: 'black'}}>Logout</Text>}
            placement="bottom"
            onClose={() => setLogoutToolTipVisible(false)}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              onLongPress={handleLongPressLogout}
              onPressOut={handlePressOut}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size={30}
                color="#14447B"
              />
            </TouchableOpacity>
          </Tooltip>
        </View>
      </View>
      <ScrollView
        style={{maxHeight: Dimensions.get('window').height * 0.8}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3498db']}
            tintColor="#3498db"
          />
        }>
      
          {/* <View style={styles.bin}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: '600',
                paddingBottom: 10,
              }}>
              Your today's task is almost done!
            </Text>
            <TouchableOpacity
              style={{backgroundColor: '#EA791D', width: 100, borderRadius: 5}}
              onPress={Viewtask}>
              <Text style={{color: 'white', textAlign: 'center', margin: 10}}>
                View task
              </Text>
            </TouchableOpacity>
          </View> */}

          <View>
            <CProgress
              completedTasksCount={completedCount}
              totalTasks={totalCount}
              radius={45}
              strokeWidth={10}
              color="#EA791D"
              backgroundColor="#e6e6e6"
              textColor="white"
              duration={500}
            />
          </View>
        

        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              color: 'black',
              // paddingLeft: 20,
              // paddingTop: 2,
              marginLeft:20,
              marginTop:15
            }}>
            In Progress
          </Text>
          <ProgressScrol />
        </View>
        
        <View style={styles.task}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '800',
                color: 'black',
                // paddingLeft: 20,
                // paddingTop: 20,
                // alignItems:'center'
              }}>
              Project Groups
            </Text>
            {/* <TouchableOpacity onPress={refresh}>
              <FontAwesomeIcon icon={faRefresh} size={20} color="#14447B" />
            </TouchableOpacity> */}
          </View>
          {userData.userRole == 0 || userData.userRole == 1 ? (
            <TouchableOpacity style={styles.add} onPress={toggleModal}>
              <Text style={{textAlign: 'center', color: 'white', fontSize:14, fontWeight: 'bold'}}>
                Add New Project Group
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {/* <TaskGroup onScrollStart={handleTaskGroupScrollStart} /> */}
        <ScrollView
          style={{
            flexGrow: 0,
            maxHeight: Dimensions.get('window').height * 0.4,
            marginBottom: 50,
          }}
          onScrollBeginDrag={handleTaskGroupScrollStart}>
          <TaskGroup />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Home: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 20,
  },
  prl: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  banner: {
    backgroundColor: '#0A91d0',
    height: 135,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  bin: {
    width: '50%',
    flexDirection: 'column',
  },
  add: {
    backgroundColor: '#EA791D',
    width: 150,
    padding: 8,
    borderRadius: 10,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    // marginRight: 20,
    marginHorizontal:20,
    marginBottom: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  addTgroup: {
    backgroundColor: '#EA791D',
    width: 50,
    padding: 5,
    borderRadius: 8,
    marginVertical: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  userI: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  // loading: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  activity: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});

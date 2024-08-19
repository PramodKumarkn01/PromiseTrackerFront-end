import React, {useEffect, useState, useCallback, memo} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Pressable,
  Alert
} from 'react-native';
import {faArrowLeft, faCalendar, faClock, faClose, faEllipsisV, faListDots, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {
  fetchNotifications,
  replyNotification,
  updateNotification,
} from '../Redux/Action/NotificationAction';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchTasks} from '../Redux/Action/TaskAction';
import HomeFooter from './HomeFooter';
import {updateTask} from '../Redux/Action/TaskAction';

const Notifications = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(state => state.notifications.notifications);

  // console.log('noti',notifications)
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.user.userData);
  const [comments, setComments] = useState({});
  const [popupVisible, setPopupVisible] = useState(null);
  const task = useSelector(state => state.tasks.task);
  const [modifiedDate, setModifiedDate] = useState(null);
  const [modifiedTime, setModifiedTime] = useState(null);

  const pressBack = () => {
    navigation.navigate('Home');
  };

  useEffect (() =>{
  },[notifications])

  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, notifications.length]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchNotifications());
    setRefreshing(false); 
  }, [dispatch]);

  const formattedDate = created => {
    return new Date(created).toLocaleDateString();
  };

  const formattedTime = created => {
    return new Date(created).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // const handleReply = (status, taskId) => {
  //   const comment = comments[taskId];
  //   if (status === 'Accept & Modifed') {
  //     // Assuming 'EditTask' is the name of your task update screen
  //     navigation.navigate('Updatetask', { taskId: taskId, userComment: comment });
  //   } else {
  //     if (comment) {
  //       dispatch(replyNotification(user._id, taskId, status, comment));
  //     } else {
  //       console.log('Comment is empty or not provided for taskId: ', taskId);
  //     }
  //   }
  // };

  const handleReply = (status, taskId) => {
    const comment = comments[taskId];
    if (status === 'Accept & Modifed') {
      navigation.navigate('Updatetask', { taskId: taskId, userComment: comment, status: status });
      // dispatch(updateNotification(taskId, date, time, comment));
    } else {
      if (comment) {
                    let taskDetails = {
                        comment: comment,
                        status: status,
                    };
                    if (status === 'Accepted') {
                        taskDetails.status = 'To do';
                    } else if (status === 'Rejected') {
                        taskDetails.status = 'Cancelled';
                    }
        dispatch(replyNotification(user._id, taskId, status, comment));
        dispatch(updateTask(taskId, taskDetails));
      } else {
        console.log('Comment is empty or not provided for taskId: ', taskId);
      }
    }
    setPopupVisible(false);
  };

//   const handleReply = (status, taskId) => {
//     const comment = comments[taskId];
//     if (status === 'Accept & Modified') {
//       navigation.navigate('Updatetask', { taskId: taskId, userComment: comment, status: status });
//         // Optionally dispatch an update notification if required
//         // dispatch(updateNotification(taskId, date, time, comment));
//     } else {
//         if (comment) {
//             let taskDetails = {
//                 comment: comment,
//                 status: status,  // Default to current status
//             };
            
//             if (status === 'Accepted') {
//                 taskDetails.status = 'To do';
//             } else if (status === 'Rejected') {
//                 taskDetails.status = 'Cancelled';
//             }
            
//             dispatch(replyNotification(user._id, taskId, status, comment));
//             dispatch(updateTask(taskId, taskDetails));
//         } else {
//             console.log('Comment is empty or not provided for taskId: ', taskId);
//         }
//     }
//     setPopupVisible(false);
// };



  // const handleReply = useCallback((status, taskId) => {
  //   const comment = comments[taskId];
  //   if (status === 'Accept & Modified') {
  //     navigation.navigate('Updatetask', { taskId: taskId, userComment: comment });
  //   } else {
  //     if (comment) {
  //       dispatch(replyNotification(user._id, taskId, status, comment));
  //     } else {
  //       console.log('Comment is empty or not provided for taskId: ', taskId);
  //     }
  //   }
  // }, [comments, dispatch, navigation, user._id]);
  // const openPopup = () => {
  //   setPopupVisible(true);
  // };

  const closePopup = () => {
    setPopupVisible(null);
  };

  // console.log(task,"sa")

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const [selectedTask, setSelectedTask] = useState(null);

  // const openPopup = taskId => {
  //   // Fetch the task details using taskId
  //   const taskDetails = notifications.find(
  //     notification => notification.taskId === taskId,
  //   );
  //   setSelectedTask(taskDetails);
  //   setPopupVisible(true);
  // };

  // When a notification is clicked to open the popup, also initialize the modifiedDate and modifiedTime
  const openPopup = taskId => {
    const taskDetails = notifications.find(
      notification => notification.taskId === taskId,
    );
    setSelectedTask(taskDetails);
    setPopupVisible(taskId);    // Initialize the date and time to the task's current values or to current date/time as a fallback
    setModifiedDate(
      taskDetails
        ? new Date(taskDetails.created).toLocaleDateString()
        : new Date().toLocaleDateString(),
    );
    setModifiedTime(
      taskDetails
        ? new Date(taskDetails.created).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
        : new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
    );
  };

  const handlePopup = (taskId) => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to Ok OR Cancel this Task?`,
      [
        {
          text: 'Cancel',
          onPress: () => handleok('Rejected', taskId),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleok('Accepted', taskId),
        },
      ],
      { cancelable: false }
    );
  };
  
  const handleok = (status, taskId) => {
    let taskDetails = {
      status: status,
    };
    if (status === 'Accepted') {
      taskDetails.status = 'To do';
    } else if (status === 'Rejected') {
      taskDetails.status = 'Cancelled';
    }
    // dispatch(replyNotification(user._id, taskId, status, comment));
    dispatch(updateTask(taskId, taskDetails));
    console.log(`Task ${taskId} updated with status: ${taskDetails.status}`);
  };
    
  return (
    <>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pressBack}>
          <FontAwesomeIcon icon={faArrowLeft} size={30} color='white'/>
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Notifications</Text>
      </View>
      <ScrollView
      style={{maxHeight:'80%'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3498db']}
          />
        }>
        <View style={styles.notificationsContainer}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
          //  const userProfileImage = userData.find(user => user._id === notification.userid)?.profileImage || require('../Images/profile.png'); // Fallback to a default image if not found

            <View style={styles.notificationItem} key={index}>
              <View style={styles.profileSection}>
                <Image
                  source={notification.owner?.profilePic ? {uri: notification.owner?.profilePic} : require('../Images/profile.png')}
                  style={styles.profileImage}
                />
              </View>
              
              <TouchableOpacity
                onPress={() => openPopup(notification.taskId)}
                style={styles.notificationDetails}>
                <View style={styles.notificationText}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationDescription}>
                    {notification.description}
                  </Text>
                  <View style={{flexDirection:'row', gap:5 , alignItems:'center'}}>
                    <FontAwesomeIcon icon={faClock  } size={15} color='#EA791D'/>
                  <Text style={styles.notificationTime}>
                  {formattedTime(notification.created)}
                  </Text>
                  </View>
                  {/* <Text style={styles.notificationOwner}>
                  Sender: {notification.owner?.name}
                  </Text> */}
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row', gap:5 , alignItems:'center'}}>
                    <FontAwesomeIcon icon={faCalendar} size={15} color='#14447B'/>
                  <Text style={styles.notificationCreated}>
                  {formattedDate(notification.created)}
                  </Text>
                  </View>
                  <TouchableOpacity onPress={() => handlePopup(notification.taskId)}>
                    <FontAwesomeIcon icon={faEllipsisV} size={20}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={popupVisible === notification.taskId}
                onRequestClose={() => closePopup()}>
                <View style={styles.popupContainer}>
                  <View style={styles.popupContent}>
                    <Pressable style={styles.close} onPress={closePopup}>
                      <FontAwesomeIcon icon={faClose} size={20} color="black" />
                      {/* <Text style={styles.closeText}>Close</Text> */}
                    </Pressable>
                    {selectedTask && (
                      <>
                        {/* <Text>Title: {selectedTask.taskName}</Text> */}
                        <Text style={styles.inmodel}>
                          {selectedTask.description}
                        </Text>
                        <Text style={styles.inmodel}>
                          Owner: {selectedTask.owner?.name}
                        </Text>
                          <Text style={styles.inmodel}>
                          Time: {formattedTime(selectedTask.created)}
                          {/* Time */}
                        </Text>
                        <Text style={styles.inmodel}>
                          Date: {formattedDate(selectedTask.created)}
                          {/* Date */}
                        </Text>
                       
                      </>
                    )}
                    {/* <Text>Title: {task.taskName}</Text>
                    <Text>Description: {task.description}</Text> */}

                    <Text style={styles.popupText}>Comment</Text>
                    <TextInput
                      style={styles.popupInput}
                      placeholder="Enter your comment"
                      placeholderTextColor="#A9A9A9"
                      value={comments[selectedTask?.taskId] || ''}
                      onChangeText={text => {
                        setComments({
                          ...comments,
                          [selectedTask?.taskId]: text, 
                        });
                      }}
                    />
                    <View style={styles.popupButtons}>
                      <TouchableOpacity
                        style={styles.popupButton1}
                        onPress={() =>
                          selectedTask &&
                          handleReply('Accepted', selectedTask.taskId)
                        }>
                        <Text style={styles.popupButtonText}>Accept</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.popupButton2}
                        onPress={() =>
                          selectedTask &&
                          handleReply('Accept & Modifed', selectedTask.taskId)
                        }>
                        <Text style={styles.popupButtonText}>
                          Accept & Modify
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.popupButton3}
                        onPress={() =>
                          selectedTask &&
                          handleReply('Rejected', selectedTask.taskId)
                        }>
                        <Text style={styles.popupButtonText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          ))
        ):(
          <View style={styles.emptyNotificationsContainer}>
            <Text style={styles.emptyNotificationsText}>No notifications</Text>
          </View>
        )}
        </View>
      </ScrollView>
      {/* <HomeFooter/> */}
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#0A91d0',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight:'bold'
  },
  notificationsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  profileSection: {
    marginRight: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius:50
  },
  notificationDetails: {
    flex: 1,
  },
  notificationText: {
    backgroundColor: '#E6E6FA',
    // borderRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  notificationDescription: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  notificationTime: {
    fontSize: 14,
    color: 'black',
  },
  notificationOwner: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  notificationCreated: {
    fontSize: 14,
    color: 'black',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  close: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeText: {
    backgroundColor: '#EA791D',
    color: 'black',
    padding: 10,
    borderRadius: 10,
  },
  popupText: {
    color: 'black',
    fontSize: 20,
  },
  popupInput: {
    // backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    color:'black'
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  popupButton1: {
    backgroundColor: '#90EE90',
    padding: 8,
    borderRadius: 5,
  },
  popupButton2: {
    backgroundColor: '#ADD8E6 ',
    padding: 8,
    borderRadius: 5,
  },
  popupButton3: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  popupButtonText: {
    color: 'black',
  },
  inmodel: {
    color: 'black',
    // marginBottom:5
  },
  emptyNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyNotificationsText: {
    fontSize: 18,
    color: '#888',
  },
});

export default Notifications;

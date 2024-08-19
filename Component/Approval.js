import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ToastAndroid,
  Modal,
  Linking,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faArrowLeft,
  faClock,
  faUser,
  faCircleCheck,
  faCircleXmark,
  faClose,
  faCalendar,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchTasks, updateCategory} from '../Redux/Action/TaskAction';
import {TextInput} from 'react-native-gesture-handler';
import Tooltip from 'react-native-walkthrough-tooltip';

const Approval = () => {
  const navigation = useNavigation();

  const handleleesthenpress = () => {
    navigation.navigate('Home');
  };
  const handleBellPress = () => {
    navigation.navigate('Notifications');
    dispatch(updateNotificationAction(currentUserID._id));
    // setHasNotifications(!hasNotifications);
  };
  const [hasNotifications, setHasNotifications] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selectedButton, setSelectedButton] = useState('All');
  const task = useSelector(state => state.tasks.task || []);
  const notifications = useSelector(state => state.notifications.notifications);
  const currentUserID = useSelector(state => state.user.userData);

  // console.log(task,"task")
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchTasks());
    setRefreshing(false);
  };
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const taskId = 'yourTaskIdHere';
  //   const category = 'yourNewCategoryHere';
  //   const status = 'yourNewStatusHere';
  //   dispatch(updateCategory(taskId, category, status));
  // }, [dispatch]);

  const handleButtonApproved = taskId => {
    const category = 'Approved';
    const status = 'Completed';
    dispatch(updateCategory(taskId, category, status, remark));
    setModalVisible(false);
    ToastAndroid.showWithGravity(
      'Approved Sucessfully',
      ToastAndroid.CENTER,
      ToastAndroid.CENTER,
      200,
      200,
    );
  };

  const handleButtonUnapproved = taskId => {
    const category = 'Unapproved';
    const status = 'In Progress';
    dispatch(updateCategory(taskId, category, status, remark));
    setModalVisible(false);
    ToastAndroid.showWithGravity(
      'Unapproved Sucessfully',
      ToastAndroid.CENTER,
      ToastAndroid.CENTER,
      200,
      200,
    );
    setModalVisible(false);
  };

  const handleButton = category => {
    setFilter(category);
    setSelectedButton(category); // If you want to show which button is currently selected
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const userData = useSelector(state => state.user.userData);
  // console.log(userData,"data")
  const filteredTasks = task.filter(t => {
    if (filter === 'All')
      return t.status === 'Completed' || t.status === 'Cancelled';
    return t.category === filter;
  });

  // const filteredTasks = task.filter(task => {
  //   // Ensure task.people is treated as an array even if it's undefined.
  //   const isPersonInvolved = Array.isArray(task.people) && task.people.some(person => person.id === userData._id);

  //   // Assuming task.status is where the status is stored
  //   const isTaskCompleted = task.status === 'Completed';

  //   // Return true if both conditions are met
  //   return isPersonInvolved && isTaskCompleted;
  // });

  const [selectedTask, setSelectedTask] = useState(null);

  const DownloadPdf = taskId => {
    // Find the task by ID
    const task = filteredTasks.find(task => task._id === taskId);

    if (task && task.pow?.file) {
      const fileUrl = task.pow.file;
      Linking.openURL(fileUrl).catch(err =>
        console.error('Failed to open URL:', err),
      );
    } else {
      console.error('No file URL provided or task not found.');
    }
  };

  const handleTaskPress = task => {
    setSelectedTask(task);
    setModalVisible(true);
    // setModalVisible(false);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [remark, setRemark] = useState(''); // State for holding remark input

  const [notificationToolTipVisible, setNotificationToolTipVisible] =
    useState(false);
  const handleLongPressNotification = () => {
    setNotificationToolTipVisible(true);
  };

  const onPressOut = () => {
    setNotificationToolTipVisible(false);
  };

  // const DownloadPdf = (pdfUrl) => {
  //   const link = document.createElement('a');
  //   link.href = pdfUrl;
  //   link.download = pdfUrl.split('/').pop();
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.task}>
        <TouchableOpacity onPress={handleleesthenpress}>
          <FontAwesomeIcon icon={faArrowLeft} size={30} color="#14447B" />
        </TouchableOpacity>
        <View>
          <Text style={styles.Approvals}>Approvals</Text>
        </View>
        {/* 
        <Tooltip
          isVisible={notificationToolTipVisible}
          content={<Text style={{color: 'black'}}>Notification</Text>}
          placement="bottom">
          <TouchableOpacity onPress={handleBellPress} onLongPress={handleLongPressNotification} onPressOut={onPressOut}>
          <View>
                <FontAwesomeIcon icon={faBell} size={35} color={'#14447B'} />
                {Array.isArray(notifications) &&
                  notifications.map(
                    notification =>
                      notification.action === 'true' &&
                      notification.userid === currentUserID._id && (
                        <View
                          style={{
                            backgroundColor: 'red',
                            paddingHorizontal: 7,
                            position: 'absolute',
                            left: 8,
                            bottom: 11,
                            borderRadius: 10,
                          }}
                          key={notification.id}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 12,
                            }}>
                            ●
                          </Text>
                        </View>
                      ),
                  )}
              </View>
        </TouchableOpacity>
        </Tooltip> */}
      </View>

      <View style={styles.buttonall}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: filter === 'All' ? '#0A91D0' : '#add8e6'},
          ]}
          onPress={() => handleButton('All')}>
          <Text
            style={[
              styles.text,
              {color: filter === 'All' ? 'white' : '#0A91D0'},
            ]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: filter === 'Approved' ? '#0A91D0' : '#ABD1E3'},
          ]}
          onPress={() => handleButton('Approved')}>
          <Text
            style={[
              styles.text,
              {color: filter === 'Approved' ? 'white' : '#0A91D0'},
            ]}>
            Approved
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: filter === 'Unapproved' ? '#0A91D0' : '#add8e6',
            },
          ]}
          onPress={() => handleButton('Unapproved')}>
          <Text
            style={[
              styles.text,
              {color: filter === 'Unapproved' ? 'white' : '#0A91D0'},
            ]}>
            Unapproved
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{maxHeight: '80%'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3498db']}
            tintColor="#3498db"
          />
        }>
        {filteredTasks.map((task, index) => (
          <TouchableOpacity  key={task._id} onPress={() => handleTaskPress(task)}>
            <View key={index} style={styles.container1}>
              <View style={styles.container2}>
                <View style={styles.title}>
                  <Text style={styles.p}>{task.taskGroup?.groupName}</Text>
                  <Text style={styles.h}>{task.taskName}</Text>
                  <View style={{flexDirection: 'row', gap: 8}}>
                    <FontAwesomeIcon
                      icon={faClock}
                      size={20}
                      style={{color: '#EA791D'}}
                    />
                    <Text style={{...styles.faclock, color: '#EA791D'}}>
                      {task.reminder}
                    </Text>
                    <FontAwesomeIcon icon={faUser} size={20} color="#14447B" />
                    {task.people && task.people.length > 0 && (
                      <Text style={{color: 'black'}}>
                        {task.people[0].role || task.people[0].name}
                        {task.people.length > 1 &&
                          ` and ${task.people.length - 1} others`}
                      </Text>
                    )}
                  </View>
                  <View style={{flexDirection: 'row', gap: 150}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      {task.category ? (
                        <>
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            size={12}
                            color="#14447B"
                          />
                          <Text style={{color: 'black'}}>{task.category}</Text>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            size={12}
                            color="#14447B"
                          />
                          <Text style={{color: 'black'}}>not updated</Text>
                        </>
                      )}
                    </View>
                    <View>
                      <Text style={{color: 'black'}}>{task.status}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 30,
                    justifyContent: 'flex-end',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* {filter === 'All' && (
                      <>
                        {(!task.category || task.category === 'Approved') && (
                          <TouchableOpacity
                            onPress={() => handleButtonApproved(task._id)}>
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              size={35}
                              color="#14447B"
                            />
                          </TouchableOpacity>
                        )}
                        {(!task.category || task.category === 'Unapproved') && (
                          <TouchableOpacity
                            onPress={() => handleButtonUnapproved(task._id)}
                            style={{marginLeft: 20}}>
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              size={35}
                              color="#14447B"
                            />
                          </TouchableOpacity>
                        )}
                      </>
                    )} */}
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedTask && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{alignSelf: 'flex-end'}}>
                {/* Close button content */}
                <FontAwesomeIcon icon={faClose} size={23} />
              </TouchableOpacity>
              <View>
                <View style={styles.title}>
                  {/* <Text style={styles.p}>
                    {selectedTask.taskGroup?.groupName}
                  </Text> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 7,
                      marginVertical: 10,
                    }}>
                    <Text style={styles.h}>TaskName :</Text>
                    <Text style={{color: 'black', fontSize: 18, width:200}}>
                      {selectedTask.taskName}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      backgroundColor: '#FAF9F6',
                      borderRadius: 10,
                      padding: 15,
                    }}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <FontAwesomeIcon
                        icon={faUser}
                        size={30}
                        color="#14447B"
                      />
                      {selectedTask.people &&
                        selectedTask.people.length > 0 && (
                          <Text style={{color: 'black', marginTop: 5}}>
                            {selectedTask.people[0].role ||
                              selectedTask.people[0].name}
                            {selectedTask.people.length > 1 &&
                              ` and ${selectedTask.people.length - 1} others`}
                          </Text>
                        )}
                    </View>

                    <View style={{gap: 8, marginTop: 10, padding: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                          justifyContent: 'center',
                        }}>
                        <FontAwesomeIcon
                          icon={faCalendar}
                          color="#14447B"
                          size={20}
                        />
                        <View>
                          <Text style={{color: 'black'}}>
                            {selectedTask.startDate}
                          </Text>
                          <Text style={{color: 'black', textAlign: 'center'}}>
                            TO
                          </Text>
                          <Text style={{color: 'black'}}>
                            {selectedTask.endDate}
                          </Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', gap: 5}}>
                        <FontAwesomeIcon
                          icon={faClock}
                          size={20}
                          style={{color: '#EA791D'}}
                        />
                        <Text style={{...styles.faclock, color: '#EA791D'}}>
                          {selectedTask.reminder}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              {/* Display selected task details */}
              {/* Status update buttons */}

              {selectedTask.status === 'Cancelled' && (
                <View>
                  {selectedTask.remark?.text && (
                    <View
                      style={{
                        marginVertical: 5,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'black',
                          fontSize: 16,
                          marginVertical: 5,
                        }}>
                        Remark
                      </Text>
                      <Text style={{color: 'black'}}>
                        {selectedTask.remark?.text}
                      </Text>
                    </View>
                  )}

                  {selectedTask.remark?.date && (
                    <View
                      style={{
                        marginVertical: 10,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'black',
                          fontSize: 16,
                          marginVertical: 5,
                        }}>
                        Deadline Date
                      </Text>
                      <Text style={{color: 'black'}}>
                        {selectedTask.remark?.date}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {selectedTask.status === 'Completed' && (
                <View>
                  {selectedTask.pow?.text && (
                    <View
                      style={{
                        marginVertical: 5,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        marginBottom:10
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'black',
                          fontSize: 16,
                          marginVertical: 5,
                        }}>
                        Proof of Work
                      </Text>
                      <Text style={{color: 'black'}}>
                        {selectedTask.pow?.text}
                      </Text>
                    </View>
                  )}

                  {selectedTask.pow?.file && (
                     <TouchableOpacity 
                     onPress={() => DownloadPdf(selectedTask._id)}>
                    <View
                      style={{
                        marginVertical: 10,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'black',
                          fontSize: 16,
                          marginVertical: 5,
                        }}>
                        Download Proof Pdf
                      </Text>
                        {/* <Text style={{color: 'black'}}>
                          {selectedTask.pow?.file}
                        </Text> */}
                        <FontAwesomeIcon icon={faFilePdf} size={30} color='#14447B'/>
                      
                    </View>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  gap: 50,
                  marginTop:10
                }}>
                <TouchableOpacity
                  style={styles.Approvalbtn}
                  onPress={() => handleButtonApproved(selectedTask._id)}>
                  {/* <FontAwesomeIcon
                            // icon={faCircleCheck}
                            // size={35}
                            // color="#14447B"
                          > */}
                  <Text style={{color: 'white', padding: 5, fontSize: 15, fontWeight:'bold'}}>
                    Approve
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleButtonUnapproved(selectedTask._id)}
                  style={styles.Approvalbtn}>
                  {/* <FontAwesomeIcon
                            icon={faCircleXmark}
                            size={35}
                            color="#14447B"
                          /> */}
                  <Text style={{color: 'white', padding: 5, fontSize: 15, fontWeight:'bold'}}>
                    Unapprove
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Approval;
const styles = {
  container: {
    // marginHorizontal:10,
    flexDirection: 'column',
  },
  task: {
    flexDirection: 'row',
    gap: 110,
    // justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 18,
    // gap: 50,
  },
  Approvals: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
  },

  button: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
  },
  container2: {
    flexDirection: 'column',
  },
  checkbox: {
    width: 27,
    height: 27,
    borderColor: '#14447B',
    borderWidth: 3,
    marginRight: 10,
    borderRadius: 4,
  },
  p: {
    fontSize: 15,
    color: '#a9a9a9',
  },
  h: {
    fontSize: 15,
    // marginTop: 5,
    // marginBottom: 5,
    color: 'black',
  },
  buttonall: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
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
    borderRadius: 8,
    // width: '80%',
    color: 'white',
  },
  Approvalbtn: {
    padding: 5,
    backgroundColor: '#EA791D',
    borderRadius: 10,
  },
  remarkInput: {
    color: 'black',
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  title: {
    flexDirection: 'column',
    gap: 10,
  },
};

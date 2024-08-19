import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBriefcase,
  faBook,
  faUser,
  faFeather,
  faGlobe,
  faPencil,
  faEye,
  faTrash,
  faEdit,
  faLeftLong,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasksCount} from '../Redux/Action/TaskAction';
// import Progress from '../Component/Progress';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../Config';
import axios from 'axios';
import {deleteTGroup, fetchTaskGroups} from '../Redux/Action/TaskGroupaction';
import userReducer from '../Redux/Reducers/UserReducer';
import {} from 'react-native-svg';
import Tooltip from 'react-native-walkthrough-tooltip';

const TaskGroup = ({onScrollStart}) => {
  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.taskGroups);
  const Tgroup = useSelector(state => state.TGgroup.TGroup);
  const userData = useSelector(state => state.user.userData);
  // console.log(userData,'njjn')

  // console.log(Tgroup,"taskGroup")
  // const { cCount, tCount } = useSelector(state => state.tasks);
  // console.log(cCount,tCount,"count")
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [modelVisiable, setModelViable] = useState(false);

  const userRole = 1;

  useEffect(() => {
    dispatch(fetchTaskGroups());
  }, [dispatch]);

  // useEffect(() => {
  //   if (task && task.length > 0) {
  //     task.forEach(group => {
  //       dispatch(fetchTasksCount(group.groupName));
  //       console.log(group.groupName,"ssss")
  //     });
  //   }
  // }, [dispatch, task]);

  // const getIcon = groupType => {
  //   switch (groupType) {
  //     case 'book':
  //       return faBook;
  //     case 'faBriefcase':
  //       return faBriefcase;
  //     case 'faUser':
  //       return faUser;
  //     case 'faGlobe':
  //       return faGlobe;
  //     case 'faFeather':
  //       return faFeather;
  //     default:
  //       return faBriefcase;
  //   }
  // };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchTaskGroups());
    setRefreshing(false);
  };

  const open = (taskGroup , taskGroupId) => {
    console.log('taskgrop',taskGroup, taskGroupId )
    navigation.navigate('Calenderone', {taskGroup, taskGroupId});
  };

  // const EditProjectGroup = (taskId) => {
  //   navigation.navigate('ProjectGroupEdit', {taskId:  ,});
  // };

  // const EditProjectGroup = (
  //   updatedTGroup,
  //   name,
  //   profilePic,
  //   members,
  //   deptHead,
  //   projectLead,
  // ) => {
  //   const TGroupId = updatedTGroup;
  //   navigation.navigate('ProjectGroupEdit', {
  //     TGroupId,
  //     name,
  //     profilePic,
  //     members,
  //     deptHead,
  //     projectLead,
  //   });
  // };

  const EditProjectGroup = (
    updatedTGroup,
    name,
    profilePic,
    members,
    projectLead,
    deptHead,
  ) => {
    const TGroupId = updatedTGroup;
    navigation.navigate('EditProjectGroup', {
      TGroupId,
      name,
      profilePic,
      members,
      projectLead,
      deptHead,
    });
  };

  // const handleDelete = async TGroupId => {
  //   try {
  //     setModelViable(false);
  //     const response = await axios.delete(`${BASE_URL}/delete/${TGroupId}`);
  //     if (response.status === 200) {
  //       // onDelete(task.id);
  //       // Alert.alert('Success', 'Task deleted successfully');
  //       // setModelViable(false);
  //     } else {
  //       Alert.alert('Error', 'Failed to delete task');
  //     }
  //   } catch (error) {
  //     // console.error('Error deleting task:', error);
  //     // Alert.alert('Error', 'An error occurred while deleting task');
  //   }
  // };
  // const dispatch = useDispatch();
  // const [taskGroups, setTaskGroups] = useState(task);

  const handleDelete = TGroupId => {
    Alert.alert(
      'Delete Project Group', // Title of the alert
      'Are you sure you want to delete this Project group?', // Message of the alert
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Put the deletion logic here, which is called when "OK" is pressed
            dispatch(deleteTGroup(TGroupId));
            dispatch(fetchTaskGroups());
          },
        },
      ],
      {cancelable: false}, // This prevents the alert dialog from being dismissed by cliing oucktside of it
    );
  };

  // const [isScrolling, setIsScrolling] = useState(false); // New state to track scrolling
  const [scrollViewHeight, setScrollViewHeight] = useState('50%'); // Initial height is 50%
  const handleScroll = () => {
    // setScrollViewHeight('80%'); // Increase height to 80% when scrolling
    if (onScrollStart) {
      onScrollStart();
    }
    setScrollViewHeight('80%'); // Your existing logic
  };

  const [isVisibleEye, setisVisiableEye] = useState(false);
  const [VisiableEdit, setVisiableEdit] = useState(false)


  const onLongPressEye = () => {
    setisVisiableEye(true);
  }

  const PressGroupEdit = () => {
    setVisiableEdit(true);
  }

  const onPressOut = () => {
    setisVisiableEye(false);
    setVisiableEdit(false);
  }

  return (
    <ScrollView
      style={[styles.scrollView]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#3498db']}
          tintColor="#3498db"
        />
      }
      onScroll={handleScroll}
      scrollEventThrottle={16} 
    >
      {Array.isArray(Tgroup) &&
        Tgroup.map((taskGroup, index) => (
          // <View style={styles.taskstatus}>
          <View style={styles.task} key={taskGroup._id}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              {taskGroup.profilePic ? (
                <Image
                  source={{uri: taskGroup.profilePic}}
                  style={{width: 40, height: 40, borderRadius: 50}}
                />
              ) : (
                <Image
                  source={require('../Images/profile.png')}
                  style={{width: 40, height: 40}}
                />
              )}

              <Text style={styles.txt}>{taskGroup.groupName}</Text>
            </View>

            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
              <Tooltip
              isVisible={isVisibleEye}
              content={<Text style={{color: 'black'}}>View Task</Text>}
              placement="top"
              onClose={() => setisVisiableEye(false)}
              >
              <TouchableOpacity
                key={index}
                onPress={() => open(taskGroup.groupName , taskGroup._id)}
                onLongPress={onLongPressEye}
                onPressOut={onPressOut}
                >
                <FontAwesomeIcon icon={faEye} size={23} color="#14447B" />
              </TouchableOpacity>
              </Tooltip>

              {userData && (userData.userRole == 0 ||
              userData.userRole == 1 ||
              userData.userRole == 2) ? (

                <Tooltip
                isVisible={VisiableEdit}
                placement="top"
                content={<Text style={{color:'black'}}>Group Edit</Text>}
                >
                <TouchableOpacity
                  onPress={() =>
                    EditProjectGroup(
                      taskGroup._id,
                      taskGroup.groupName,
                      taskGroup.profilePic,
                      taskGroup.members,
                      taskGroup.projectLead,
                      taskGroup.deptHead,
                     
                    )
                  } onLongPress={PressGroupEdit} onPressOut={onPressOut}>
                  <FontAwesomeIcon icon={faEdit} size={23} color="#14447B" />
                </TouchableOpacity>
                </Tooltip>
              ) : null}
              {userData && (userData.userRole == 0 || userData.userRole == 1) ? (
                <TouchableOpacity onPress={() => handleDelete(taskGroup._id)}>
                  <FontAwesomeIcon icon={faTrash} size={23} color="#14447B" />
                </TouchableOpacity>
              ) : null}
              {/* <TouchableOpacity
                onPress={() =>
                  handleEdit(
                    taskGroup._id,
                    taskGroup.groupName,
                    taskGroup.profilePic,
                    taskGroup.members,
                    taskGroup.deptHead,
                    taskGroup.projectLead,
                  )
                }>
                <FontAwesomeIcon icon={faLeftLong} size={20} />
              </TouchableOpacity> */}

              <Modal
                animationType="slide"
                transparent={true}
                visible={modelVisiable}
                onRequestClose={() => setModelViable(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                      Are you sure you want to Delete Task Group?
                    </Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={() => setModelViable(false)}>
                        <Text style={styles.text}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={styles.text}>Ok</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          // </View>
        ))}
    </ScrollView>
  );
};

export default TaskGroup;

const styles = StyleSheet.create({
  // scrollView: {
  //   height: '38%', // Initial height
  // },
  // scrollViewMaximized: {
  //   height:'70%', // 60% of device height
  // },
  task: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    width: 130,
  },
  taskstatus: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginHorizontal: 20,
    // marginVertical: 5,
    // padding: 20,
    // backgroundColor: 'white',
    // borderRadius: 10,
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

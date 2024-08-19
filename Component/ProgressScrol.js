import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasks} from '../Redux/Action/TaskAction';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Statusbar from './Statusbar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Circle} from 'react-native-svg';
import {faCircle, faRefresh, faUpload, faUser} from '@fortawesome/free-solid-svg-icons';

const ProgressScrol = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.task || []);
  const currentUserID = useSelector((state)=>state.user.userData)

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  // const getInProgressTasksForToday = () => {
  //   const today = new Date();
  //   const formattedToday = `${today.getFullYear()}/${today.getDate()}/${
  //     today.getMonth() + 1
  //   }`;

  const inProgressTasks = tasks.filter(t => {
    const isStatus = t.status === 'In Progress';
    const isCurrentUserTask = currentUserID?._id && t.people?.some(person => person.userId === currentUserID._id);
    return isStatus && isCurrentUserTask;
  });
  

  // return inProgressTasks;
  // };

  // const inProgressTasksForToday = getInProgressTasksForToday();

  // useEffect(() => {
  //   getInProgressTasksForToday();
  // }, []);

  const openTask = (taskGroup, taskGroupId) => {
    navigation.navigate('Calenderone', {taskGroup, taskGroupId});
  };
  return (
    <View>
      {inProgressTasks.length > 0 ? (
        <ScrollView horizontal={true} scrollToOverflowEnabled={false}>
          {inProgressTasks.map(task => (
            <View key={task._id} style={styles.taskContainer}>
              <TouchableOpacity onPress={() => openTask(task.taskGroup?.groupName, task.taskGroup?.groupId)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.txt}>{task.taskGroup?.groupName} </Text>
                  <Text style={styles.txt}>{task.startDate}</Text>
                </View>
                <Text style={styles.txt2}>{task.taskName}</Text>
                <View style={{flexDirection:'row', gap:5, marginTop:7}}>
                  <FontAwesomeIcon icon={faUser} size={15} color="#14447B"/>
                <Text style={styles.txt}>
                  {task.people && task.people.length > 0 && (
                    <React.Fragment>
                      <Text>{task.people[0].name}</Text>
                      {task.people.length > 1 && (
                        <Text> and {task.people.length - 1} others</Text>
                      )}
                    </React.Fragment>
                  )}
                </Text>
                </View>
                {/* <View style={{flexDirection: 'row', gap: 5, marginTop: 3}}>
                  <FontAwesomeIcon icon={faRefresh} size={15} color="#14447B" />
                  <Text style={{color: 'green'}}>{task.status}</Text>
                </View> */}
              </TouchableOpacity>

              {/* <Statusbar/> */}
            </View>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#0A91d0',
            marginTop: 7,
            marginHorizontal:20,
            borderRadius: 10,
          }}>
          <Text style={styles.noTaskMessage}>No In Progress tasks</Text>
        </View>
      )}
    </View>
  );
};

export default ProgressScrol;

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#FAD9BA',
    // height: 120,
    padding: 15,
    margin: 10,
    borderRadius: 20,
  },
  txt: {
    color: 'black',
    fontWeight: '400',
    paddingBottom: 10,
  },
  txt2: {
    color: 'black',
    fontWeight: '600',
    width: 180,
  },
  noTaskMessage: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Modal,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTaskStatus } from '../Redux/Action/TaskAction';
import moment from 'moment';
import Buttens from '../Component/Buttens';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faClose, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchCompletedTasksCount as fetchCount } from '../Redux/Action/TaskAction';

const Projects = ({ selectedDate, taskGroup, taskGroupId }) => {
  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.task || []);
  const allTask = useSelector(state => state.user.userData);
  const currentUserID = useSelector(state => state.user.userData);
  const navigation = useNavigation();

  const userRole = allTask?.userRole;
  const isCurrentUserAdmin = userRole === 0;
  const isCurrentUserDepartmentHead = userRole === 1;
  const isCurrentUserProjectLead = userRole === 2;

  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('All');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchTasks());
    setRefreshing(false);
  };

  const [showAll, setShowAll] = useState(false);
  const open = () => {
    navigation.navigate('Calenderone');
  };

  const filteredTasks = task.filter(t => {
    const taskStartDate = moment(t.startDate, ['DD/MM/YYYY', 'YYYY/MM/DD']);
    const momentSelectedDate = moment(selectedDate, 'YYYY-MM-DD');
    const isSameDay = taskStartDate.isSame(momentSelectedDate, 'day');
    const statusMatch = currentStatus === 'All' || t.status === currentStatus;
    const taskGroupMatch = !taskGroupId || t.taskGroup?.groupId === taskGroupId;

    const isCurrentUserTask =
      t.people?.some(person => person.userId === currentUserID?._id) ?? false;
    const tasksToShow =
      isCurrentUserAdmin ||
      isCurrentUserDepartmentHead ||
      isCurrentUserProjectLead ||
      isCurrentUserTask;

    return isSameDay && statusMatch && taskGroupMatch && tasksToShow;
  });

  const handleUpdateStatus = () => {
    if (!selectedTask) {
      alert('Task not selected!');
      return;
    }
    if (!selectedStatus) {
      alert('Status not selected!');
      return;
    }

    const taskId = selectedTask._id;
    dispatch(updateTaskStatus(taskId, selectedStatus));
    setModalVisible(false);
    fetchCount();
  };

  const handleTaskPress = (taskId, taskGroup, taskName, description, people, startDate, endDate, reminder, audioFile, pdfFile) => {
    navigation.navigate('ProjectsView', { taskId, taskGroup, taskName, description, people, startDate, endDate, reminder, audioFile, pdfFile });
  };

  const [buttonPressed, setButtonPressed] = useState(false);

  const handleStatusButtonPress = status => {
    setSelectedStatus(status);
    setButtonPressed(true);
  };

  return (
    <>
      <Buttens onStatusChange={status => setCurrentStatus(status)} />
      <TouchableOpacity
        onPress={open}
        style={{
          marginTop: 25,
          marginRight: 20,
          alignItems: 'flex-end',
        }}>
        {taskGroup && (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <FontAwesomeIcon icon={faXmark} size={22} />
            <Text style={{ color: 'black', fontSize: 15 }}>{taskGroup} Task</Text>
          </View>
        )}
        {!taskGroup && (
          <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>All Tasks</Text>
        )}
      </TouchableOpacity>
      <ScrollView
        style={{ maxHeight: 380 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3498db']}
            tintColor="#3498db"
          />
        }>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                handleTaskPress(
                  task._id,
                  task.taskGroup,
                  task.taskName,
                  task.description,
                  task.people,
                  task.startDate,
                  task.endDate,
                  task.reminder,
                  task.audioFile,
                  task.pdfFile,
                )
              }
              style={styles.container}>
              <View style={styles.title}>
                <Text style={styles.p}>{task.taskGroup?.groupName}</Text>
                <Text style={styles.h}>{task.taskName}</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <FontAwesomeIcon
                    icon={faClock}
                    size={20}
                    style={{ color: '#EA791D' }}
                  />
                  <Text style={{ ...styles.faclock, color: '#EA791D' }}>
                    {task.reminder}
                  </Text>
                  <FontAwesomeIcon icon={faUser} size={20} color="#14447B" />
                  {task.people && task.people.length > 0 && (
                    <Text style={{ color: 'black' }}>
                      {task.people[0].role || task.people[0].name}
                      {task.people.length > 1 &&
                        ` and ${task.people.length - 1} others`}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTasksText}>
            No tasks matching this status on this date
          </Text>
        )}
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
                style={{ alignSelf: 'flex-end' }}>
                <FontAwesomeIcon icon={faClose} size={20} />
              </TouchableOpacity>
              <View>
                <View style={styles.title}>
                  <Text style={styles.p}>{selectedTask.taskGroup.groupName}</Text>
                  <Text style={styles.h}>{selectedTask.taskName}</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <FontAwesomeIcon
                      icon={faClock}
                      size={20}
                      style={{ color: '#EA791D' }}
                    />
                    <Text style={{ ...styles.faclock, color: '#EA791D' }}>
                      {selectedTask.reminder}
                    </Text>
                    <FontAwesomeIcon icon={faUser} size={20} color="#14447B" />
                    {selectedTask.people && selectedTask.people.length > 0 && (
                      <Text style={{ color: 'black' }}>
                        {selectedTask.people[0].role ||
                          selectedTask.people[0].name}
                        {selectedTask.people.length > 1 &&
                          ` and ${selectedTask.people.length - 1} others`}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 16,
                  textAlign: 'center',
                  marginBottom: 10,
                  padding: 10,
                }}>
                Status
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 10,
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => handleStatusButtonPress('In Progress')}
                  style={{
                    padding: 10,
                    backgroundColor: '#ffffe0',
                    borderColor:
                      buttonPressed && selectedStatus === 'In Progress'
                        ? 'yellow'
                        : '#ffffe0',
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      color: 'black',
                      ...(selectedStatus === 'In Progress'
                        ? { fontWeight: 'bold', color: 'blue' }
                        : {}),
                    }}>
                    In Progress
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleStatusButtonPress('Completed')}
                  style={{
                    padding: 10,
                    backgroundColor: '#90ee90',
                    borderColor:
                      buttonPressed && selectedStatus === 'Completed'
                        ? 'green'
                        : '#90ee90',
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      color: 'black',
                      ...(selectedStatus === 'Completed'
                        ? { fontWeight: 'bold', color: 'blue' }
                        : {}),
                    }}>
                    Completed
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleStatusButtonPress('Cancelled')}
                  style={{
                    padding: 10,
                    backgroundColor: '#ff6347',
                    borderColor:
                      buttonPressed && selectedStatus === 'Cancelled'
                        ? 'red'
                        : '#ff6347',
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      color: 'black',
                      ...(selectedStatus === 'Cancelled'
                        ? { fontWeight: 'bold', color: 'blue' }
                        : {}),
                    }}>
                    Cancelled
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'left' }}>
                <TouchableOpacity
                  onPress={handleUpdateStatus}
                  style={styles.savebtn}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      paddingLeft: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 20,
    gap: 4,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    fontSize: 12,
    color: '#a9a9a9',
  },
  h: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    color: 'black',
  },
  noTasksText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'black',
    marginTop: 20,
    fontSize: 16,
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
  },
  statusText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginBottom: 15,
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statusButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
  },
  savebtn: {
    padding: 10,
    backgroundColor: '#14447B',
    width: 70,
    borderRadius: 10,
    marginTop: 15,
  },
});
export default Projects;

import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  FlatList,
  PixelRatio,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faBell,
  faUser,
  faCheck,
  faCalendar,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import Date from '../Component/Date';
import Projets from '../Component/Projects';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasks, updateTaskStatus} from '../Redux/Action/TaskAction';
import moment from 'moment';

const Calender = () => {
  useEffect(() => {
    const currentDate = moment();
    const calendarData = [];

    for (let i =-2; i < 30; i++) {
      const date = currentDate.clone().add(i, 'days');
      calendarData.push({
        id: date.format('YYYY-MM-DD'),
        month: date.format('MMMM'),
        day: date.format('ddd'),
        date: date.format('D'),
      });
    }

    setData(calendarData);
    setFilter('All');
    handleCalendarPress(currentDate.format('YYYY-MM-DD'));
    setSelectedItem(currentDate.format('YYYY-MM-DD'));
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.calendarItem,
        {
          backgroundColor:
            selectedItem === item.id
              ? '#0A91D0'
              : moment().isSame(item.id, 'day')
              ? '#add8e6'
              : 'white',
        },
      ]}
      onPress={() => handleCalendarPress(item.id)}>
      <Text
        style={[
          styles.monthText,
          {color: selectedItem === item.id ? 'white' : 'black'},
        ]}>
        {item.month}
      </Text>
      <Text
        style={[
          styles.dateText,
          {color: selectedItem === item.id ? 'white' : 'black'},
        ]}>
        {item.date}
      </Text>
      <Text
        style={[
          styles.dayText,
          {color: selectedItem === item.id ? 'white' : 'black'},
        ]}>
        {item.day}
      </Text>
    </TouchableOpacity>
  );

  // const handleCalendarPress = (itemId) => {
  //   setSelectedItem(itemId);
  //   const filtered = task.filter((project) => {
  //     return moment(project.startDate, 'DD-MM-YYYY').isSame(itemId, 'date');
  //   });
  //   setFilteredData(filtered)
  // }

  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.task) || [];

  const [hasNotifications, setHasNotifications] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskId, setTaskId] = useState([]);
  const navigation = useNavigation();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [filt, setFilt] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterdata, setFilteredData] = useState([]);
  const [filteredProjectsArray, setfilteredProjectsArray] = useState([]);
  const [datefiltered, setdateFilterd] = useState(['All']);
  const [filt1, setFilt1] = useState(false);
  const [Todo, setTodo] = useState([]);

  const handleBellPress = () => {
    navigation.navigate('Notifications');
    // setHasNotifications(false);
  };

  const handleleesthenpress = () => {
    navigation.navigate('Home');
  };

  const handlefilter = status => {
    const filteredProjects = datefiltered.filter(project => {
      return status === 'All' || project.status === status;
    });
    setfilteredProjectsArray(filteredProjects);
    setFilter(status);
    setFilt(true);
    setFilt1(false);
  };

  const handleButton = status => {
    const filteredProjects = datefiltered.filter(project => {
      return status === 'All' || project.status === status;
    });
    setfilteredProjectsArray(filteredProjects);
    setFilter(status);
    setFilt(false);
    setFilt1(true);
  };

  const handleTodo = status => {
    const filteredProjects = datefiltered.filter(project => {
      if (status === 'All') {
        // Include all tasks
        return true;
      } else if (status === 'In Progress') {
        // Include only 'In Progress' tasks or tasks with no status
        return project.status === 'In Progress' || !project.status;
      }

      return false;
    });
    // console.log('filtered todo',filteredProjects)

    setTodo(filteredProjects);
    setFilter(status);
    setFilt(false);
    setFilt1(true);
  };

  const handleCalendarPress = itemId => {
    setSelectedItem(itemId);
    const filtered = task.filter(project => {
      return moment(project.startDate, 'DD-MM-YYYY').isSame(itemId, 'date');
    });

    setdateFilterd(filtered);
  };

  const handleButtonClick = index => {
    const updatedProjects = [...task];
    updatedProjects[index].isChecked = !updatedProjects[index].isChecked;
    setProjects(updatedProjects);
  };

  const handleProjectPress = project => {
    setSelectedProject(project);
    setTaskId(project._id);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProject(null);
    setTaskId(null);
  };

  const ProjectItem = ({
    taskGroup,
    taskName,
    people,
    reminder,
    isChecked,
    handleButtonClick,
  }) => (
    <View style={styles.Projets}>
      <View style={styles.title}>
        <Text style={styles.p}>{taskGroup}</Text>
        <Text style={styles.h}>{taskName}</Text>
        <View style={{flexDirection: 'row', gap: 8}}>
          <FontAwesomeIcon
            icon={faClock}
            size={20}
            style={{color: '#EA791D'}}
          />
          <Text style={{...styles.faclock, color: '#EA791D'}}>{reminder}</Text>
          <FontAwesomeIcon icon={faUser} size={20} color="#14447B" />
          <Text>People</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={styles.checkboxContainer}>
            <View
              style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
              {isChecked && (
                <Text>
                  <FontAwesomeIcon icon={faCheck} size={20} color="#14447B" />
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const PopupItems = ({
    taskId,
    taskGroup,
    description,
    taskName,
    people,
    reminder,
    isChecked,
    handleButtonClick,
    startDate,
    endDate,
  }) => (
    <View>
      <View style={styles.title}>
        <Text>{taskId}</Text>
        <Text style={styles.p}>{taskGroup}</Text>
        <Text style={styles.h}>{taskName}</Text>
        <Text style={styles.d}>{description}</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <FontAwesomeIcon icon={faUser} size={20} color="#14447B" />
          <Text>{people.map(person => person.name).join(', ')}</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row', gap: 8}}>
          <FontAwesomeIcon
            icon={faClock}
            size={20}
            style={{color: '#EA791D'}}
          />
          <Text style={{...styles.faclock, color: '#EA791D'}}>{reminder}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <FontAwesomeIcon icon={faCalendar} size={20} color="#14447B" />
          <Text> </Text>
          <Text>{startDate} TO </Text>
          <Text>{endDate}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={styles.checkboxContainer}>
            <View>
              {isChecked && (
                <Text>
                  <FontAwesomeIcon icon={faCheck} size={20} color="#14447B" />
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Filterproject = ({
    taskGroup,
    taskName,
    people,
    reminder,
    isChecked,
    handleButtonClick,
    status,
  }) => (
    <View style={styles.Projets}>
      <View style={styles.title}>
        <Text style={styles.p}>{taskGroup}</Text>
        <Text style={styles.h}>{taskName}</Text>
        <View style={{flexDirection: 'row', gap: 8}}>
          <FontAwesomeIcon
            icon={faClock}
            size={20}
            style={{color: '#EA791D'}}
          />
          <Text style={{...styles.faclock, color: '#EA791D'}}>{reminder}</Text>
          <FontAwesomeIcon icon={faUser} size={20} color="#14447B" />
          <Text>people</Text>
        </View>
        <Text style={{marginTop: 8, fontWeight: 'bold'}}>{status}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={styles.checkboxContainer}>
            <View
              style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
              {isChecked && (
                <Text>
                  <FontAwesomeIcon icon={faCheck} size={20} color="#14447B" />
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  // const fetchDataFromApi = async () => {
  //   try {
  //     const response = await fetch('http://192.168.29.178:5000/api/tasks');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setProjects(data);
  //     } else {
  //       console.error('Failed to fetch data from the API');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDataFromApi();
  // }, []);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // const handleUpdateStatus = async () => {
  //   try {
  //     if (!selectedStatus || !selectedProject || !selectedProject._id) {
  //       console.error('Selected status or taskId is not defined');
  //       return;
  //     }
  //     const taskId = selectedProject._id;

  //     const response = await fetch(`http://192.168.29.136:5000/api/tasks/${taskId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ status: selectedStatus }),
  //     });
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  //   setModalVisible(!isModalVisible);
  // };
  const handleUpdateStatus = () => {
    // Dispatch the updateTaskStatus action
    dispatch(updateTaskStatus(selectedStatus, selectedProject));
    setModalVisible(!isModalVisible);
  };

  const closebtn = () => {
    setModalVisible(!isModalVisible);
  };

  const handleStatusButtonPress = status => {
    setSelectedStatus(status);
    setButtonPressed(true);
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchTasks());
    setRefreshing(false);
  };
  return (
    <View style={styles.Calender}>
      <View style={styles.task}>
        <TouchableOpacity onPress={handleleesthenpress}>
          <View>
            <FontAwesomeIcon icon={faArrowLeft} size={25} color="#14447B" />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.today}>Today's Task</Text>
        </View>
        <TouchableOpacity onPress={handleBellPress}>
          <View>
            <FontAwesomeIcon
              icon={faBell}
              size={25}
              color={hasNotifications ? 'red' : '#14447B'}
            />
            {hasNotifications && (
              <Text
                style={{position: 'absolute', top: 5, right: 5, color: 'red'}}>
                ●
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.date}>
        <FlatList
          horizontal
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View>
        {/* <Text style={{textAlign:'center',marginTop:10}}>Selected date : ({selectedItem})</Text> */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
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
              {backgroundColor: filter === 'To do' ? '#0A91D0' : '#ABD1E3'},
            ]}
            onPress={() => handleTodo('To do')}>
            <Text
              style={[
                styles.text,
                {color: filter === 'To do' ? 'white' : '#0A91D0'},
              ]}>
              To do
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  filter === 'In Progress' ? '#0A91D0' : '#add8e6',
              },
            ]}
            onPress={() => handlefilter('In Progress')}>
            <Text
              style={[
                styles.text,
                {color: filter === 'In Progress' ? 'white' : '#0A91D0'},
              ]}>
              In progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: filter === 'Completed' ? '#0A91D0' : '#add8e6'},
            ]}
            onPress={() => handlefilter('Completed')}>
            <Text
              style={[
                styles.text,
                {color: filter === 'Completed' ? 'white' : '#0A91D0'},
              ]}>
              Completed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: filter === 'Cancelled' ? '#0A91D0' : '#add8e6'},
            ]}
            onPress={() => handlefilter('Cancelled')}>
            <Text
              style={[
                styles.text,
                {color: filter === 'Cancelled' ? 'white' : '#0A91D0'},
              ]}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        style={{marginBottom: '60%'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3498db']} // Android
            // tintColor="#3498db" // iOS
          />
        }>
        {filt1 === true && datefiltered.length === 0 ? (
          <Text
            style={{
              padding: 70,
              fontSize: 25,
              textAlign: 'center',
              color: 'black',
            }}>
            No tasks found for the selected date and status.
          </Text>
        ) : (
          filt === false &&
          datefiltered.map((project, index) => (
            <TouchableOpacity
              key={project.id}
              onPress={() => handleProjectPress(project)}>
              <ProjectItem
                taskGroup={project.taskGroup}
                taskName={project.taskName}
                people={project.people}
                reminder={project.reminder}
                isChecked={project.isChecked}
                handleButtonClick={() => handleButtonClick(index)}
              />
            </TouchableOpacity>
          ))
        )}

        {filt === true && filteredProjectsArray.length === 0 ? (
          <Text
            style={{
              padding: 70,
              fontSize: 25,
              textAlign: 'center',
              color: 'black',
            }}>
            No tasks found for the selected date and status.
          </Text>
        ) : (
          filt1 === false &&
          filteredProjectsArray.map((project, index) => (
            <TouchableOpacity
              key={project.id}
              onPress={() => handleProjectPress(project)}>
              <Filterproject
                taskGroup={project.taskGroup}
                taskName={project.taskName}
                people={project.people}
                reminder={project.reminder}
                status={project.status}
                isChecked={project.isChecked}
                handleButtonClick={() => handleButtonClick(index)}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {Todo.length === 0 ? (
        <Text>.</Text>
      ) : (
        Todo.map((project, index) => (
          <TouchableOpacity
            key={project.id}
            onPress={() => handleProjectPress(project)}>
            <ProjectItem
              taskGroup={project.taskGroup}
              taskName={project.taskName}
              people={project.people}
              reminder={project.reminder}
              s
              isChecked={project.isChecked}
              handleButtonClick={() => handleButtonClick(index)}
            />
          </TouchableOpacity>
        ))
      )}

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={closebtn}
              style={{alignItems: 'flex-end'}}>
              <FontAwesomeIcon icon={faClose} size={20} />
            </TouchableOpacity>
            <View style={{padding: 10}}>
              {selectedProject && (
                <PopupItems
                  taskId={selectedProject.taskId}
                  taskGroup={selectedProject.taskGroup}
                  taskName={selectedProject.taskName}
                  description={selectedProject.description}
                  people={selectedProject.people}
                  reminder={selectedProject.reminder}
                  startDate={selectedProject.startDate}
                  endDate={selectedProject.endDate}
                />
              )}
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              Status
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 5,
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
                      ? {fontWeight: 'bold', color: 'blue'}
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
                      ? {fontWeight: 'bold', color: 'blue'}
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
                      ? {fontWeight: 'bold', color: 'blue'}
                      : {}),
                  }}>
                  Cancelled
                </Text>
              </TouchableOpacity>
            </View>

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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Calender: {
    marginTop: 10,
  },
  task: {
    flexDirection: 'row',
    gap: 50,
    marginTop: 10,
    justifyContent: 'space-around',
  },
  today: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  date: {
    marginTop: 20,
  },
  scrollContainer: {
    marginTop: 15,
    flexDirection: 'row',
    padding: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#add8e6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    width: 300,
    paddingLeft: 10,
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
  d: {
    marginBottom: 15,
  },
  faclock: {
    fontSize: 16,
  },
  Projets: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 4,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    width: 27,
    height: 27,
    borderColor: '#14447B',
    borderWidth: 3,
    marginRight: 10,
    borderRadius: 4,
  },
  checkedCheckbox: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    color: 'white',
  },
  savebtn: {
    padding: 10,
    backgroundColor: '#14447B',
    width: 70,
    borderRadius: 10,
    marginTop: 15,
  },
  popup: {
    backgroundColor: 'black',
  },
  filter: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  calendarItem: {
    width: 100,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    margin: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default Calender;

import React from 'react';
import {
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faFilePdf,
  faMicrophone,
  faPen,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState, useRef} from 'react';
import {
  faBell,
  faAngleDown,
  faBriefcase,
  faClock,
  faCalendar,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import {ScrollView} from 'react-native-gesture-handler';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectList from '../Component/SelectList';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, fetchTasks} from '../Redux/Action/TaskAction';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {BASE_URL} from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
// If using react-native-webview
import {WebView} from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import moment from 'moment';
import AudioClip from '../Component/AudioClip';
import RNFS from 'react-native-fs';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import {
  updateNotificationAction,
  fetchNotifications,
} from '../Redux/Action/NotificationAction';
import {Tuple} from '@reduxjs/toolkit';
// import * as DocumentPicker from 'expo-document-picker';

const AddTask = ({route}) => {
  const task = useSelector(state => state.tasks.task);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [endTime, setTime] = useState(new Date());
  const [selected, setSelected] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const richText = useRef();
  // const audioRecorderPlayer = new AudioRecorderPlayer();
  const [audioPath, setAudioPath] = useState('');
  const [recordSecs, setRecordSecs] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [audioList, setAudioList] = useState([]);
  const notifications = useSelector(state => state.notifications.notifications);
  const currentUserID = useSelector(state => state.user.userData);
  // console.log(selected,'sel')
  const handleBellPress = () => {
    navigation.navigate('Notifications');
    dispatch(updateNotificationAction(currentUserID._id));
  };

  const handlelesspress = () => {
    navigation.navigate('Home');
  };

  const handleSelectItem1 = item => {
    setSelectedItem(item.label);
    setDropdownVisible(false);
  };

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setEndShowDatePicker] = useState(false);
  const [showDateTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setStartDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndShowDatePicker(false);
    setEndDate(currentDate);
  };

  const showEndDatepicker = () => {
    setEndShowDatePicker(true);
  };

  const onChangeDateTime = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const showtimePicker = () => {
    setShowTimePicker(true);
  };

  const [taskGroup, setTaskGroup] = useState('');
  // console.log(taskGroup,'taskgrop')

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reminder, setReminder] = useState('');
  // const [hasNotifications, setHasNotifications] = useState(false);
  const hasNotifications = useSelector(
    state => state.notifications.hasNotifications,
  );

  const userData = useSelector(state => state.user.userData);
  // console.log('user',userData)
  const [owner, setOwner] = useState({
    id: userData && userData._id,
    name: userData && userData.name,
    profilePic: userData && userData.profilePic,
  });

  const handleAddTask = () => {
    const addTaskData = async () => {
      try {
        const descriptionText = await richText.current?.getContentHtml();
        // console.log('imh', descriptionText);
        dispatch(
          addTask({
            owner,
            taskGroup,
            taskName,
            description: descriptionText,
            audioFile,
            pdfFile,
            people: selectedItems,
            startDate: startDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            
            endDate: endDate.toLocaleDateString('en-GB',{
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            reminder: endTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }),
        );

        dispatch(fetchNotifications());
        setTaskGroup('');
        setTaskName('');
        setDescription('');
        setAudioFile('');
        setPdfFile('');
        setPdfFile('');
        // setStartDate('');
        // setEndDate('');
        setSelectedItems([]);
        navigation.navigate('Calenderone');
      } catch (error) {
        console.error('Error adding task:', error.message);
      }
    };
    addTaskData();
    dispatch(fetchNotifications());
  };

  const [data, setData] = useState([]);
  // console.log('data',data)

  useEffect(() => {
    // console.log(data)
    //   const fetchTaskGroups = async () => {
    //     try {
    //       const response = await fetch(`${BASE_URL}/TGroups`);
    //       const data = await response.json();
    //       console.log("data", data)
    //       setData(data);
    //     } catch (error) {
    //       console.error('Error fetching task groups:', error.message);
    //     }
    //   };
    //   fetchTaskGroups();

    const fetchTaskGroups = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${BASE_URL}/TGroups`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        // console.log("data", data)
        setData(data);
      } catch (error) {
        console.error('Error fetching task groups:', error.message);
      }
    };

    fetchTaskGroups();
  }, []);

  const handleDataUpdate = newData => {
    setData(newData);
  };
  const {TGroupId} = route.params || {};
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [members, setMembers] = useState({});
  const [data2, setData2] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSearch = text => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      // console.log('fetch members')
      try {
        const response = await fetch(`${BASE_URL}/members/${TGroupId}`);
        const responseData = await response.json();
        const {members, deptHead, projectLead} = responseData;

        const data = {
          members: members,
          deptHead: deptHead,
          projectLead: projectLead,
        };

        setMembers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (TGroupId) {
      fetchMembers();
    }
  }, [TGroupId]);

  const allData = [
    ...(members && members.deptHead ? members.deptHead : []),
    ...(members && members.projectLead ? members.projectLead : []),
    ...(members && members.members ? members.members : []),
  ];

  const filteredData = allData.filter(
    item =>
      item &&
      typeof item.name === 'string' &&
      item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const [selectedItems, setSelectedItems] = useState([]);
  // console.log(selectedItem,'item')

  const handleSelectItem = (item, index) => {
    const isSelected = selectedItems.includes(item);

    if (!isSelected) {
      setSelectedItems([...selectedItems, item]);
    } else {
      const updatedItems = selectedItems.filter(
        selectedItem => selectedItem !== item,
      );
      setSelectedItems(updatedItems);
    }
  };

  const saveSelectedItems = () => {
    setModalVisible(false);
  };

  const dirs = RNFetchBlob.fs.dirs;

  const formatTime = secs => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const MicroPhone = () => <FontAwesomeIcon icon={faMicrophone} size={20} />;

  const onDelete = index => {
    const newAudioList = [...audioList];
    newAudioList.splice(index, 1);
    setAudioList(newAudioList);
  };

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const [audioFile, setAudioFile] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('0.00');
  const [duration, setDuration] = useState('0.00');
  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Failed to request permission:', err);
      return false;
    }
  };

  const startRecording = async () => {
    try {
      const hasPermissions = await requestPermissions();
      if (!hasPermissions) {
        console.log('Permission not granted for recording audio');
        return;
      }

      setRecording(true);
      const uniqueFileName = `audio_${Date.now()}.mp3`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${uniqueFileName}`;
      const result = await audioRecorderPlayer.startRecorder(filePath);
      // const main = await audioRecorderPlayer.startRecorder(filePath);
      console.log('Recording started, file saved at:', result);
      setAudioFile(result);
      console.log('audio', result);
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordTime(
          audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        );
        setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
        return;
      });
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    const result = await audioRecorderPlayer.stopRecorder();
    setRecording(false);
    audioRecorderPlayer.removeRecordBackListener();
    setAudioFile(result);

    const formData = new FormData();
    formData.append('voice', {
      uri: 'file://' + result,
      name: `audio_${Date.now()}.mp3`,
      type: 'audio/mpeg',
    });

    try {
      const response = await fetch(BASE_URL + '/upload-voice', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = await response.json();
      console.log('checking audio', responseData.result);
      setAudioFile(responseData.result);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const openImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      convertBase64(image);
    });
  };
  const convertBase64 = async image => {
    try {
      const filePath = image.path;
      const base64String = await RNFS.readFile(filePath, 'base64');
      const base64URI = `data:${image.mime};base64,${base64String}`;
      richText.current?.insertImage(base64URI);
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  };

  const renderPdfInsertionButton = () => (
    <TouchableOpacity onPress={selectPDF}>
      <FontAwesomeIcon icon={faFilePdf} size={20} color="#000" />
    </TouchableOpacity>
  );

  const [pdfFile, setPdfFile] = useState(null);

  const selectPDF = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      const res = results[0];
      setPdfFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled PDF selection');
      } else {
        console.error('Failed to pick PDF:', err);
      }
    }
  };
  

  return (
    <ScrollView style={{maxHeight: 700}}>
      <View style={styles.AddTask}>
        <View style={styles.task}>
          <TouchableOpacity onPress={handlelesspress}>
            <View>
              <FontAwesomeIcon icon={faArrowLeft} size={35} color={'#14447B'} />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>Add Task</Text>
          </View>

          {/* <TouchableOpacity onPress={handleBellPress}>
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
          </TouchableOpacity> */}
        </View>

        <View style={styles.container}>
          <View>
            <SelectList
              setSelected={val => setSelected(val)}
              fontFamily="lato"
              data={data}
              search={false}
              boxStyles={{
                borderRadius: 10,
                borderColor: '#fffaf0',
                height: 60,
                backgroundColor: 'white',
                color: 'black',
                // elevation: 5,
              }}
              dropdownStyles={{backgroundColor: 'white'}}
              defaultOption={selected}
              placeholder="Task Group"
              value={taskGroup}
              onChangeText={setTaskGroup}
            />
          </View>

          <View style={styles.ph}>
            <Text style={styles.h}>Task Name</Text>
            <TextInput
              placeholder="Enter Task Name"
              placeholderTextColor={'#A9A9A9'}
              style={{color: 'black'}}
              value={taskName}
              onChangeText={setTaskName}
            />
          </View>

          {/* <View style={styles.ph}>
            <Text style={styles.h}>Description</Text>
            <TextInput
              placeholder="Enter Description"
              placeholderTextColor={'#A9A9A9'}
              style={{color: 'black'}}
              value={description}
              onChangeText={setDescription}
            />
          </View> */}

          <View style={styles.ph}>
            <RichEditor
              ref={richText}
              placeholder="Enter Description..."
              placeholderColor={'#abaaa9'}
              // onChangeText={setDescription}
              onChange={descriptionText => {
                // console.log('descriptionText:', descriptionText);
                setDescription(descriptionText);
              }}
            />
            {audioFile && (
              <View style={{marginVertical: 10}}>
                <View
                  style={{
                    width: 100,
                    height: 50,
                    borderRadius: 20,
                    backgroundColor: '#14447B',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                    onPress={stopRecording}>
                    <FontAwesomeIcon icon={faSquare} size={20} color="white" />
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      {recordTime}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View
              style={{
                // backgroundColor: '#14447B',
                padding: 10,
                marginBottom: 5,
              }}>
              <Text style={{color: 'black'}}>
                {pdfFile && pdfFile.name ? `Selected PDF: ${pdfFile.name}` : ''}
              </Text>
            </View>

            {/* {Array.isArray(audioFile) &&
              audioFile.map((audio, index) => (
                <View key={index}>
                  <Text style={{color: 'black'}}>Audio Clip {index + 1}</Text>
                  <AudioClip
                    key={index}
                    audio={audio}
                    index={index}
                    onStartPlay={onStartPlay}
                    onDelete={onDelete}
                  />
                </View>
              ))} */}

            <RichToolbar
              style={styles.stickyRow}
              getEditor={() => richText.current}
              iconTint={'#000'}
              selectedIconTint={'#2095F2'}
              disabledIconTint={'#8b8b8b'}
              actions={[
                actions.insertImage,
                actions.insertLink,
                'recordAudio',
                'insertPdf',
                actions.setBold,
                actions.setItalic,
                actions.insertOrderedList,
                actions.insertBulletsList,
                // actions.insertVideo,
                actions.setUnderline,
                actions.undo,
                actions.redo,
                // actions.setStrikethrough,
                'changeBgColor',
              ]}
              iconMap={{
                recordAudio: () => <MicroPhone />,
                // changeBgColor: () => <Circle />,
                // pickVideo: () => <VideoPick />,
                insertPdf: renderPdfInsertionButton,
              }}
              // onPressAddImage={handleImageUpload}
              onPressAddImage={() => {
                openImage();
              }}
              recordAudio={startRecording}
              // changeBgColor={handleChangeBgColor}
              // pickVideo={handleVideoUpload}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.addpeople} onPress={toggleModal}>
              <FontAwesomeIcon icon={faUser} size={30} color="#0A91d0" />
              <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
                {selectedItems.length > 0 ? (
                  selectedItems.length <= 2 ? (
                    <Text>
                      Selected:{' '}
                      {selectedItems.map(item => item.name).join(', ')}
                    </Text>
                  ) : (
                    <Text style={{color: 'black'}}>
                      Selected:
                      {selectedItems.slice(0, 1).map((item, index) => (
                        <Text key={index}>
                          {index > 0 && ', '}
                          {item.name}
                        </Text>
                      ))}
                      {selectedItems.length > 1 && <Text> and others</Text>}
                    </Text>
                  )
                ) : (
                  'Add Members'
                )}
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={toggleModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search People"
                    placeholderTextColor="#A9A9A9"
                    value={searchText}
                    onChangeText={handleSearch}
                  />
                  <ScrollView>
                    {filteredData.map((item, index) => (
                      <TouchableOpacity
                        key={item._id || index}
                        style={[
                          styles.dropdownItem,
                          selectedItems.includes(item) && styles.selectedItem,
                        ]}
                        onPress={() => handleSelectItem(item, index)}>
                        <View style={{flexDirection: 'row'}}>
                          <FontAwesomeIcon
                            icon={faUser}
                            size={20}
                            color="#0A91d0"
                            style={{marginRight: 10}}
                          />
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 16,
                              fontWeight: '600',
                            }}>
                            {item.name}
                          </Text>
                          {/* <Text>{item.id}</Text> */}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={saveSelectedItems}
                    style={styles.closeButton}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 7,
                  justifyContent: 'space-around',
                }}>
                <View style={styles.startdate}>
                  <View>
                    <TouchableOpacity onPress={showDatepicker}>
                      <FontAwesomeIcon
                        icon={faCalendar}
                        size={30}
                        color="#0A91d0"
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{marginBottom: 5, color: 'black'}}>
                      Start Date
                    </Text>
                    {showDatePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={startDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                    <Text style={{color: 'black', fontWeight: '500'}}>
                      {startDate &&
                        startDate.toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                    </Text>
                  </View>
                </View>

                <View style={styles.startdate}>
                  <View>
                    <TouchableOpacity onPress={showEndDatepicker}>
                      <FontAwesomeIcon
                        icon={faCalendar}
                        size={30}
                        color="#0A91d0"
                      />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text style={{marginBottom: 5, color: 'black'}}>
                      End Date
                    </Text>
                    {showEndDatePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeEnd}
                      />
                    )}
                    <Text style={{color: 'black', fontWeight: '500'}}>
                      {endDate &&
                        endDate.toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.Reminder}>
                <View>
                  <TouchableOpacity onPress={showtimePicker}>
                    <FontAwesomeIcon icon={faClock} size={30} color="#EA791D" />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{color: 'black'}}>Reminder</Text>
                  {showDateTimePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date()}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDateTime}
                    />
                  )}
                  <Text style={{color: 'black', fontWeight: '500'}}>
                    {endTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 50}}>
            {/* {added } */}
            <TouchableOpacity style={styles.AddProject} onPress={handleAddTask}>
              <Toast />
              <Text style={styles.add}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  AddTask: {
    marginTop: 10,
    justifyContent: 'center',
  },
  task: {
    flexDirection: 'row',
    gap: 110,
    marginTop: 10,
    left: 20,
    // justifyContent: 'space-around',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },

  container: {
    // marginTop: 20,
    justifyContent: 'space-arounds',
    marginHorizontal: 20,
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
  ph: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addpeople: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 200,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 70,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  datePicker: {
    width: 200,
    marginTop: 10,
  },
  AddProject: {
    marginTop: 15,
    backgroundColor: '#EA791D',
    height: 50,
    borderRadius: 10,
  },
  add: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'bold',
    padding: 12,
  },

  startdate: {
    backgroundColor: 'white',
    marginTop: 15,
    flexDirection: 'row',
    gap: 10,
    width: '50%',
    height: 70,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems:'center'
  },
  Reminder: {
    backgroundColor: 'white',
    marginTop: 15,
    flexDirection: 'row',
    gap: 10,
    height: 70,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems:'center'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#EA791D',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    color: 'black',
  },
  addPeopleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  addpeople: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: 70,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    height: '50%',
    justifyContent: 'space-around',
  },
});

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
  faCalendar,
  faClock,
  faPause,
  faPlay,
  faArrowLeft,
  faSeedling,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Linking,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';
import HTML from 'react-native-render-html';
import Sound from 'react-native-sound';
import {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasks, updateTaskStatus} from '../Redux/Action/TaskAction';
import {fetchCompletedTasksCount as fetchCount} from '../Redux/Action/TaskAction';
import {useNavigation} from '@react-navigation/native';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import io from 'socket.io-client';
import {BASE_URL} from '../Config';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const ProjectsView = ({route}) => {
  const data = ({
    taskId,
    taskName,
    description,
    people,
    startDate,
    endDate,
    reminder,
    audioFile,
    pdfFile,
  } = route.params);
  // console.log('id',data)

  const {width: screenWidth} = Dimensions.get('window');
  const [buttonPressed, setButtonPressed] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:5000');
  const userData = useSelector(state => state.user.userData);
  const [modalVisible, setModalVisible] = useState(false);
  const [proofText, setProofText] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [remarkText, setRemarkText] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [remark, setRemark] = useState({text: remarkText, date: deadlineDate});
  const [pow, setpow] = useState ({text: proofText, file: proofFile});
  


  const tagsStyles = {
    img: {
      maxWidth: 200,
      height: 200,
      marginVertical: 10,
    },
    b: {
      color: 'black',
      fontSize: 15,
      marginTop: 10,
    },
    i: {
      color: 'black',
      fontSize: 15,
      marginTop: 10,
    },
    a: {
      color: 'blue',
      fontSize: 15,
      textDecorationLine: 'underline',
    },
    ul: {
      color: 'black',
      fontSize: 15,
    },
    ol: {
      color: 'black',
      fontSize: 15,
    },
    video: {
      maxWidth: 100,
      height: 100,
      marginTop: 10,
    },
    p: {
      color: 'black',
      fontSize:15
    },
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [isRecord, setisRecord] = useState(false);

  useEffect(() => {
    if (data && data.audioFile) {
      const audioPath = data.audioFile;
      // console.log('path',audioPath)
      const audio = new Sound(audioPath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.error('Failed to load sound:', error);
          return;
        }
        setSound(audio);
      });
      return () => {
        if (audio) {
          audio.release();
        }
      };
    }
  }, [data]);

  const playSound = async () => {
    if (isPlaying) {
      if (sound) {
        sound.pause();
        setIsPlaying(false);
      }
    } else {
      if (data.audioFile) {
        try {
          const audioPath = data.audioFile;
          // console.log('path11',audioPath)
          const newSound = new Sound(audioPath, '', error => {
            if (error) {
              console.error('Error loading soun:', error);
              return;
            }
            newSound.play(success => {
              if (success) {
                setIsPlaying(false);
              }
            });
          });
          setSound(newSound);
          setIsPlaying(true);
        } catch (error) {
          console.error('Error creating Sound object:', error);
        }
      }
    }
  };

  const handleUpdateStatus = () => {
    if (!data) {
      alert('Task not selected!');
      return;
    }
    if (!selectedStatus) {
      alert('Status not selected!');
      return;
    }

    const TaskId = data.taskId;
    dispatch(updateTaskStatus(TaskId, selectedStatus));
    fetchCount();
    navigation.navigate('Calenderone');
  };

  const fetchCompletedTasksCount = () => {
    // console.log('Fetching completed tasks count');
  };

  const handleStatusButtonPress = status => {
    setSelectedStatus(status);
    setButtonPressed(true);
    if (status === 'Completed' || status === 'Cancelled') {
      setModalVisible(true);
    }
  };

  const GotoBack = () => {
    navigation.navigate('Calenderone');
  };

  // const handleSendMessage = () => {
  //   if (inputText.trim()) {
  //     const newMessage = {
  //       id: Date.now().toString(),
  //       text: inputText,
  //       sender: 'me',
  //     };

  //     socket.emit('message', newMessage);
  //     setMessages(prevMessages => [...prevMessages, newMessage]);
  //     setInputText('');
  //   }
  // };

  // useEffect(() => {
  //   socket.on('message', newMessage => {
  //     setMessages(prevMessages => [...prevMessages, newMessage]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const [message, setMessage] = useState('');
  const handleSubmitComment = async () => {
    try {
      const response = await fetch(`${BASE_URL}/Comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
          sender: userData.name,
          taskId: data.taskId,
        }),
      });

      if (response.ok) {
        console.log('Message posted successfully');
        setMessage('');
        fetchMessages();
      } else {
        console.error('Failed to post message');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [taskId]);

  const [comments, setComments] = useState([]);
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/comments/${taskId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const openPdf = () => {
    const {pdfFile} = data;
    if (pdfFile) {
      const fileUri =
        Platform.OS === 'android'
          ? `http://3.85.170.118:5000/${pdfFile}`
          : pdfFile;
      Linking.openURL(fileUri)
        .then(() => console.log('PDF opened successfully'))
        .catch(error => console.error('Error opening PDF:', error));
    } else {
      console.error('PDF file not found');
    }
  };

  const selectPDF = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
  
      const formData = new FormData();
      formData.append('pdf', {
        uri: results[0].uri,
        type: 'application/pdf',
        name: results[0].name,
      });
  
      const response = await fetch(BASE_URL + '/upload-pdf', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('PDF upload result:', responseData.result);
      setProofFile(responseData.result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled PDF selection');
      } else {
        console.error('Failed to pick PDF:', err);
      }
    }
  };
  
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadlineDate;
    setShowDatePicker(false);
    setDeadlineDate(currentDate);
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleModalSubmit = async () => {
    try {
      // Prepare data to be sent
      const updatedData = {
        remark: {
          text: remarkText,
          date: deadlineDate.toLocaleDateString('en-GB',{
            day: '2-digit',
            month:'2-digit',
            year:'numeric',
          })},
        pow: {
          text: proofText,
          file: proofFile,
        }
      };
  
      const response = await axios.patch(`${BASE_URL}/resons/${taskId}`, updatedData);
  
      if (response.status === 200) {
        console.log('Task updated successfully');
      } else {
        console.error('Failed to update task');
      }
  
      // Close modal
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating task:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <ScrollView
      style={{maxHeight: 760}}
      contentContainerStyle={styles.scrollViewContentContainer}>
      <View style={styles.main}>
        <View style={styles.title}>
          <TouchableOpacity onPress={GotoBack}>
            <FontAwesomeIcon icon={faArrowLeft} size={30} color="#14447B" />
          </TouchableOpacity>

          {/* <Text style={styles.p}>TaskGroup: {data.taskGroup?.groupName}</Text> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginBottom: 8,
            }}>
            <Text style={styles.h}>TaskName :</Text>
            <Text style={{color: 'black', fontSize: 18, }}>{data.taskName}</Text>
          </View>

          {data.description && (
            <View style={{ padding: 10, borderRadius: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Description :
              </Text>
              <HTML
                source={{html: data.description}}
                contentWidth={screenWidth}
                tagsStyles={tagsStyles}
              />
            </View>
          )}

        { (data.audioFile || data.pdfFile) && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
              // borderWidth: 0.5,
              borderRadius: 10,
              paddingVertical: 10,
              backgroundColor: '#FAF9F6',
            }}>
            {data.audioFile && (
              <View>
                <Text
                  style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                  Audio
                </Text>
                <TouchableOpacity
                  onPress={playSound}
                  style={{
                    marginVertical: 5,
                    borderWidth: 1,
                    width: 40,
                    height: 40,
                    backgroundColor: '#EA791D',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                  }}>
                  {isPlaying ? (
                    <FontAwesomeIcon
                      icon={faPause}
                      size={25}
                      color="#14447B"
                      style={{}}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlay}
                      size={25}
                      color="#14447B"
                      style={{}}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}

            {data.pdfFile && (
              <TouchableOpacity onPress={openPdf} style={{width: 150}}>
                <Text
                  style={{color: 'black', fontSize: 15, fontWeight: 'bold', textAlign:'center'}}>
                  PDF File
                </Text>
                <Text style={{color: 'black'}}>{data.pdfFile}</Text>
              </TouchableOpacity>
            )}
          </View>
          )}
          <View style={{flexDirection:'row', justifyContent: 'space-around', alignItems:'center', backgroundColor: '#FAF9F6', borderRadius:10}}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <FontAwesomeIcon icon={faUser} size={30} color="#14447B" />
            {data.people && data.people.length > 0 && (
              <Text style={{color: 'black', marginTop:5}}>
                {data.people[0].role || data.people[0].name}
                {data.people.length > 1 &&
                  ` and ${data.people.length - 1} others`}
              </Text>
            )}
          </View>

          <View style={{ gap: 8, marginTop: 10, padding:10}}>
            <View style={{flexDirection:'row', gap:5, justifyContent:'center'}}>
            <FontAwesomeIcon icon={faCalendar} color="#14447B" size={20} />
            <View>
            <Text style={{color: 'black'}}>
              {data.startDate}  
            </Text>
            <Text style={{color: 'black', textAlign:'center'}}>TO</Text>
            <Text style={{color: 'black'}}>{data.endDate}</Text>
            </View>
            </View>
            <View style={{flexDirection:'row', gap: 5}}>
            <FontAwesomeIcon
              icon={faClock}
              size={20}
              style={{color: '#EA791D'}}
            />
            <Text style={{...styles.faclock, color: '#EA791D'}}>
              {data.reminder}
            </Text>
            </View>
          </View>
          </View>
         

            <View style={{backgroundColor: '#FAF9F6', marginTop:10, padding:10, borderRadius:10}}>
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
                padding: 5,
                backgroundColor: '#FFBF00',
                borderColor:
                  buttonPressed && selectedStatus === 'In Progress'
                    ? '#FFBF00'
                    : '#ffffe0',
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'white',
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
                padding: 5,
                backgroundColor: '#009E60',
                borderColor:
                  buttonPressed && selectedStatus === 'Completed'
                    ? 'green'
                    : '#009E60',
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'white',
                  ...(selectedStatus === 'Completed'
                    ? {fontWeight: 'normal', color: 'blue'}
                    : {}),
                }}>
                Completed
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleStatusButtonPress('Cancelled')}
              style={{
                padding: 5,
                backgroundColor: '#ff6347',
                borderColor:
                  buttonPressed && selectedStatus === 'Cancelled'
                    ? 'red'
                    : '#ff6347',
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'white',
                  ...(selectedStatus === 'Cancelled'
                    ? {fontWeight: 'bold', color: 'blue'}
                    : {}),
                }}>
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.comment}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              comments
            </Text>
            <View
              style={{
                height: 250,
                // borderWidth: 1,
                marginVertical: 10,
                borderRadius: 10,
                padding: 10,
                backgroundColor: '#B2BEB5',
              }}>
              <ScrollView>
                <View style={styles.container}>
                  {comments.map(message => (
                    <View key={message._id} style={styles.messageText}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        {message.sender}
                      </Text>
                      <Text
                        style={{color: 'black', marginLeft: 5, fontSize: 15}}>
                        {message.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.msgBody}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a Comments...."
                placeholderTextColor={'black'}
              />
              <TouchableOpacity onPress={handleSubmitComment}>
                <FontAwesomeIcon icon={faShare} size={30} color="#14447B" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'left'}}>
            <TouchableOpacity
              onPress={handleUpdateStatus}
              style={styles.savebtn}>
              <Text
                style={{
                  fontSize:15,
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
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {selectedStatus === 'Completed'
                    ? 'Completed Task'
                    : 'Reason to Cancelled'}
                </Text>
                {selectedStatus === 'Completed' ? (
                  <>
                    <Text style={styles.modalSubTitle}>
                      Proof of Work (text)
                    </Text>
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Enter proof of work"
                      placeholderTextColor={'black'}
                      value={proofText}
                      onChangeText={setProofText}
                    />
                    <Text style={styles.modalSubTitle}>
                      Proof of Work (File)
                    </Text>
                    <TouchableOpacity
                      onPress={selectPDF}
                      style={{
                        backgroundColor: '#EA791D',
                        alignItems: 'center',
                        width: '50%',
                        justifyContent: 'center',
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 14}}>
                        Upload File
                      </Text>
                    </TouchableOpacity>
                    <View
              style={{
                // backgroundColor: '#14447B',
                padding: 10,
                marginBottom: 5,
              }}>
              <Text style={{color: 'black', fontWeight:'bold'}}>
                {proofFile && proofFile ? `Selected PDF: ${proofFile}` : ''}
              </Text>
            </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.modalSubTitle}>Remark</Text>
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Enter remark"
                      placeholderTextColor={'black'}
                      value={remarkText}
                      onChangeText={setRemarkText}
                    />

                    <Text style={styles.modalSubTitle}>
                      Select New Deadline Date
                    </Text>
                    <View style={{borderWidth:0.7, padding:10, borderRadius: 5}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}
                      onPress={showDatepicker}>
                      <FontAwesomeIcon
                        icon={faCalendar}
                        size={20}
                        color="#14447B"
                      />
                       <Text style={{color: 'black', fontWeight: '500'}}>
                      {deadlineDate && deadlineDate.toLocaleDateString('en-GB',{
                        day: '2-digit',
                        month:'2-digit',
                        year:'numeric',
                      })}
                    </Text>
                    </TouchableOpacity>
                    </View>
                    {showDatePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        date={deadlineDate}
                        value={new Date()}
                        mode="date"
                        format="DD-MM-YYYY"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </>
                )}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleModalSubmit}
                  >
                    <Text style={styles.modalButtonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  main: {
    backgroundColor: 'white',
    justifyContent: 'center',
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 20,
    // height: 700,
  },
  title: {
    padding: 30,
  },
  p: {
    fontSize: 15,
    color: '#a9a9a9',
  },
  h: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    color: 'black',
  },
  savebtn: {
    padding: 10,
    backgroundColor: '#EA791D',
    width: 70,
    borderRadius: 10,
    marginTop: 15,
  },
  comment: {
    marginVertical: 10,
  },
  msgBody: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    color: 'black',
  },
  messageText: {
    fontSize: 13,
    color: 'black',
    backgroundColor: 'white',
    padding: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 7,
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
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    // marginTop: 0,
    color: 'black',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#14447B',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: 'black',
  },
};
export default ProjectsView;

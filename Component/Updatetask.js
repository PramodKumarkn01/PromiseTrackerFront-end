import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar, faClock} from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {updateTask} from '../Redux/Action/TaskAction';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {replyNotification} from '../Redux/Action/NotificationAction';
import { useNavigation } from '@react-navigation/native';

const Updatetask = () => {
  const route = useRoute();
  const {taskId, status} = route.params;
  // console.log('id1',taskId)
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setStartDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDatePicker, setEndShowDatePicker] = useState(false);
  const [showDateTimePicker, setShowTimePicker] = useState(false);

  const onChangeDateTime = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const showtimePicker = () => {
    setShowTimePicker(true);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndShowDatePicker(false);
    setEndDate(currentDate);
  };

  const showEndDatepicker = () => {
    setEndShowDatePicker(true);
  };
  const [endTime, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  const navigation = useNavigation()

  const handleSubmit = () => {
    const taskDetails = {
      startDate,
      endDate,
      endTime,
      comment: userComment, 
      status: 'Cancelled',
    };
    // dispatch(modifyTaskStatus(taskId, 'Cancelled'))
    dispatch(updateTask(taskId, taskDetails));
    dispatch(
      replyNotification(user._id, taskId, 'Accepted & Modified', userComment, startDate, endDate),
    );
    navigation.navigate('Notification')
  };
  const [userComment, setUserComment] = useState('');

  return (
    <>
    <ScrollView style={{height:'100%'}}>
      {/* <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}> */}
      <Text
        style={{
          textAlign: 'center',
          marginTop: 60,
          fontSize: 32,
          color: '#14447B',
        }}>
        Accept & Modifed
      </Text>
      <View style={styles.mainContainer}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={styles.startdate}>
          <View>
            <TouchableOpacity onPress={showDatepicker}>
              <FontAwesomeIcon icon={faCalendar} size={30} color="#14447B" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{marginBottom: 5, color: 'black'}}>Start Date</Text>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Text style={{color: 'black', fontWeight: '500'}}>
              {startDate && startDate.toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.startdate}>
          <View>
            <TouchableOpacity onPress={showEndDatepicker}>
              <FontAwesomeIcon icon={faCalendar} size={30} color="#14447B"/>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{marginBottom: 5, color: 'black'}}>End Date</Text>
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
              {endDate && endDate.toLocaleDateString()}
            </Text>
          </View>
        </View>
        </View>

        <View style={styles.Reminder}>
          <View>
            <TouchableOpacity onPress={showtimePicker}>
              <FontAwesomeIcon icon={faClock} size={30} color="#14447B" />
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
        <View>
          <Text style={{color: 'black', fontSize: 18}}>Remark</Text>
          <TextInput
            style={styles.popupInput}
            placeholder="Enter your remark ..."
            placeholderTextColor="#A9A9A9"
            value={userComment}
            onChangeText={setUserComment}
          />
        </View>
        <View style={{marginBottom: 50}}>
          {/* {added } */}
          <TouchableOpacity style={styles.AddProject} onPress={handleSubmit}>
            {/* <Toast /> */}
            <Text style={styles.add}>Modifed</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
      </ScrollView>
    </>
  );
};

export default Updatetask;
const styles = StyleSheet.create({
  AddProject: {
    marginTop: 15,
    backgroundColor: '#EA791D',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 20,
  },
  add: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    // padding: 12,
  },
  datePicker: {
    width: 200,
    marginTop: 10,
  },

  startdate: {
    // backgroundColor: 'white',
    marginTop: 15,
    flexDirection: 'row',
    gap: 15,
    // width: '50%',
    // height: 70,
    // padding: 20,
    // borderRadius: 10,
  },
  Reminder: {
    // backgroundColor: 'white',
    marginTop: 15,
    flexDirection: 'row',
    gap: 10,
    // height: 70,
    // padding: 20,
    borderRadius: 10,
  },

  mainContainer: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: '10%',
    marginBottom: '50%',
    marginTop: '10%',
    padding:25,
    gap:20
  },
  popupInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    color:'black'
  },
});

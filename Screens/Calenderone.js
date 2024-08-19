import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faBell, faClose} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Projects from '../Component/Projects';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useSelector} from 'react-redux';
import {updateNotificationAction} from '../Redux/Action/NotificationAction';
import {useDispatch} from 'react-redux';

const Calenderone = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const { taskGroup } = route.params;
  // console.log('Received taskGroup:', taskGroup);

  // const hasNotifications = route.params;


  const {taskGroup, taskGroupId} = route.params || {};
  // console.log('cal',taskGroup, taskGroupId)

  const Notification = () => {
    navigation.navigate('Notifications');
  };
  const backHome = () => {
    navigation.navigate('Home');
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const hasNotifications = useSelector(
    state => state.notifications.hasNotifications,
  );
  const notifications = useSelector(state => state.notifications.notifications);
  const currentUserID = useSelector(state => state.user.userData);
  // console.log('cal',notifications);

  // console.log('all notification',notifications)

  // useEffect(() => {
  //   const currentDate = moment();
  //   const calendarData = [];
  //   for (let i = -2; i < 30; i++) {
  //     const date = currentDate.clone().add(i, 'days');
  //     calendarData.push({
  //       id: date.format('YYYY-MM-DD'),
  //       month: date.format('MMMM'),
  //       day: date.format('ddd'),
  //       date: date.format('D'),
  //     });
  //   }

  //   setData(calendarData);
  //   const initialSelectedDate = currentDate.format('YYYY-MM-DD');
  //   setSelectedItem(initialSelectedDate);
  //   handleCalendarPress(initialSelectedDate);
  // }, []);

  const handleCalendarPress = itemId => {
    setSelectedItem(itemId);
  };

  // const renderItem = ({item}) => (
  //   <TouchableOpacity
  //     style={[
  //       styles.calendarItem,
  //       {
  //         backgroundColor:
  //           selectedItem === item.id
  //             ? '#0A91D0'
  //             : moment().isSame(item.id, 'day')
  //             ? '#add8e6'
  //             : 'white',
  //       },
  //     ]}
  //     onPress={() => handleCalendarPress(item.id)}>
  //     <Text
  //       style={[
  //         styles.monthText,
  //         {color: selectedItem === item.id ? 'white' : 'black'},
  //       ]}>
  //       {item.month}
  //     </Text>
  //     <Text
  //       style={[
  //         styles.dateText,
  //         {color: selectedItem === item.id ? 'white' : 'black'},
  //       ]}>
  //       {item.date}
  //     </Text>
  //     <Text
  //       style={[
  //         styles.dayText,
  //         {color: selectedItem === item.id ? 'white' : 'black'},
  //       ]}>
  //       {item.day}
  //     </Text>
  //   </TouchableOpacity>
  // );

  const [notificationToolTipVisible, setNotificationToolTipVisible] =
    useState(false);
  const handleLongPressNotification = () => {
    setNotificationToolTipVisible(true);
  };

  const onPressOut = () => {
    setNotificationToolTipVisible(false);
    dispatch(updateNotificationAction(currentUserID._id));
  };

  useEffect(() => {
    if (!notifications) {
    }
  }, [dispatch, notifications]);

  const [displayedMonth, setDisplayedMonth] = useState(moment());
  useEffect(() => {
    generateCalendarData(displayedMonth);
  }, [displayedMonth]);

  const generateCalendarData = month => {
    const currentDate = moment();
    const calendarData = [];
    const startDate = moment(month).startOf('days').startOf('days');
    const endDate = moment(month).endOf('month').endOf('week');
    // const days = endDate.diff(startDate, 'days')+2;

    for (let i = 0; i < 30; i++) {
      const date = startDate.clone().add(i, 'days');
      calendarData.push({
        id: date.format('YYYY-MM-DD'),
        month: date.format('MMMM'),
        day: date.format('ddd'),
        date: date.format('D'),
      });
    }

    setData(calendarData);
    const initialSelectedDate = currentDate.format('YYYY-MM-DD');
    setSelectedItem(initialSelectedDate);
    handleCalendarPress(initialSelectedDate);
  };

  const handleReadMore = () => {
    setDisplayedMonth(moment(displayedMonth).add(30, 'days'));
  };

  const handleReadLess = () => {
    setDisplayedMonth(moment(displayedMonth).subtract(30, 'days'));
  };

  // const filteredNotifications =
  //   notifications !== undefined
  //     ? notifications.filter(
  //         notification =>
  //           (notification.action === true || notification.action === 'true') &&
  //           notification.userid === currentUserID._id,
  //       )
  //     : [];
  // const notificationCount = filteredNotifications.length;

  return (
    <View>
      <View style={styles.task}>
        <TouchableOpacity onPress={backHome}>
          <View>
            <FontAwesomeIcon icon={faArrowLeft} size={35} color="#14447B" />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.today}>Today's Task</Text>
        </View>

        {/* <Tooltip
          isVisible={notificationToolTipVisible}
          content={<Text style={{color: 'black'}}>Notification</Text>}
          placement="bottom">
          <TouchableOpacity
            onPress={Notification}
            onLongPress={handleLongPressNotification}
            onPressOut={onPressOut}>
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

      <View style={styles.date}>
        <FlatList
          horizontal
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.calendarItem,
                {
                  backgroundColor:
                    selectedItem === item.id
                      ? '#0A91d0'
                      : moment().isSame(item.id, 'day')
                      ? '#add8e6'
                      : 'white',
                },
              ]}
              onPress={() => handleCalendarPress(item.id)}>
              <Text
                style={[
                  styles.monthText,
                  {color: selectedItem === item.id ? 'white' : 'black', fontWeight:'bold'},
                ]}>
                {item.month}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  {color: selectedItem === item.id ? 'white' : 'black', fontWeight:'bold'},
                ]}>
                {item.date}
              </Text>
              <Text
                style={[
                  styles.dayText,
                  {color: selectedItem === item.id ? 'white' : 'black', fontWeight:'bold'},
                ]}>
                {item.day}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleReadLess}>
          <Text style={{color: 'black', fontSize: 17, fontWeight:'bold'}}>&lt; Read Less </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReadMore}>
          <Text style={{color: 'black', fontSize: 17, fontWeight:'bold'}}>Read More &gt;</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Projects selectedDate={selectedItem} taskGroup={taskGroup} taskGroupId={taskGroupId} />
      </View>
    </View>
  );
};

export default Calenderone;
const styles = StyleSheet.create({
  Calender: {
    marginTop: 10,
  },
  task: {
    flexDirection: 'row',
    gap: 100,
    marginTop: 10,
    left:20
    // justifyContent: 'space-around',
  },
  today: {
    fontSize: 22,
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
  status: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  calendarItem: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 25,
    margin: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

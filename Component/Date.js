import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';

const CalendarComponent = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const currentDate = moment();
    const calendarData = [];


    
    for (let i = 0; i < 30; i++) {
      const date = currentDate.clone().add(i, 'days');
      calendarData.push({
        id: date.format('YYYY-MM-DD'),
        month: date.format('MMMM'),
        day: date.format('ddd'),
        date: date.format('D'),
      });
    }

//     for (let i = 30; i > 0; i--) {
//       const date = currentDate.clone().subtract(i, 'days');
//       calendarData.push({
//         id: i.toString(),
//         month: date.format('MMMM'),
//         day: date.format('ddd'),
//         date: date.format('D'),
//       });
//     }

//     for (let i = 0; i < 30; i++) {
//       const date = currentDate.clone().add(i, 'days');
//       calendarData.push({
//         id: date.format('YYYY-MM-DD'),
//         month: date.format('MMMM'),
//         day: date.format('ddd'),
//         date: date.format('D'),
//       });
//     }

    setSelectedItem(currentDate.format('YYYY-MM-DD'));

    setData(calendarData);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.calendarItem,
        { backgroundColor: selectedItem === item.id ? '#0A91D0' : moment().isSame(item.id,'day') ? '#add8e6' : 'white',
       },
      ]}
      onPress={() => handleCalendarPress(item.id)}
    >
      <Text style={[styles.monthText, { color: selectedItem === item.id ? 'white' : 'black' }]}>
        {item.month}
      </Text>
      <Text style={[styles.dateText, { color: selectedItem === item.id ? 'white' : 'black' }]}>
        {item.date}
      </Text>
      <Text style={[styles.dayText, { color: selectedItem === item.id ? 'white' : 'black' }]}>
        {item.day}
      </Text>
    </TouchableOpacity>
  );

  const handleCalendarPress = (itemId) => {
    setSelectedItem(itemId);
  };

  return (
    <View>
        <TouchableOpacity>
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color:'black',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'black',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'black',
  },
});

export default CalendarComponent;

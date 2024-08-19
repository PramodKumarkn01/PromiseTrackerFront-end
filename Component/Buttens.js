import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Buttens = ({ onStatusChange }) => {
  const [status, setStatus] = useState('To do');

  const handleButton = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonscrol}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: status === 'To do' ? '#0A91d0' : '#add8e6' }]}
            onPress={() => handleButton('To do')}>
            <Text style={[styles.text, { color: status === 'To do' ? 'white' : '#0A91d0' }]}>
              To do
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.button, { backgroundColor: status === 'To do' ? '#0A91D0' : '#ABD1E3' }]}
            onPress={() => handleButton('To do')}>
            <Text style={[styles.text, { color: status === 'To do' ? 'white' : '#0A91D0' }]}>
              To do
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: status === 'In Progress' ? '#0A91d0' : '#add8e6' }]}
            onPress={() => handleButton('In Progress')}>
            <Text style={[styles.text, { color: status === 'In Progress' ? 'white' : '#0A91d0' }]}>
              In progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: status === 'Completed' ? '#0A91d0' : '#add8e6' }]}
            onPress={() => handleButton('Completed')}>
            <Text style={[styles.text, { color: status === 'Completed' ? 'white' : '#0A91d0' }]}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: status === 'Cancelled' ? '#0A91d0' : '#add8e6' }]}
            onPress={() => handleButton('Cancelled')}>
            <Text style={[styles.text, { color: status === 'Cancelled' ? 'white' : '#0A91d0' }]}>
             Cancelled
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonscrol: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
    marginHorizontal: 4,
  },
});

export default Buttens;

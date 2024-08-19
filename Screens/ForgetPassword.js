import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  style,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../Config';

const ResetPasswordRequestScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleRequestReset = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/reset-password`,
        { email },
      );
      Alert.alert('Success', response.data.message);
      navigation.navigate('ResetPassword', { email });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        Alert.alert('Error', 'The entered email is incorrect.');
      } else {
        Alert.alert('Error', 'Failed to request password reset');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.forgot}>
        <FontAwesomeIcon icon={faLock} size={50} color='#3C6491' style={{marginBottom:15,}} />
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            marginBottom: 20,
            fontSize: 30,
            fontWeight:'600'
          }}>
          Forgot Password
        </Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor={'black'}
          value={email}
          style={styles.input}
          onChangeText={text => setEmail(text)}
        />
        <TouchableOpacity onPress={handleRequestReset} style={styles.btn}>
          <Text style={{color: 'white', textAlign: 'center', padding: 10, fontSize:17}}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#B6DEF1',
    borderRadius: 7,
    paddingHorizontal: 70,
    color:'black'
  },
  forgot: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: '#3C6491',
    borderRadius:10
  },
};

export default ResetPasswordRequestScreen;

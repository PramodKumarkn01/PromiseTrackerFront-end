import React, {useEffect, useState} from 'react';
import {View, TextInput, Alert, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../Config';

const ResetPasswordScreen = ({ route }) => { 
  const { email } = route.params;
  const [isemail, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();
  
  const handleResetPassword = async () => {
    try {
      if (newPassword.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return;
      }
      const response = await axios.post(
        `${BASE_URL}/confirm-password`,
        {
          email: isemail,
          otp,
          newPassword,
        },
      );
      Alert.alert('Success', response.data.message);
      navigation.navigate('SingIn');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to reset password');
    }
  };
  
  useEffect ( () =>{
    setEmail(email)
  }, [email])

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'white', padding:30, borderRadius:20}}>
      <FontAwesomeIcon icon={faUnlock} size={50} color='#3C6491' style={{marginBottom:15,}} />
      <Text
          style={{
            color: 'black',
            textAlign: 'center',
            marginBottom: 20,
            fontSize: 30,
            fontWeight:'600'
          }}>
          Reset Password
        </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor={'black'}
        value={isemail}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor={'black'}
        value={otp.toString()}
        onChangeText={text => {
          const numericValue = parseFloat(text);
          if (!isNaN(numericValue)) {
            setOtp(numericValue);
          }
        }}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        placeholderTextColor={'black'}
        secureTextEntry
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#B6DEF1',
    color:'black',
    fontSize:18
  },
  button: {
    paddingVertical: 15,
    backgroundColor: '#3C6491',
    borderRadius: 5,
    alignItems: 'center',
    marginTop:20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ResetPasswordScreen;
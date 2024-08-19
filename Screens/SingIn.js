import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {connect, useDispatch} from 'react-redux';
import {loginUser} from '../Redux/Action/UserAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';

const SingIn = ({user}) => {
  const [isLeftButtonBlue, setIsLeftButtonBlue] = useState(false);
  const [isRightButtonBlue, setIsRightButtonBlue] = useState(true);

  const handleLeftButtonClick = () => {
    navigation.navigate('Signup');
  };

  const handleRightButtonClick = () => {
    setIsLeftButtonBlue(false);
    setIsRightButtonBlue(true);
  };
  const pressForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = email => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid Email Address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      // Example validation, adjust as needed
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      dispatch(loginUser(email, password));
      
      // navigation.navigate('Tabs'); // Uncomment if you navigate upon successful login
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sing}>Sign In</Text>
      <Text style={styles.singtext}>Let`s get you back inside</Text>
      <View style={styles.btn}>
        <TouchableOpacity
          style={[styles.button, isLeftButtonBlue && styles.blueButton]}
          onPress={handleLeftButtonClick}>
          <Text style={[isLeftButtonBlue && styles.buttonText,,{color:'black'}]}>
            Create New
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isRightButtonBlue && styles.blueButton]}
          onPress={handleRightButtonClick}>
          <Text style={[isRightButtonBlue && styles.buttonText]}>
            Existing User
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <View>
          <View style={styles.pass}>
          <TextInput
          style={styles.input}
          color="black"
          placeholder="Email Address"
          placeholderTextColor="black"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />   
          </View>
          {emailError ? (
              <Text style={{color: 'red', fontSize: 12}}>{emailError}</Text>
            ) : null}
          <View style={styles.pass}>
            
            <TextInput
               style={styles.input}
              color='black'
              placeholder="Password"
              placeholderTextColor="black"
              onChangeText={text => setPassword(text)}
              value={password}
              // secureTextEntry={true}
              secureTextEntry={!isPasswordVisible}
            />
            
            
            <TouchableOpacity style={{flexWrap:'wrap'}}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              {/* <FontAwesomeIcon icon={isPasswordVisible ? 'faeye' : 'faeye-slash'} size={20} color="grey" /> */}
              <FontAwesomeIcon icon={faEye} size={20} color="grey" />
            </TouchableOpacity>
           
          </View>
          {passwordError ? (
            <Text style={{color: 'red', fontSize: 12}}>{passwordError}</Text>
          ) : null}
        </View>
        <TouchableOpacity onPress={pressForgetPassword}>
          <Text style={{textAlign: 'right', color: 'blue', marginBottom: 10}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sigb} onPress={handleLogin}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 600,
              fontSize: 18,
            }}>
            SIGN IN
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hrz}>
        <View style={styles.line} />
        <Text style={styles.text}>Or Sing In with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.img}>
        <Image
          source={require('../Images/download.jpeg')}
          style={{width: 35, height: 35, marginTop: 25, borderRadius: 50}}
        />
        <Image
          source={require('../Images/apple.jpg')}
          style={{width: 35, height: 35, marginTop: 25, borderRadius: 50}}
        />
      </View>
    </View>
  );
};

export default SingIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sing: {
    fontSize: 30,
    color: '#14447b',
    fontVariant: 'Bold',
    fontWeight: '800',
  },
  singtext: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    paddingTop: 10,
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: '#B6DEF1',
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',

  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  blueButton: {
    backgroundColor: '#14447B',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    
    width: '90%',
    // backgroundColor: '#B6DEF1',
    // borderRadius: 5,
    color: 'black',
  },
  pass: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B6DEF1',
    // justifyContent: 'space-between',
    paddingHorizontal: 10,

    marginBottom: 15,
    width: 325,
    borderRadius: 5,
    marginTop:5
  },
  sigb: {
    backgroundColor: '#EA791D',
    paddingVertical: 15,
    width: 350,
    borderRadius: 5,
    marginTop: 20,
  },
  hrz: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    width: 350,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  text: {
    marginHorizontal: 10,
    color: 'black',
    fontWeight: '500',
  },
  img: {
    flexDirection: 'row',
    gap: 15,
  },
});

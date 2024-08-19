import React from 'react';
import {useState, useEffect} from 'react';
// import Google from './Google';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  title,
  Alert,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {BASE_URL, MEMBER_USER_ROLE} from '../Config';
import axios from 'react-native-axios';
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID',
});

const Stack = createNativeStackNavigator();

const Sign = () => {
  const [isrCeatenew, setNewPressed] = useState(true);
  const [isExistingPressed, setExistingPressed] = useState();
  const navigation = useNavigation();

  const handleNewPress = () => {
    setNewPressed(true);
    setExistingPressed(false);
  };

  const handleExistingPress = () => {
    navigation.navigate('SingIn');
  };
  const [name, setName] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistrationstatus, setRegistrationstatus] = useState(null);

  const handleRegistration = () => {
    console.log('register')
    if (password.length < 6) {
      Alert.alert(
        'Password Requirement',
        'Please enter a password with at least 6 characters.',
      );
      return;
    }

    axios
      .post(`${BASE_URL}/registration`, {
        name,
        mobilenumber,
        email,
        password,
        userRole: MEMBER_USER_ROLE,
        active: true,
      })
      .then(response => {
        console.log(response.data);
        Alert.alert(
          'Registration Successful',
          'You have been registered successfully.',
        );
        setName('');
        setMobilenumber('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert(
          'Registration Failed',
          'There was an error during registration.',
        );
      });
  };
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: 'YOUR_WEB_CLIENT_ID_HERE',
      offlineAccess: true,
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const userEmail = userInfo.user.email;

      Alert.alert('Google Sign-In', ` Welcome ${userInfo.user.name}!`);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Google Sign-In', 'Sign-in canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Google Sign-In', 'Sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Sign-In', 'Play services not available');
      } else {
        console.error('Google Sign-In Error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <Text style={styles.content}>Let's create your account</Text>
      <View style={styles.btn}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.touchableOpacity,
              isrCeatenew && styles.touchableOpacityPressedBlue,
            ]}
            activeOpacity={0.8}
            onPress={handleNewPress}>
            <Text style={[isrCeatenew && styles.touchNew]} activeOpacity={0.8}>
              Create New
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.touchableOpacity,
              isExistingPressed && styles.touchableOpacityPressedBlue,
            ]}
            activeOpacity={0.8}
            onPress={handleExistingPress}>
            <Text
              style={[isExistingPressed && styles.touchNew, {color: 'black'}]}
              activeOpacity={0.8}>
              Existing User
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="black"
          onChangeText={text => setName(text)}
          value={name}
        />

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="black"
          onChangeText={text => setMobilenumber(text)}
          value={mobilenumber}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="black"
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />

        <View>
          <TouchableOpacity
            style={styles.Register}
            onPress={handleRegistration}>
            <Text style={styles.reg}>SIGN UP</Text>
          </TouchableOpacity>
          {/* {isRegistrationstatus === 'success' && <Text>Registration successfully</Text>}
  {isRegistrationstatus === 'error' && <Text>Registration Failed </Text>} */}
        </View>
      </View>

      <View style={styles.app}>
        <View style={[styles.line, {width: 2}]}></View>
        <Text style={styles.text}>Or Sign up With</Text>
        <View style={[styles.line, {width: 2}]}></View>
      </View>
      <View style={styles.imgs}>
        <View>
          <TouchableOpacity onPress={handleGoogleLogin}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../Images/download.jpeg')}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../Images/apple.jpg')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 30,
    color: '#14447b',
    fontVariant: 'Bold',
    fontWeight: '800',
  },
  content: {
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

  form: {
    paddingTop: 30,
  },

  input: {
    height: 45,
    marginBottom: 20,
    padding: 15,
    width: 325,
    backgroundColor: '#B6DEF1',
    borderRadius: 5,
    color: 'black',

    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  Register: {
    backgroundColor: '#EA791D',
    height: 50,
    borderRadius: 5,
  },

  reg: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'bold',
    padding: 12,
  },

  touchableOpacity: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },

  touchableOpacityPressedBlue: {
    backgroundColor: '#14447B',
  },

  touchNew: {
    color: 'white',
  },

  app: {
    flexDirection: 'row',
    marginTop: 15,
    width: 300,
  },
  line: {
    marginTop: 10,
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  text: {
    marginHorizontal: 10,
    color: 'black',
  },
  imgs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  imageContainer: {
    width: 50,
    height: 50,
    overflow: 'hidden',
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
    borderRadius: 50,
  },
});
export default Sign;

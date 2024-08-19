import {StyleSheet, Text, View, Image, Alert, TextInput, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faBuilding,
  faCamera,
  faEye,
  faMap,
  faPhone,
  faUser,
  faVoicemail,
} from '@fortawesome/free-solid-svg-icons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../Redux/Action/UserAction';
import {connect} from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import axios from 'react-native-axios';
import { BASE_URL } from '../Config';



const AddUser = ({route}) => {
  const dispatch = useDispatch();
  // const { user } = route.params;
  // console.log('id',user._id)
  const navigation = useNavigation();
  const pressBack = () => {
    navigation.navigate('AddRoles');
  };
  const userId = useSelector(state => state.user.userData);
  //  console.log('id',userId)
  const [profilePic, setProfilePic] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userRole, setUserRole] = useState('');
  

  //   useEffect(() => {
  //     setProfilePic(user.profilePic);
  //     setDepartment(user.department);
  //     setDesignation(user.designation);
  //     setName(user.name)
  //     setMobileNumber(user.mobilenumber)
  //   }, [user]);

  //   const openImagePicker = () => {
  //     try {
  //       ImageCropPicker.openPicker({
  //         width: 300,
  //         height: 400,
  //         cropping: true,
  //         includeBase64: true,
  //       })
  //         .then((image) => {
  //           if (image && image.data) {
  //             setProfilePic(data:image/jpeg;base64,${image.data});
  //             // console.log('Selected Image File:', image);
  //           } else {
  //             console.warn('No valid image data received from picker.');
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('ImagePicker Error: ', error);
  //         });
  //     } catch (error) {
  //       console.error('Error opening image picker: ', error);
  //     }
  //   };

  // const handleUpdate = async () => {
  //   try {
  //     await dispatch(
  //       updateUser(
  //         userId,
  //         profilePic,
  //         department,
  //         designation,
  //         name,
  //         mobilenumber,
  //       ),
  //     );
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //   }
  // };
  const handlecreateUser = () => {
    // Check if the password meets the minimum length requirement
    if (password.length < 6) {
      Alert.alert(
        'Password Requirement',
        'Please enter a password with at least 6 characters.'
      );
      return; // Stop the registration process
    }
  
    // Check if the email contains the "@" symbol
    if (!email.includes('@')) {
      Alert.alert(
        'Email Requirement',
        'Please enter a @ with email address.'
      );
      return; // Stop the registration process
    }
  
    // Proceed with registration if all requirements are met
    axios
      .post(`${BASE_URL}/registration`, {
        name,
        mobilenumber,
        email,
        password,
        userRole,
        active: true,
      })
      .then(response => {
        console.log(response.data);
        Alert.alert(
          'User Added Successful',
         
        );
        setName('');
        setMobileNumber('');
        setEmail('');
        setPassword('');
        setUserRole('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert(
          'User Added Failed',
         
        );
      });
  };
  

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const roles = [
    { label: 'Select Role'},
    { label: 'Department Head', value: 1 },
    { label: 'Project Lead', value: 2 },
    { label: 'Member', value: 3 },
  ];
  return (
    <>
      <View style={styles.container}>
        <View style={styles.Profile1}>
          <View style={styles.Profile}>
            <TouchableOpacity onPress={pressBack}>
              <FontAwesomeIcon icon={faArrowLeft} size={30} color='#14447B' />
            </TouchableOpacity>
            <Text style={{color: '#14447B', fontSize: 25, fontWeight: '600'}}>
              AddUser
            </Text>
          </View>
        </View>
        <ScrollView style={{height: '92%'}}>
          <View style={styles.textfield}>
            <View style={styles.IT}>
              <FontAwesomeIcon icon={faUser} size={15} color="#EA791D" />
              <Text style={styles.text}>Name</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor={'#A9A9A9'}
              value={name}
              onChangeText={text => setName(text)}
            />
            <View style={styles.IT}>
              <FontAwesomeIcon icon={faVoicemail} size={15} color="#EA791D" />
              <Text style={styles.text}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor={'#A9A9A9'}
              value={email}
              onChangeText={text => setEmail(text)}
            />
             <View style={styles.IT}>
              <FontAwesomeIcon icon={faEye} size={15} color="#EA791D" />
              <Text style={styles.text}>Password</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor={'#A9A9A9'}
              value={password}
              onChangeText={text => setPassword(text)}
            />

            {/* <View style={styles.IT}>
              <FontAwesomeIcon icon={faBuilding} size={15} color="#EA791D" />
              <Text style={styles.text}>Department</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Department"
              placeholderTextColor={'#A9A9A9'}
              value={department}
              onChangeText={text => setDepartment(text)}
            /> */}

            {/* <View style={styles.IT}>
              <FontAwesomeIcon icon={faMap} size={15} color="#EA791D" />
              <Text style={styles.text}>Designation</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Designation"
              placeholderTextColor={'#A9A9A9'}
              value={designation}
              onChangeText={text => setDesignation(text)}
            /> */}

            <View style={styles.IT}>
              <FontAwesomeIcon icon={faPhone} size={15} color="#EA791D" />
              <Text style={styles.text}>Mobile Number</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter MobileNumber"
              placeholderTextColor={'#A9A9A9'}
              value={mobilenumber}
              onChangeText={text => setMobileNumber(text)}
              keyboardType="numeric"
            />
            <View style={styles.IT} onPress={toggleDropdown}>
              <FontAwesomeIcon icon={faVoicemail} size={15} color="#EA791D" />
              <Text style={styles.text}>Assign Role</Text>
            </View>
            <View style={styles.container}>
      <Picker
        selectedValue={userRole}
        onValueChange={(itemValue, itemIndex) => setUserRole(itemValue)}
        style={styles.picker}
      >
        {roles.map((role, index) => (
          <Picker.Item key={index} label={role.label} value={role.value} style={{color:'black' }}/>
        ))}
      </Picker>
      {/* <Text style={{color:'black',marginLeft:18}}>Selected Role: {selectedRole}</Text> */}
    </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.btn} onPress={handlecreateUser}>
                <Text style={{fontSize: 20, color: 'black'}}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
// const mapStateToProps = (state) => ({
//   userId: state.user._id,
//   user: state.user,
// });

export default AddUser;
const styles = StyleSheet.create({
  container: {},
  Usercontainer: {
    alignItems: 'center',
    paddingTop: 60,
  },

  userI: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    paddingVertical: 5,
  },

  textfield: {
    paddingHorizontal: 40,
    paddingTop: 10,
  },

  IT: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  cicon: {
    position: 'absolute',
    bottom: -4,
    right: 3,
    backgroundColor: '#EA791D',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  Profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 110,
  },
  Profile1: {
    backgroundColor: '#EA791D',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: 'black',
    paddingLeft: 23,
    backgroundColor: '#DCDCDC',
    marginVertical: 10,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#EA791D',

    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 15,
  },
picker:{
  color:'black'
}
});
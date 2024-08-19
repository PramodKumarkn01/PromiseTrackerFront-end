import { StyleSheet, Text, View, Image, Alert, TextInput } from 'react-native';
import React, { useEffect, useId, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faBuilding,
  faCamera,
  faEnvelope,
  faMap,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../Redux/Action/UserAction'
import { connect } from 'react-redux';



const UserEdit = ({ route }) => {
  const dispatch = useDispatch();
    const { user } = route.params;
    // console.log('id',user._id)
  const navigation = useNavigation();
  const pressBack = () => {
    navigation.navigate('User');
  };
  const userId = useSelector((state) => state.user.userData)
  
  // const currentUser = useSelector((state) => state.user.userData);
  //  console.log('id',userId)

  const [profilePic, setProfilePic] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');

  useEffect(() => {
    setProfilePic(user.profilePic);
    setDepartment(user.department);
    setDesignation(user.designation);
    setName(user.name);
    setEmail(user.email);
    setMobileNumber(user.mobilenumber);
  }, [user]);

  const openImagePicker = () => {
    try {
      ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        mediaType: 'photo',
        compressImageQuality: 0.8,
        compressImageMaxWidth: 2048,
        compressImageMaxHeight: 2048, 
        compressImageMaxSize: 10 * 1024 * 1024,
      })
        .then((image) => {
          if (image && image.data) {
            setProfilePic(`data:image/jpeg;base64,${image.data}`);
            // console.log('Selected Image File:', image);
          } else {
            console.warn('No valid image data received from picker.');
          }
        })
        .catch((error) => {
          console.error('ImagePicker Error: ', error);
        });
    } catch (error) {
      console.error('Error opening image picker: ', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateUser(userId._id, profilePic, department, designation, name, mobilenumber));
      console.log('uuuuu',userId._id)

    } catch (error) {
      console.error('Error updating user:', error);
    }
    navigation.navigate("User")
  };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.Profile1}>
        <View style={styles.Profile}>
          <TouchableOpacity onPress={pressBack}>
            <FontAwesomeIcon icon={faArrowLeft} size={30} color='white' />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 25, fontWeight:'bold' }}>Edit profile</Text>
        </View>
      </View>
      <ScrollView style={{height:'85%'}}>
      <View style={styles.Usercontainer}>
        <View>
          {/* {profilePic ? (
            <Image source={{ uri: user.profilePic }} style={styles.userI} />
          ) : (
            <Image
              source={require('../Images/profile.png')}
              style={styles.userI}
            />
          )} */}
          <View>
          {user.profilePic && (
            <Image source={{uri: user.profilePic}} style={styles.userI} />
          )}
          {!user.profilePic && (
            <Image
              source={require('../Images/profile.png')}
              style={styles.userI}
            />   
          )}
        </View>

          <TouchableOpacity onPress={openImagePicker}>
            <View style={styles.cicon}>
              <FontAwesomeIcon
                icon={faCamera}
                size={20}
                style={styles.faCamera}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textfield}>

      <View style={styles.IT}>
          <FontAwesomeIcon icon={faUser} size={25} color="#EA791D" />
          <Text style={styles.text}>Name</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor={"#A9A9A9"}
          value={name}
          onChangeText={(text) => setName(text)}
        />

      <View style={styles.IT}>
          <FontAwesomeIcon icon={faEnvelope} size={25} color="#EA791D" />
          <Text style={styles.text}>Email

          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor={"#A9A9A9"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View style={styles.IT}>
          <FontAwesomeIcon icon={faBuilding} size={25} color="#EA791D" />
          <Text style={styles.text}>Department</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Department"
          placeholderTextColor={"#A9A9A9"}
          value={department}
          onChangeText={(text) => setDepartment(text)}
        />

        <View style={styles.IT}>
          <FontAwesomeIcon icon={faMap} size={25} color="#EA791D" />
          <Text style={styles.text}>Designation</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Designation"
          placeholderTextColor={"#A9A9A9"}
          value={designation}
          onChangeText={(text) => setDesignation(text)}
        />

          <View style={styles.IT}>
          <FontAwesomeIcon icon={faPhone} size={25} color="#EA791D" />
          <Text style={styles.text}>Mobile Number</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter MobileNumber"
          placeholderTextColor={"#A9A9A9"}
          value={mobilenumber}
          onChangeText={(text) => setMobileNumber(text)}
        />

        <View style={styles.button}>
          <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight:'bold', }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
    
    </>
  );
};
const mapStateToProps = (state) => ({
  userId: state.user._id,
  user: state.user,
});

export default connect(mapStateToProps)(UserEdit);

const styles = StyleSheet.create({
  container: {},
  Usercontainer: {
    alignItems: 'center',
    marginTop:20
  },

  userI: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    color: '#808080',
    fontWeight: 'bold',
    paddingVertical: 10,
  },

  textfield: {
    paddingHorizontal: 40,
    paddingTop: 30,
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
    // alignItems: 'center',
    gap: 90,
  },
  Profile1: {
    backgroundColor: '#0A91d0',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    marginLeft:30,
    color: 'black',
    fontSize: 16,
    fontWeight:'bold',
    borderWidth:0.2,
    borderRadius:10,
    width:250,
    padding:10
  },
  btn: {
    backgroundColor: '#EA791D',
    paddingHorizontal:30,
    paddingVertical:10,
    borderRadius:10,
  },
  button: {
    alignItems: 'flex-end',
    marginTop:10
},
});
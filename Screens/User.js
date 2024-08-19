import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faBuilding,
  faCamera,
  faEnvelope,
  faGreaterThan,
  faIdCard,
  faMap,
  faPen,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Tooltip from 'react-native-walkthrough-tooltip';

const User = () => {
  const navigation = useNavigation();
  const pressBack = () => {
    navigation.navigate('Home');
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const pressEdit = () => {
    navigation.navigate('UserEdit', {user: user});
  };
  const user = useSelector(state => state.user.userData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [isClose, setIsColse] = useState(false);
  const Close = () => {
    setIsColse(!isModalVisible);
  };

  const [visiableEdit, setVisiable] = useState(false)

  const EditProfile = () => {
    setVisiable(true);
  }

  const onPressOut = () => {
    setVisiable(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.Profile1}>
        <View style={styles.Profile}>
          <TouchableOpacity onPress={pressBack}>
            <FontAwesomeIcon icon={faArrowLeft} size={30} color='white'/>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 25}}>Profile</Text>
        </View>

        <Tooltip
        isVisible={visiableEdit}
        content={<Text style={{color:'black'}}>Edit Profile</Text>}
        placement="bottom">
            <TouchableOpacity onPress={pressEdit} onLongPress={EditProfile} onPressOut={onPressOut}>
            <FontAwesomeIcon icon={faPen} size={30}  color='white' />
          </TouchableOpacity>
        </Tooltip>
      </View>
{/* 
      <View style={{flexDirection:'row', gap:5, marginTop:10, justifyContent:'flex-end', alignItems:'center'}}>
        <FontAwesomeIcon icon={faPen} size={20}  color='#EA791D' />
          <Text style={{color:'black', fontSize:18, fontWeight:'bold'}}>EditProfile</Text>
          <FontAwesomeIcon icon={faGreaterThan} size={20}/>
        </View> */}
      <View style={styles.Usercontainer}>
        {/* <View>
          {user.profilePic && (
            <Image source={{uri: user.profilePic}} style={styles.userI} />
          )}
          {!user.profilePic && (
            <Image
              source={require('../Images/profile.png')}
              style={styles.userI}
            />
          )}
        </View> */}
        
        <View>
      <TouchableOpacity onPress={toggleModal}>
        {user && user.profilePic ? (
          <Image source={{ uri: user.profilePic }} style={styles.userI} />
        ) : (
          <Image source={require('../Images/profile.png')} style={styles.userI} />
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalView}>
          {user && user.profilePic ? (
            <Image source={{ uri: user.profilePic }} style={styles.fullScreenImage} />
          ) : (
            <Image source={require('../Images/profile.png')} style={styles.fullScreenImage} />
          )}
        </View>
      </Modal>
    </View>
      </View>
      <View style={styles.textfield}>
        <View style={styles.IT}>
          <FontAwesomeIcon icon={faUser} size={25} color="#EA791D" />
          <Text style={styles.text}> Name</Text>
        </View>
        <Text style={styles.textname}>{user && user.name}</Text>


        <View style={styles.IT}>
          <FontAwesomeIcon icon={faEnvelope} size={25} color='#EA791D'/>
          <Text style={styles.text}>Email</Text>
        </View>
        <Text style={styles.textname}>{user && user.email}</Text>

        <View style={styles.IT}>
          <FontAwesomeIcon icon={faBuilding} size={25} color="#EA791D" />
          <Text style={styles.text}>Department</Text>
        </View>
        <Text style={styles.textname}>{user && user.department}</Text>
        <View style={styles.IT}>
          <FontAwesomeIcon icon={faIdCard} size={25} color="#EA791D" />
          <Text style={styles.text}>Designation</Text>
        </View>
        <Text style={styles.textname}>{user && user.designation}</Text>
        <View style={styles.IT}>
          <FontAwesomeIcon icon={faPhone} size={25} color="#EA791D" />
          <Text style={styles.text}>Phone Number</Text>
        </View>
        <Text style={styles.textname}>{user && user.mobilenumber}</Text>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {},
  Usercontainer: {
    alignItems: 'center',
    paddingTop: 50,
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
    paddingHorizontal: 50,
    paddingTop: 30,
  },
  IT: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop:10,
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
  textname: {
    marginLeft:50,
    color: 'black',
    fontSize: 20,
    fontWeight:'bold'
  },
  Profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  Profile1: {
    backgroundColor: '#0A91d0',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

import {StyleSheet, Text, View, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {BASE_URL} from '../Config';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDeleteLeft,
  faEdit,
  faPlus,
  faRefresh,
  faSearch,
  faStopCircle,
  faStore,
  faTrash,
  faTrashRestore,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../Redux/Action/UserAction';
import axios from 'axios';

const AddRoles = () => {
  const dispatch = useDispatch();

  const [data2, setData2] = useState([]);
  // console.log('data', data2);
  const [searchText, setSearchText] = useState('');

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(`${BASE_URL}/registeredNames`);
      if (response.ok) {
        const dataFromApi = await response.json();
        setData2(dataFromApi);
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
    // setLoggedInUser();
  }, []);

  const filteredData = data2
    ? data2.filter(
        item =>
          item &&
          typeof item.email === 'string' &&
          typeof item.name === 'string' &&
          (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase())),
      )
    : [];

  useEffect(() => {
    // Example: fetch('/api/registeredNames').then(response => response.json()).then(data => setData2(data));
  }, []);
  const handleSearch = text => {
    setSearchText(text);
  };
  const saveSelectedItems = () => {
    isSetmodalVisiable(!ismodalVisiable);
  };
  const [selectedItems, setSelectedItems] = useState([]);
  const [ismodalVisiable, isSetmodalVisiable] = useState(false);
  const Memberspopup = () => {
    isSetmodalVisiable(!ismodalVisiable);
  };

  const handleSelectItem = item => {
    navigation.navigate('AddRoleToUser', {selectedUser: item});
  };
  const handleDelete = item => {
    dispatch(deleteUser(item.userId));
    fetchDataFromApi();
  };

  const navigation = useNavigation();
  const addUser = () => {
    navigation.navigate('AddUser');
  };
  const userData = useSelector(state => state.user.userData);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    fetchDataFromApi();
    setRefreshing(false);
  };

  const showConfirmation = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(item),
        },
      ],
      {cancelable: true},
    );
  };

  // const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(true);

  const deactivateUser = async userId => {
    try {
      // Show confirmation message
      Alert.alert(
        'Confirm Deactivation',
        'Are you sure you want to deactivate this user?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Deactivation canceled'),
            style: 'cancel',
          },
          {
            text: 'Deactivate',
            onPress: async () => {
              await axios.patch(`${BASE_URL}/${userId}/deactivate`);
              setIsActive(false);
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const activateUser = async userId => {
    try {
      // Show confirmation message
      Alert.alert(
        'Confirm Activation',
        'Are you sure you want to activate this user?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Activation canceled'),
            style: 'cancel',
          },
          {
            text: 'Activate',
            onPress: async () => {
              await axios.patch(`${BASE_URL}/${userId}/activate`);
              setIsActive(true);
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  const roleMapping = {
    0: 'Admin',
    1: 'Dept Head',
    2: 'Project Lead',
    3: 'Member',
  };

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <View style={styles.addrole}>
          {userData.userRole == 0 ? (
            <TouchableOpacity
              onPress={addUser}
              style={{
                backgroundColor: '#EA791D',
                borderRadius: 50,
                padding: 15,
              }}>
              <FontAwesomeIcon icon={faPlus} size={20} color="#14447B" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={{}}>
        <View style={styles.Container}>
          <View style={styles.modalContent}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 6,
                gap: 2,
              }}>
              <FontAwesomeIcon icon={faSearch} size={22} color="#808080" />
              <TextInput
                style={{
                  width: '100%',
                  color: 'black',
                }}
                placeholder="Search Members"
                placeholderTextColor={'#808080'}
                value={searchText}
                onChangeText={handleSearch}
              />
            </View>
            <ScrollView
              style={{maxHeight: '88%'}}
              // style={[styles.scrollView]}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#3498db']}
                  tintColor="#3498db"
                />
              }>
              {filteredData.map((item, index) => (
                <View style={styles.searcview} key={index}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{paddingRight:10}}>
                      {item.profilePic ? (
                        <Image
                          source={{uri: item.profilePic}}
                          style={{width: 35, height: 35, borderRadius: 50}}
                        />
                      ) : (
                        <Image
                          source={require('../Images/profile.png')}
                          style={{width: 30, height: 30}}
                        />
                      )}
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{color: 'black', fontSize: 16, fontWeight:'bold'}}>
                        {item.name}
                      </Text>
                      <Text style={{color: 'black', fontSize: 15, fontWeight:'bold'}}>
                        {item.email}
                      </Text>
                      <Text style={{color: 'black', fontSize: 15, fontWeight:'bold'}}>
                        Role: {roleMapping[item.userRole]}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 20,
                      marginTop: 10,
                      justifyContent: 'flex-end',
                    }}>
                    <View>
                      <TouchableOpacity
                        key={item._id}
                        style={[
                          styles.dropdownItem,
                          selectedItems.includes(item) && styles.selectedItem,
                        ]}
                        onPress={() => handleSelectItem(item)}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          size={22}
                          color="#14447B"
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      {userData.userRole == 0 ? (
                        <TouchableOpacity
                          key={item._id}
                          style={[
                            styles.dropdownItem,
                            selectedItems.includes(item) && styles.selectedItem,
                          ]}
                          onPress={showConfirmation}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            size={22}
                            color="#14447B"
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    {item.active === true && (
                      <View>
                        <TouchableOpacity
                          key={item._id}
                          style={[
                            styles.dropdownItem,
                            selectedItems.includes(item) && styles.selectedItem,
                          ]}
                          onPress={() => deactivateUser(item.userId)}>
                          <FontAwesomeIcon
                            icon={faXmark}
                            size={22}
                            color="#14447B"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    {item.active === false && (
                      <View>
                        <TouchableOpacity
                          key={item._id}
                          style={[
                            styles.dropdownItem,
                            selectedItems.includes(item) && styles.selectedItem,
                          ]}
                          onPress={() => activateUser(item.userId)}>
                          <FontAwesomeIcon
                            icon={faRefresh}
                            size={22}
                            color="#14447B"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddRoles;

const styles = {
  mainGroup: {
    // backgroundColor:'skyblue',
    // height:610,
    alignItems: 'center',
    // margin:20,
    justifyContent: 'space-between',
    padding: 30,
    borderRadius: 20,
  },
  modalContent: {
    // padding:20,
    // backgroundColor: 'white',
    // borderRadius: 10,
    // width: 360,
    // height: 620,
    // marginTop: 82,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  dropdownItem: {
    // padding: 15,
    // borderBottomWidth: 0.5,
    // borderBottomColor: 'black',
  },
  modalSearch: {
    backgroundColor: 'white',
    width: 250,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
  },
  mainsearch: {
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  GroupBtn: {
    padding: 15,
    backgroundColor: '#EA791D',
    width: '50%',
    alignItems: 'center',
    borderRadius: 10,
  },
  icons: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 300,
    marginVertical: 7,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 300,
    backgroundColor: 'white',
    color: 'black',
  },
  inputContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    width: 50,
    padding: 5,
  },
  searcview: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  addrole: {
    flex: 0,
    // backgroundColor:'#EA791D',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems:"center",
    width: 50,
    marginHorizontal: 20,
    marginVertical: 2,
    padding: 15,
  },
};

import React, {useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {BASE_URL} from '../Config';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faClose,
  faSearch,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createTaskGroup} from '../Redux/Action/TaskAction';
// import ImagePicker from 'react-native-image-picker';s
import ImageCropPicker from 'react-native-image-crop-picker';
import {Image} from 'react-native';
import {fetchDataFromApi} from '../Redux/Action/UserAction';
const CreateProjectGroup = () => {
  const [Modelvisible, setModalVisible] = useState(false);
  // const [data2, setData2] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [searchText, setSearchText] = useState('');
  const [groupName, setGroupName] = useState('');
  const [profilePic, setProfilePic] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [ismodalVisiable, isSetmodalVisiable] = useState(false);
  const data2 = useSelector(state => state.user.alldata);
//  console.log(data2,"datauser")
  //   const saveSelectedItems = () => {
  //     isSetmodalVisiable(!ismodalVisiable);
  //   };
  //   const Memberspopup = () => {
  //     isSetmodalVisiable(!ismodalVisiable);
  //   };
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
        .then(image => {
          if (image && image.data) {
            setProfilePic(`data:image/jpeg;base64,${image.data}`);
          } else {
            console.warn('No valid image data received from picker.');
          }
        })
        .catch(error => {
          console.error('ImagePicker Error: ', error);
        });
    } catch (error) {
      console.error('Error opening image picker: ', error);
    }
  };
  //   const handleCreateTaskGroup = () => {
  //     dispatch(createTaskGroup(groupName, selectedItems, profilePic));
  //     setGroupName('');
  //     setProfilePic(null);
  //   };
  //   const dispatch = useDispatch();

  const handleCreateTaskGroup = () => {
    dispatch(
      createTaskGroup(groupName, deptHeads, projectLeads, members, profilePic),
      navigation.navigate('Home')
    );

    // Resetting the state after dispatching
    setGroupName('');
    setSelectedItems([]);
    setProfilePic(null);
  };

  const handleTohome = () => {
    navigation.navigate('Home');
  };
  const handleSearch = text => {
    setSearchText(text);
  };

  useEffect(() => {
    dispatch(fetchDataFromApi());
  }, [dispatch]);

  const [selectedItems, setSelectedItems] = useState([]);
  // console.log(selectedItems,"data")
  const handleSelectItem = (item, index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(item)) {
      newSelectedItems.splice(newSelectedItems.indexOf(item), 1);
    } else {
      newSelectedItems.push(item);
    }
    setSelectedItems(newSelectedItems);
  };

  const deptHeads = selectedItems.filter(item => item.userRole === 1);
  const projectLeads = selectedItems.filter(item => item.userRole === 2);
  const members = selectedItems.filter(item => item.userRole === 3);

  const [selectedRole, setSelectedRole] = useState(null);

  // const handleSelectRole = role => {
  //   setSelectedRole(role); // Update the selected role state
  //   setModalVisible(true); // Open the modal
  // };
  const handleSelectRole = role => {
    try {
      setSelectedRole(role); // Update the selected role state
      setModalVisible(true); // Open the modal
    } catch (error) {
      console.error('Error in handleSelectRole:', error);
    }
  };
  
 

  const getFilteredDataByRole = () => {
    if (!selectedRole) return [];
  
    // Filter first by role, then further filter by search text if any.
    const filteredByRole = data2.filter(item => item.userRole === selectedRole);
    if (!searchText) return filteredByRole;
  
    // Further filter the data by search text, ignoring case sensitivity.
    return filteredByRole.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  


  // console.log(getFilteredDataByRole(),"user")
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchDataFromApi());
    setRefreshing(false);
  };

  return !data2 ? (
    <View style={[styles.activity, styles.horizontal]}>
      <ActivityIndicator size="large" color="#3C6491" />
    </View>
  ) : (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 150,
          justifyContent: 'space-around',
          paddingVertical: 20,
          backgroundColor: '#0A91d0',
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={handleTohome}>
          <FontAwesomeIcon
            onPress={handleTohome}
            icon={faArrowLeft}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <View>
          <Text style={{color: 'white', fontSize: 20, fontWeight:'bold'}}>New Project Group</Text>
        </View>
      </View>

      <View style={styles.mainGroup}>
        <View>
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.uploadButton}>
            {profilePic ? (
              <Image
                source={{uri: profilePic}}
                style={{
                  width: 90,
                  height: 90,
                  borderWidth: 1,
                  borderRadius: 100,
                }}
              />
            ) : (
              <View style={{marginTop: 3}}>
                <Image
                  source={require('../Images/profile.png')}
                  style={{width: 80, height: 80}}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={{color: 'black', fontSize: 20, fontSize: 25, fontWeight:'bold'}}>
          Project Group
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Project Group Name"
          placeholderTextColor={'black'}
          value={groupName}
          onChangeText={text => setGroupName(text)}
          // onChangeText={text => setName(text)}
          // value={name}
        />

        <TouchableOpacity
          onPress={() => handleSelectRole(1)}
          style={{
            flexDirection: 'row',
            gap: 15,
            borderRadius: 7,
            marginVertical: 7,
            padding: 15,
            backgroundColor: 'white',
            width: 300,
            alignItems: 'center',
          }}>
          <FontAwesomeIcon icon={faUser} size={40} color="#14447B" />
          {deptHeads.length > 0 ? (
            deptHeads.length <= 2 ? (
              <Text style={styles.selected}>
                Selected: {deptHeads.map(item => item.name).join(', ')}
              </Text>
            ) : (
              <Text style={styles.selected}>
                Selected:{' '}
                {deptHeads.slice(0, 1).map((item, index) => (
                  <Text key={index}>
                    {index > 0 && ', '}
                    {item.name}
                  </Text>
                ))}
                {deptHeads.length > 1 && <Text> and others</Text>}
              </Text>
            )
          ) : (
            <Text style={{color: 'black', fontSize: 16, fontWeight:'bold'}}>Department Head</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectRole(2)}
          style={{
            flexDirection: 'row',
            gap: 15,
            borderRadius: 7,
            marginVertical: 7,
            padding: 15,
            backgroundColor: 'white',
            width: 300,
            alignItems: 'center',
          }}>
          <FontAwesomeIcon icon={faUser} size={40} color="#14447B" />
          {projectLeads.length > 0 ? (
            projectLeads.length <= 2 ? (
              <Text style={styles.selected}>
                Selected: {projectLeads.map(item => item.name).join(', ')}
              </Text>
            ) : (
              <Text style={styles.selected}>
                Selected:{' '}
                {projectLeads.slice(0, 1).map((item, index) => (
                  <Text key={index}>
                    {index > 0 && ', '}
                    {item.name}
                  </Text>
                ))}
                {projectLeads.length > 1 && <Text> and others</Text>}
              </Text>
            )
          ) : (
            <Text style={{color: 'black', fontSize: 16, fontWeight:'bold'}}>Project Lead </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectRole(3)}
          style={{
            flexDirection: 'row',
            gap: 15,
            borderRadius: 7,
            marginVertical: 7,
            padding: 15,
            backgroundColor: 'white',
            width: 300,
            alignItems: 'center',
          }}>
          <FontAwesomeIcon icon={faUserGroup} size={40} color="#14447B" />
          {members.length > 0 ? (
            members.length <= 2 ? (
              <Text style={styles.selected}>
                Selected: {members.map(item => item.name).join(', ')}
              </Text>
            ) : (
              <Text style={styles.selected}>
                Selected:{' '}
                {members.slice(0, 1).map((item, index) => (
                  <Text key={index}>
                    {index > 0 && ', '}
                    {item.name}
                  </Text>
                ))}
                {members.length > 1 && <Text> and others</Text>}
              </Text>
            )
          ) : (
            <Text style={{color: 'black', fontSize: 16, fontWeight:'bold'}}>Members </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCreateTaskGroup}
          style={{
            backgroundColor: '#EA791D',
            width: 300,
            alignItems: 'center',
            padding: 20,
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Create Project Group
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={Modelvisible}
        onRequestClose={() => setModalVisible(false)}        
        
        >
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.Container}>
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginRight: 20,
                }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <FontAwesomeIcon icon={faClose} size={25} color="#14447B" />
                </TouchableOpacity>
              </View>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#3498db']}
                    tintColor="#3498db"
                  />
                }
                >
                <View
                  style={{
                    flexDirection: 'row',
                    // gap:20,
                    alignItems:'center',
                    borderBottomWidth: 1,
                    paddingLeft:20,
                    borderRadius: 10,
                    color: 'black',
                  }}>
                  <FontAwesomeIcon icon={faSearch} size={20} color='black' />
                  <TextInput
                    style={{textAlign: 'center', fontSize:18}}
                    placeholder="Search Members"
                    placeholderTextColor={'black'}
                    value={searchText}
                    onChangeText={handleSearch}
                  />
                </View>
                {/* Call getFilteredDataByRole() as a function and then map the results */}
                {getFilteredDataByRole().length > 0 ? (
                  getFilteredDataByRole().map((item, index) => (
                    <TouchableOpacity
                    key={item._id || index}
                      style={[
                        styles.dropdownItem,
                        selectedItems.includes(item) && styles.selectedItem,
                      ]}
                      onPress={() => handleSelectItem(item, index)}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesomeIcon
                          icon={faUser}
                          size={20}
                          color="#14447B"
                          style={{marginRight: 10}}
                        />
                        <View style={{flexDirection: 'column'}}>
                          <Text style={{color: 'black', fontSize: 16, fontWeight:'600'}}>
                            {item.name}
                          </Text>
                          <Text style={{color: 'black', fontSize: 13, fontWeight:'600'}}>
                            {item.email}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 50,
                      color: 'black',
                      fontSize: 20,
                    }}>
                    No members found for the selected role.
                  </Text>
                )}
              </ScrollView>

              <View style={{alignItems: 'center', marginVertical: 10}}>
                <TouchableOpacity
                  style={styles.GroupBtn}
                  onPress={() => setModalVisible(false)}>
                  <Text
                    style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                   Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateProjectGroup;

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
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 360,
    height: 620,
    marginTop: 82,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
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
  cicon: {
    position: 'absolute',
    // bottom: -4,
    // right: 3,
    backgroundColor: '#EA791D',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 1,
    borderRadius: 100,
    marginBottom: 10,
    width: 90,
    height: 90,
    alignItems: 'center',
  },
  selected: {
    color: 'black',
    fontSize: 16,
   fontWeight:'bold'
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
};

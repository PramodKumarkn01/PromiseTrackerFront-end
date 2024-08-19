import React, {useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {BASE_URL} from '../Config';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faArrowLeft,
  faClock,
  faUser,
  faLessThan,
  faLeftLong,
  faSearch,
  faFeather,
  faBriefcase,
  faGlobe,
  faPlus,
  faCirclePlus,
  faUserGroup,

} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateTaskGroup} from '../Redux/Action/TaskAction';
import ImageCropPicker from 'react-native-image-crop-picker';

const GroupMembers = ({route}) => {
  const {TGroupId, name, members, profilePic} = route.params;
  const [Modelvisible, setModalVisible] = useState(false);
  const [data2, setData2] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const AddMembers = () => {
    setModalVisible(!Modelvisible);
  };

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(`${BASE_URL}/registeredNames`);
      if (response.ok) {
        const dataFromApi = await response.json();
        setData2(dataFromApi);
        // console.log('datad', dataFromApi);
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
    setLoggedInUser();
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
  }, []);

  const handleSelectItem = (item, index) => {
    const isSelected = selectedItems.includes(item);
    let newSelectedItems;

    if (isSelected) {
      newSelectedItems = selectedItems.filter(
        selectedItem => selectedItem !== item,
      );
    } else {
      newSelectedItems = [...selectedItems, item];
    }
    setSelectedItems(newSelectedItems);
    const updatedMembers = [...members];
    if (!updatedMembers.includes(item)) {
      updatedMembers.push(item);
    }
    updateTaskGroup(TGroupId, groupName, updatedMembers);
  };

  const saveSelectedItems = () => {
    isSetmodalVisiable(!ismodalVisiable);
  };

  const SearchMembers = () => {
    setModalVisible(!Modelvisible);
  };

  const handleTohome = () => {
    navigation.navigate('Home');
  };

  const handleSearch = text => {
    setSearchText(text);
  };

  // const [selectedIcon, setSelectedIcon] = useState(icons);
  const [groupName, setGroupName] = useState(name);
  const [profile, setProfile] = useState(profilePic);
  const [icon, setIcon] = useState('');
  const [ismodalVisiable, isSetmodalVisiable] = useState(false);

  const handleIconChange = IconName => {
    setSelectedIcon(IconName);
  };

  const handleUpdateTaskGroup = () => {
    dispatch(updateTaskGroup(TGroupId, groupName, selectedItems, profile));
    navigation.navigate('Home');
    setSelectedItems('');
  };

  const Memberspopup = () => {
    isSetmodalVisiable(!ismodalVisiable);
  };

  useEffect(() => {
    setGroupName(name);
  }, [name]);

  // useEffect(() => {
  //   setSelectedIcon(icons);
  // }, [icons]);

  useEffect(() => {
    setProfile(profilePic);
  }, [profilePic]);

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
            setProfile(`data:image/jpeg;base64,${image.data}`);
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

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 150,
          justifyContent: 'space-around',
          paddingVertical: 20,
          backgroundColor: '#14447B',
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={handleTohome}>
          <FontAwesomeIcon
            onPress={handleTohome}
            icon={faArrowLeft}
            size={20}
            color="white"
          />
        </TouchableOpacity>
        <View>
          <Text style={{color: 'white', fontSize: 16}}>
            Update Project Group
          </Text>
        </View>
      </View>
      <ScrollView style={[styles.mainGroup,{maxHeight:300}]}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 50,
            padding: 2,
            borderColor: '#14447B',
          }}>

          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.uploadButton}>
            {profile ? (
              <Image
                source={{uri: profile}}
                style={{
                  width: 90,
                  height: 90,
                  borderWidth: 1,
                  borderRadius: 100,
                }}
              />
            ) : (
              <Image
                source={{uri: profile}}
                style={{width: 70, height: 70, borderRadius: 50}}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text style={{color: 'black', fontSize: 20, fontSize: 25}}>
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
          onPress={Memberspopup}
          style={{
            flexDirection: 'row',
            gap: 15,
            borderRadius: 10,
            marginVertical: 7,
            padding: 15,
            backgroundColor: 'white',
            width: 300,
            alignItems: 'center',
          }}>
          <FontAwesomeIcon icon={faUserGroup} size={40} color="#14447B" />
          {/* <Text style={{ fontSize: 17, fontWeight: 'bold', width: 160, color: 'black' }}>
                              {selectedItems && selectedItems.length > 0 ? (
                                 <Text>
                                 Selected: {selectedItems.map(item => item.name).join(', ')}
                                 {selectedItems.length > 2 && <Text> and {selectedItems.length - 2} others</Text>}
                               </Text>
                              ) : members && members.length > 0 ? (
                                <Text>
                                  Original: {members.map(item => item.name).join(', ')}
                                  {members.length <= 3 && <Text> and  {selectedItems.length -2} others </Text>}
                                  </Text>
                              ) : (
                                'Add Members'
                              )}
                            </Text> */}

          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              width: 160,
              color: 'black',
            }}>
            {selectedItems && selectedItems.length > 0 ? (
              selectedItems.length <= 2 ? (
                <Text>
                  Selected: {selectedItems.map(item => item.name).join(', ')}
                </Text>
              ) : (
                <Text>
                  selected:{' '}
                  {selectedItems.slice(0, 1).map((item, index) => (
                    <Text key={index}>
                      {index > 0 && ', '}
                      {item.name}
                    </Text>
                  ))}
                  {selectedItems.length > 1 && <Text> and others</Text>}
                </Text>
              )
            ) : members && members.length > 0 ? (
              members.length <= 2 ? (
                <Text>
                  Original: {members.map(item => item.name).join(', ')}
                </Text>
              ) : (
                <Text>
                  Original:{' '}
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
              'Add Members'
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUpdateTaskGroup}
          style={{
            backgroundColor: '#EA791D',
            width: 300,
            alignItems: 'center',
            padding: 20,
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
            Update Project Group
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ismodalVisiable}
        onRequestClose={Memberspopup}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.Container}>
            <View style={styles.modalContent}>
              <ScrollView>
                <TextInput
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    borderBottomWidth: 1,
                    borderRadius: 10,
                  }}
                  placeholder="Search Members"
                  placeholderTextColor={'grey'}
                  value={searchText}
                  onChangeText={handleSearch}
                />
                {filteredData.map((item, index) => (
                  <TouchableOpacity
                    key={item._id}
                    style={[
                      styles.dropdownItem,
                      selectedItems.includes(item) && styles.selectedItem,
                    ]}
                    onPress={() => handleSelectItem(item, index)}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <FontAwesomeIcon
                        icon={faUser}
                        size={20}
                        color="#14447B"
                        style={{marginRight: 10}}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <Text style={{color: 'black', fontSize: 16}}>
                          {item.name}
                        </Text>
                        <Text style={{color: 'black', fontSize: 15}}>
                          {item.email}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={{alignItems: 'center', marginVertical: 10}}>
                <TouchableOpacity
                  style={styles.GroupBtn}
                  onPress={saveSelectedItems}>
                  <Text style={{color: 'black'}}>Select Members</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
    height: 610,
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
};

export default GroupMembers;

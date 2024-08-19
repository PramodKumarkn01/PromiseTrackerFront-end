import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBriefcase,
  faClock,
  faUser,
  faPen,
  faGlobe,
  faFeather
} from '@fortawesome/free-solid-svg-icons'; // Import faPen
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const SelectList = ({
  setSelected,
  fontFamily,
  data,
  search,
  boxStyles,
  dropdownStyles,
  defaultOption,
  placeholder,
  value,
  onChangeText,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultOption);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [groupName, setGroupName] = useState({});
  const navigation = useNavigation();
   const [searchText, setSearchText] = useState('');
  // const [filteredOptions, setFilteredOptions] = useState(item);

  const handleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelectOption = option => {
    // console.log(option,'option')
    setSelectedValue(option.groupName);
    // setSelectedValue(option._id);
    setSelectedIcon(option.icon);
    onChangeText({
      groupName: option.groupName,
      groupId: option._id
    })
    setDropdownVisible(false);
    navigation.navigate('AddTask', {
      TGroupId: option._id,
    });
  };

  const renderOption = item => {
    // console.log(item,"item")
    return (
      <ScrollView nestedScrollEnabled={true} style={styles.dropdownList}>
      {item.map((option) => (
        <TouchableOpacity
          key={option._id}
          onPress={() => handleSelectOption(option)} style={styles.optionContainer}>
            {/* <FontAwesomeIcon
              icon={
                option.icon === 'faUser'
                  ? faUser
                  : option.icon === 'faBriefcase'
                  ? faBriefcase
                  : option.icon === 'faPen'
                  ? faPen
                  : option.icon === 'faFeather'
                  ? faFeather
                  : faGlobe
              }
              size={22}
              style={{ marginRight: 8, color: '#14447B' }}
            /> */}
            <View>
            {option.profilePic ? (
                <Image
                  source={{uri: option.profilePic}}
                  style={{width:35, height:35,borderRadius:50}}
                />
              ) : (
                <Image
                  source={require('../Images/profile.png')}
                  style={{width:30, height:30}}
                />
              )}
              </View>
              <View>
            <Text style={{ color: '#000' }}>{option.groupName}</Text>
            </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    );
  };
 
  const task = useSelector((state)=>state.task)
  // console.log("tasks",task)
  return (
    <>
      <TouchableOpacity onPress={handleDropdown}>
        <View style={styles.selectBox}>
          <Text style={styles.selectText}>{selectedValue || placeholder}</Text>
        </View>
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={dropdownStyles}>{renderOption(data)}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // elevation: 5,
  },
  selectText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  dropdownList: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 200,
  },
  optionContainer: {
    display: 'flex',
    alignItems:'center',
    gap:20,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginVertical: 5,
   // backgroundColor: 'pink',
  },
});

export default SelectList;
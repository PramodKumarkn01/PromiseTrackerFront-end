import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faUser} from '@fortawesome/free-solid-svg-icons';
import {TouchEventType} from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {updateRole} from '../Redux/Action/UserAction'
import { useDispatch } from 'react-redux';
const AddRoleToUser = () => {
  const route = useRoute();
  const {selectedUser} = route.params;
  // console.log(selectedUser,"data")
  const navigation = useNavigation();
  const Back = () => {
    navigation.navigate('AddRoles');
  };
  const [selectedRole, setSelectedRole] = useState();

  const roles = [
    // {label: 'Admin', value: 0},
    {label: 'Dept Head', value: 1},
    {label: 'Project Lead', value: 2},
    {label: 'Member', value: 3},
  ];



  // const updateRole = async () => {
  //   if (!selectedRole) {
  //     Alert.alert('Error', 'Please select a role');
  //     return;
  //   }

  //   try {
  //     // console.log(selectedUser.userId,'userid')
  //     const response = await fetch(
        
  //       `${BASE_URL}/updateUserRole/${selectedUser.userId}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           userRole: selectedRole,
  //         }),
  //       },
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       Alert.alert('Success', 'User role updated successfully');
  //       // Navigate back or refresh the user list as needed
  //     } else {
  //       throw new Error('Failed to update user role');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', error.message);
  //   }
  // };
  const dispatch = useDispatch();
  const UpdateRole = () => {
    // Dispatch the updateRole action
    dispatch(updateRole(selectedUser, selectedRole));
  };


  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          alignItems: 'center',
          marginHorizontal: 20,
          gap: 50,
        }}>
        <TouchableOpacity onPress={Back}>
          <FontAwesomeIcon icon={faArrowLeft} size={30} color="#14447B" />
        </TouchableOpacity>
        <Text style={{color: '#14447B', fontSize: 30, fontWeight: '600'}}>
          Add Role To User
        </Text>
      </View>
      <View style={styles.role}>
        <View style={styles.IT}>
          <View style={styles.rolev}>
            <FontAwesomeIcon icon={faUser} size={15} color="#EA791D" />
            <Text style={styles.roleuser}>Name </Text>
          </View>
          <View>
            <Text style={styles.roleusertext}>{selectedUser.name}</Text>
          </View>
        </View>

        <View style={styles.IT}>
          <View style={styles.rolev}>
            <FontAwesomeIcon icon={faUser} size={15} color="#EA791D" />
            <Text style={styles.roleuser}>Email</Text>
          </View>
          <View>
            <Text  style={styles.roleusertext}>{selectedUser.email}</Text>
          </View>
        </View>

        <View style={styles.IT}>
          <View style={styles.rolev}>
            <FontAwesomeIcon icon={faUser} size={15} color="#EA791D" />
            <Text style={styles.roleuser}>Role</Text>
          </View>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
            style={{height: 50, width: 150, borderRadius: 20,color:'black',}}>
            {roles.map((role, index) => (
              <Picker.Item key={index} label={role.label} value={role.value} style={{color:'black'}}/>
            ))}
          </Picker>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity style={styles.submitButton} onPress={UpdateRole}>
          <Text style={styles.submitButtonText}>Update Role</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRoleToUser;

const styles = StyleSheet.create({
  IT: {
    // flexDirection: 'column',
    // alignItems: 'center',
    gap: 10,
    marginTop: 30,
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    // paddingVertical: 5,
  },
  role: {
    padding: 25,
    backgroundColor: 'white',
    marginHorizontal: 40,
    marginTop: 30,
    borderRadius: 10,
    // alignItems:'center'
  },
  roleuser: {
    color: 'black',
    fontSize: 20,
  },
  rolev: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  submitButton: {
    backgroundColor: '#14447B',
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  roleusertext:{
    color:'black'
  }
});

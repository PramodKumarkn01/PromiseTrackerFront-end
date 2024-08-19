// Action types
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../Config';
// Action types
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const SET_USER_DATA = 'SET_USER_DATA';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const UPDATE_ROLE_FAILURE = 'UPDATE_ROLE_FAILURE';
export const UPDATE_ROLE_SUCCESS = 'UPDATE_ROLE_SUCCESS';
export const FETCH_ALLUDATA_SUCCESS = 'FETCH_ALLUDATA_SUCCESS';
export const FETCH_ALLUDATA_FAILURE = 'FETCH_ALLUDATA_FAILURE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const SET_TOKEN = 'SET-TOKEN';

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
});
export const loginUserSuccess = userData => ({
  type: LOGIN_USER_SUCCESS,
  payload: userData,
});

export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const setUserData = userData => ({
  type: SET_USER_DATA,
  payload: userData,
});
export const logoutuser = userData => ({
  type: LOGOUT_USER,
  payload: userData,
});

export const fetchUserDataSuccess = userData => ({
  type: FETCH_USER_DATA_SUCCESS,
  payload: userData,
});

export const fetchUserDataFailure = error => ({
  type: FETCH_USER_DATA_FAILURE,
  payload: error,
});

export const loginUser = (email, password) => async dispatch => {
  // console.log('user')
  try {
    const response = await axios.post(`${BASE_URL}/Signin`, {
      email,
      password,
    });
    const userId = response.data.userId;
    // console.log('userid is not null', userId)
    await AsyncStorage.setItem('userId', userId);

    await AsyncStorage.setItem('userToken', response.data.token);
    if (response.data.active) {
      ToastAndroid.showWithGravity(
        'Loggin Successful',
        ToastAndroid.CENTER,
        ToastAndroid.CENTER,
      );
      await Promise.all([
        dispatch(loginUserSuccess(userId)),
        dispatch(setToken(response.data.token)),
      ]);
    } else {
      console.log('User is deactivated. Cannot log in.');
      ToastAndroid.showWithGravity(
        'deactivated',
        ToastAndroid.CENTER,
        ToastAndroid.CENTER,
      );
    }
    return userId;
  } catch (error) {
    dispatch(loginUserFailure(error.message));
    ToastAndroid.showWithGravity(
      'Email or Password Incorrect',
      ToastAndroid.CENTER,
      ToastAndroid.CENTER,
    );
  }
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch({ type: 'LOGOUT_USER' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
};

// Thunk for updating user profile

export const updateUser = (
  currentUserId,
  profilePic,
  department,
  designation,
  name,
  mobilenumber,
) => {
  // console.log('Updating user with ID:', currentUserId);

  return async dispatch => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.put(
        `${BASE_URL}/users/${currentUserId}`,
        {
          profilePic,
          department,
          designation,
          name,
          mobilenumber,
        },
        { 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      // console.log("Response data:", response.data._id);

      if (response.data && response.data._id) {
        // await AsyncStorage.setItem('userId', response.data._id);
        dispatch(setUserData(response.data));
        // console.log("Updated User ID:", response.data._id);
        ToastAndroid.showWithGravity(
          'Successfully Updated', 
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      } else {
        // console.error('No _id found in response:', response.data);
        throw new Error('No _id found in response');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      ToastAndroid.showWithGravity(
        `Error updating user: ${error.message}`,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      throw error;
    }
  };
};
export const fetchUserData = () => {
  // console.log('userfech',userId)
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      // console.log('userfech',userId)
      const response = await axios.get(`${BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      // console.log('userfech',userId)
      // console.log("data",response.data)
      dispatch(fetchUserDataSuccess(response.data));
      // console.log('user data',response.data)
    } catch (error) {
      dispatch(fetchUserDataFailure(error.message));
    }
  };
};

export const updateRole = (selectedUser, selectedRole) => async dispatch => {
  if (!selectedRole) {
    Alert.alert('Error', 'Please select a role');
    return;
  }

  // dispatch({ type: UPDATE_ROLE_START });

  try {
    const response = await fetch(
      `${BASE_URL}/updateUserRole/${selectedUser.userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userRole: selectedRole,
        }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      dispatch({type: UPDATE_ROLE_SUCCESS, payload: data});
      Alert.alert('Success', 'User role updated successfully');
    } else {
      throw new Error('Failed to update user role');
    }
  } catch (error) {
    dispatch({type: UPDATE_ROLE_FAILURE, payload: error.message});
    Alert.alert('Error', error.message);
  }
};

export const fetchDataFromApi = () => async dispatch => {
  try {
    const response = await fetch(`${BASE_URL}/userData`);
    if (response.ok) {
      const data = await response.json();
      dispatch({type: 'FETCH_ALLUDATA_SUCCESS', payload: data});
    } else {
      dispatch({type: 'FETCH_ALLUDATA_FAILURE'});
    }
  } catch (error) {
    dispatch({type: 'FETCH_ALLUDATA_FAILURE'});
  }
};

export const deleteUser = userId => async dispatch => {
  // console.log(userId, 'user');
  try {
    await axios.delete(`${BASE_URL}/users/${userId}`);
    dispatch({type: DELETE_USER_SUCCESS, payload: userId});
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

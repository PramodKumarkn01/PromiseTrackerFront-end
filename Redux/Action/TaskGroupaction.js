import axios from 'axios';
import { BASE_URL } from '../../Config';
// Define action types
export const FETCH_TASK_GROUPS_SUCCESS = 'FETCH_TASK_GROUPS_SUCCESS';
export const FETCH_TASK_GROUPS_FAILURE = 'FETCH_TASK_GROUPS_FAILURE';
export const DELETE_TGROUP_SUCCESS = 'DELETE_TGROUP_SUCCESS';
export const DELETE_TGROUP_FAILURE = 'DELETE_TGROUP_FAILURE';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const fetchTaskGroupsSuccess = taskGroups => ({
    type: FETCH_TASK_GROUPS_SUCCESS,
    payload: taskGroups,
  });
  
  export const fetchTaskGroupsFailure = error => ({
    type: FETCH_TASK_GROUPS_FAILURE,
    payload: error,
  });
const deleteTGroupSuccess = (TGroupId) => ({
  type: DELETE_TGROUP_SUCCESS,
  payload: TGroupId,
});

const deleteTGroupFailure = (error) => ({
  type: DELETE_TGROUP_FAILURE,
  payload: error,
});



export const deleteTGroup = (TGroupId) => async (dispatch) => {
  console.log("delete")
  try {
    // Make sure to replace 'YOUR_TOKEN_HERE' with your actual bearer token
    const userToken = await AsyncStorage.getItem('userToken');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    // Make sure to replace this with your actual API base URL
    const response = await axios.delete(`${BASE_URL}/delete/${TGroupId}`, config);

    if (response.status === 200) {
      dispatch(deleteTGroupSuccess(TGroupId));
      ToastAndroid.showWithGravity(
        'Deleted Successfully',
        ToastAndroid.CENTER,
        ToastAndroid.CENTER,
      );
      // Optionally, you can use Alert.alert('Success', 'TGROUP deleted successfully');
    } else {
      dispatch(deleteTGroupFailure('Failed to delete task'));
      // Optionally, you can use Alert.alert('Error', 'Failed to delete task');
    }
  } catch (error) {
    dispatch(deleteTGroupFailure('An error occurred while deleting task'));
    // Optionally, you can log the error or use Alert.alert('Error', 'An error occurred while deleting task');
  }
};



export const fetchTaskGroups = () => {
  return async dispatch => {
    try {
      // Assuming your bearer token is stored in a variable named 'token'
      const userToken = await AsyncStorage.getItem('userToken');
      // Replace 'YOUR_BEARER_TOKEN_HERE' with your actual token

      const response = await fetch(`${BASE_URL}/TGroups`, {
        method: 'GET', // Explicitly stating the method is optional since 'GET' is the default
        headers: {
          'Authorization': `Bearer ${userToken}`, // Include the authorization header
          'Content-Type': 'application/json' // It's a good practice to include this as well, although it's mainly relevant for requests with a body
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      dispatch(fetchTaskGroupsSuccess(data));
    } catch (error) {
      console.error('Error fetching task groups:', error.message);
      dispatch(fetchTaskGroupsFailure(error.message));
    }
  };
};

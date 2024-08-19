import axios from 'axios';
import { BASE_URL } from "../../Config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from "react-native";
import { types } from 'util';


export const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';
export const FETCH_NOTIFICATIONS_FAILURE = 'FETCH_NOTIFICATIONS_FAILURE'
export const REPLY_NOTIFICATION_SUCCESS = 'REPLY_NOTIFICATION_SUCCESS';
export const REPLY_NOTIFICATION_FAILURE = 'REPLY_NOTIFICATION_FAILURE';
export const UPDATE_NOTIFICATION_SUCCESS = 'UPDATE_NOTIFICATION_SUCCESS';
export const UPDATE_NOTIFICATION_FAILURE = 'UPDATE_NOTIFICATION_FAILURE';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS_SUCCESS = 'UPDATE_NOTIFICATIONS_SUCCESS';
export const UPDATE_NOTIFICATIONS_FAILURE = 'UPDATE_NOTIFICATIONS_FAILURE';

const updateNotificationsSuccess = (notifications) => ({
  type: UPDATE_NOTIFICATIONS_SUCCESS,
  payload: notifications,
});

const updateNotificationsFailure = (error) => ({
  type: UPDATE_NOTIFICATIONS_FAILURE,
  payload: error,
});

export const updateNotifications = (notifications) => ({
  type: UPDATE_NOTIFICATIONS,
  payload: notifications,
});

const fetchNotificationsSuccess = (notifications) => ({
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload: notifications,
  });
  
  const fetchNotificationsFailure = (error) => ({
    type: FETCH_NOTIFICATIONS_FAILURE,
    payload: error,
  });

  const replyNotificationSuccess = (message) => ({
    type: REPLY_NOTIFICATION_SUCCESS,
    payload: message,
  });
  
  const replyNotificationFailure = (error) => ({
    type: REPLY_NOTIFICATION_FAILURE,
    payload: error,
  });

  export const fetchNotifications = () => async (dispatch) => {
    // console.log("noti",userId);
    try {
      const userId =await AsyncStorage.getItem('userId');
      // console.log(userId,"notifications")

      const response = await axios.get(`${BASE_URL}/notifications/${userId}`);
  
      // Dispatch success action with retrieved data
      //  console.log(response.data,"jhhb")
      dispatch(fetchNotificationsSuccess(response.data));
    } catch (error) {
      console.error('Error retrieving user notifications:', error);
  
      // Dispatch failure action with the error
      dispatch(fetchNotificationsFailure('Error retrieving user notifications'));
    }
  };

  export const replyNotification = (userId, taskId, status, comment, startDate, endDate) => async (dispatch) => {
      // console.log("comment",comment)
    try {
      const response = await axios.post(`${BASE_URL}/notifications/reply`, {
        userId,
        taskId,
        status,
        comment, 
        startDate, 
        endDate,
      });
        // console.log("replay ",response.data)
      dispatch(replyNotificationSuccess(response.data.message));
      ToastAndroid.showWithGravity('Sent Successfully',
          ToastAndroid.CENTER,
          ToastAndroid.CENTER,
          200,
          200,
          )
    } catch (error) {
      console.error('Error replying to task notification:', error);
      dispatch(replyNotificationFailure('Internal Server Error'));
    }
  };


  export const modifyTask = (taskId, date, time, comment) => async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers like authorization tokens
        },
        body: JSON.stringify({ date, time, comment }),
      });
  
      if (response.ok) {
        const updatedTask = await response.json();
        dispatch({
          type: UPDATE_TASK_SUCCESS,
          payload: updatedTask,
        });
      } else {
        dispatch({
          type: UPDATE_TASK_FAILURE,
          error: 'Failed to modify task',
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_TASK_FAILURE,
        error: error.toString(),
      });
    }
  };

  export const updateNotification = (taskId, date, time, comment) => {
    return async dispatch => {
      try {
        const response = await axios.put(`${BASE_URL}/api/notifications/${taskId}`,
       date, time, comment);
        dispatch({
          type: UPDATE_NOTIFICATION_SUCCESS,
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: UPDATE_NOTIFICATION_FAILURE,
          payload: error.response ? error.response.data : 'Server Error'
        });
      }
    };
  };

  export const updateNotificationAction = (userId) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`${BASE_URL}/action/update/${userId}`);
        dispatch(updateNotificationsSuccess(response.data));
      } catch (error) {
        dispatch(updateNotificationsFailure(error)); 
      }
    };
  };
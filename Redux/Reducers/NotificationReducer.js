import {
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  REPLY_NOTIFICATION_SUCCESS,
  REPLY_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS_SUCCESS,
  UPDATE_NOTIFICATIONS_FAILURE,
  // FETCH_NOTIFICATIONS_SUCCESS
} from '../Action/NotificationAction'

const initialState = {
    notifications: [],
    notificationtasks: null,
    message: '',
    error: null,
    hasNotifications: false,
    notificationAction: [],
  };
  
  const notificationReducer = (state = initialState, action) => {
    // console.log(action.payload);
    switch (action.type) {

      case UPDATE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        error: null,
      };
    case UPDATE_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

      case UPDATE_NOTIFICATIONS:
      return {
        ...state,
        hasNotifications: action.payload,
      };

      case FETCH_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: action.payload,
          error: null,
        };
      case FETCH_NOTIFICATIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case REPLY_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null,
      };
    case REPLY_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        message: '',
        error: action.payload,
      };
      case UPDATE_NOTIFICATION_SUCCESS:
        return {
          ...state,
          loading: false,
          notification: action.payload,
          error: null
        };
      case UPDATE_NOTIFICATION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default notificationReducer;
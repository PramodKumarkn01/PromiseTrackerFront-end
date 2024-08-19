
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SET_USER_DATA,
  LOGOUT_USER,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  SET_TOKEN,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  FETCH_ALLUDATA_SUCCESS,
  FETCH_ALLUDATA_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../Action/UserAction';

const initialState = {
  user: null, 
  userData:null,
  token: null, 
  error: null, 
  role:null,
  alldata:null,
  usersDelete:[],
  userRole: null,
};

const userReducer = (state = initialState, action) => {
    // console.log(action.payload,'payload')
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        // token: action.payload.token, // Assuming your user object has a 'token' property
        error: null,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        userData: null,
        token: null,
        error: action.payload,
      }; 

    case SET_USER_DATA:

      return {
        ...state,
        userData: action.payload,
        error: null,
      };

    case LOGOUT_USER:
      return {
        ...state,
        userData:null,
        user: null,
        token: null,
        error: null,
        userRole: null,
      };

    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
      };

    case FETCH_USER_DATA_FAILURE:
      return {
        ...state,
        userData: null,
        error: action.payload,
      };
      case SET_TOKEN:
        return {
          ...state,
          token:action.payload,
          error:null,
        }
        case UPDATE_ROLE_SUCCESS:
          return {
            ...state,
            // loading: false,
            role: action.payload,
            error: null,
          };
        case UPDATE_ROLE_FAILURE:
          return {
            ...state,
            // loading: false,
            error: action.payload,
          };
          case FETCH_ALLUDATA_SUCCESS:
            return {
              ...state,
               alldata: action.payload, 
               error: false
               };
          case FETCH_ALLUDATA_FAILURE:
            return { 
              ...state, 
              error: true 
            };
            case DELETE_USER_SUCCESS:
            return {
                ...state,
               
                // usersDelete: state.users.filter(user => user._id !== action.payload),
                usersDelete:  action.payload, 
                error: false
            };
        case DELETE_USER_FAILURE:
            return { 
              ...state, 
               error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
 
import {
  CREATE_TASK_GROUP_SUCCESS,
  CREATE_TASK_GROUP_FAILURE,
  FETCH_TASK_GROUPS_SUCCESS,
  FETCH_TASK_GROUPS_FAILURE,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASK_STATUS_FAILURE,
  FETCH_COMPLETED_COUNT_SUCCESS,
  FETCH_COMPLETED_COUNT_FAILURE,
  FETCH_TASKS_COUNT_SUCCESS,
  FETCH_TASKS_COUNT_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_TASK_SUCCESS, 
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_GROUP_SUCCESS,
  UPDATE_TASK_GROUP_FAILURE,
} from '../Action/TaskAction';

const initialState = {
  // loading: false,
  task: [],
  taskGroup: null,
  completedCount: 0,
  totalCount: 0,
  cCount: 0,
  tCount: 0,
  update: [],
  updateTask: [],
  error: null,
};

const taskReducer = (state = initialState, action) => {
  // console.log("task",action.payload)
  switch (action.type) {
    case CREATE_TASK_GROUP_SUCCESS:
      return {
        ...state,
        taskGroup: action.payload,
        error: null,
      };
    case CREATE_TASK_GROUP_FAILURE:
      return {
        ...state,
        taskGroup: null,
        error: action.payload,
      };
    // case FETCH_TASK_GROUPS_SUCCESS:
    //   return {
    //     ...state,
    //     taskGroups: action.payload,
    //     loading: false,
    //   };
    // case FETCH_TASK_GROUPS_FAILURE:
    //   return {
    //     ...state,
    //     // loading: false,
    //     error: action.payload,
    //   };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        task: action.payload,
        error: null,
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        task: null,
        error: action.payload,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        task: action.payload,
        error: null,
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        task: null,
        error: action.payload,
      };
    case UPDATE_TASK_STATUS_SUCCESS:
      return {
        ...state,
        task: action.payload,
        error: null,
      };
    case UPDATE_TASK_STATUS_FAILURE:
      return {
        ...state,
        task: null,
        error: action.payload,
      };
    case 'FETCH_TASKS_COUNT_SUCCESS':
      return {
        ...state,
        completedCount: action.payload.completedCount,
        totalCount: action.payload.totalCount,
        error: null,
      };
    case 'FETCH_TASKS_COUNT_FAILURE':
      return {
        ...state,
        error: action.error,
      };
    case FETCH_TASKS_COUNT_SUCCESS:
      return {
        ...state,
        cCount: action.payload.cCount,
        tCount: action.payload.tCount,
      };
    case FETCH_TASKS_COUNT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        update: action.payload,
        error: null,
      };
    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      case UPDATE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          updateTask: action.payload,
          error: null,
        };
      case UPDATE_TASK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    case UPDATE_TASK_GROUP_FAILURE:
      return {
        ...state,
        taskGroup: null,
        error: action.payload,
      };
    case UPDATE_TASK_GROUP_SUCCESS:
      return {
        ...state,
        taskGroup: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default taskReducer;

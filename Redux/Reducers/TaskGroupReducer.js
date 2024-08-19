import {
  DELETE_TGROUP_SUCCESS,
  DELETE_TGROUP_FAILURE,
  FETCH_TASK_GROUPS_SUCCESS,
  FETCH_TASK_GROUPS_FAILURE,
} from '../Action/TaskGroupaction';

const initialState = {
  loading: false,
  Tgroup: null,
  TGroup:null,
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_TGROUP_SUCCESS:
      return {
        ...state,
        // loading: false,
        // Tgroup: state.tasks.filter(task => task.id !== action.payload),
        Tgroup: action.payload,
        error: null,
      };
    case DELETE_TGROUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_TASK_GROUPS_SUCCESS:
      return {
        ...state,
        TGroup: action.payload,
        loading: false,
      };
    case FETCH_TASK_GROUPS_FAILURE:
      return {
        ...state,
        // loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tasksReducer;

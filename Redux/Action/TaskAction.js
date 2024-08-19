// taskGroupActions.js

import {ToastAndroid} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CREATE_TASK_GROUP_REQUEST = 'CREATE_TASK_GROUP_REQUEST';
export const CREATE_TASK_GROUP_SUCCESS = 'CREATE_TASK_GROUP_SUCCESS';
export const CREATE_TASK_GROUP_FAILURE = 'CREATE_TASK_GROUP_FAILURE';
// export const FETCH_TASK_GROUPS_SUCCESS = 'FETCH_TASK_GROUPS_SUCCESS';
// export const FETCH_TASK_GROUPS_FAILURE = 'FETCH_TASK_GROUPS_FAILURE';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const UPDATE_TASK_STATUS_SUCCESS = 'UPDATE_TASK_STATUS_SUCCESS';
export const UPDATE_TASK_STATUS_FAILURE = 'UPDATE_TASK_STATUS_FAILURE';
export const FETCH_COMPLETED_COUNT_SUCCESS = 'FETCH_COMPLETED_COUNT_SUCCESS';
export const FETCH_COMPLETED_COUNT_FAILURE = 'FETCH_COMPLETED_COUNT_FAILURE';
// export const FETCH_TASKSGROUP_COUNT_FAILUR = 'FETCH_TASKSGROUP_COUNT_FAILUR';
// export const FETCH_TASKSGROUP_COUNT_FAILURE = 'FETCH_TASKSGROUP_COUNT_FAILURE';
export const FETCH_TASKS_COUNT_SUCCESS = 'FETCH_TASKS_COUNT_SUCCESS';
export const FETCH_TASKS_COUNT_FAILURE = 'FETCH_TASKS_COUNT_FAILURE';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAIL = 'UPDATE_CATEGORY_FAIL';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const UPDATE_TASK_GROUP_SUCCESS = 'UPDATE_TASK_GROUP_SUCCESS';
export const UPDATE_TASK_GROUP_FAILURE = 'UPDATE_TASK_GROUP_FAILURE';

import {BASE_URL} from '../../Config';
export const updateTaskGroupSuccess = taskGroup => ({
  type: UPDATE_TASK_GROUP_SUCCESS,
  payload: taskGroup,
});

export const updateTaskGroupFailure = error => ({
  type: UPDATE_TASK_GROUP_FAILURE,
  payload: error,
});

const updateCategorySuccess = taskGroups => ({
  type: UPDATE_CATEGORY_SUCCESS,
  payload: taskGroups,
});

const updateCategoryFail = error => ({
  type: UPDATE_CATEGORY_FAIL,
  payload: error,
});

const fetchTasksCountSuccess = data => ({
  type: FETCH_TASKSGROUP_COUNT_SUCCESS,
  payload: {data},
});

const fetchTasksCountFailure = error => ({
  type: FETCH_TASKSGROUP_COUNT_FAILURE,
  payload: {error},
});

export const fetchCompletedtaskSuccess = count => ({
  type: FETCH_COMPLETED_COUNT_SUCCESS,
  payload: count,
});

export const fetchCompletedtaskFailure = error => ({
  type: FETCH_COMPLETED_COUNT_SUCCESS,
  payload: error,
});

export const createTaskGroupSuccess = taskGroup => ({
  type: CREATE_TASK_GROUP_SUCCESS,
  payload: taskGroup,
});

export const createTaskGroupFailure = error => ({
  type: CREATE_TASK_GROUP_FAILURE,
  payload: error,
});

// export const fetchTaskGroupsSuccess = taskGroups => ({
//   type: FETCH_TASK_GROUPS_SUCCESS,
//   payload: taskGroups,
// });

// export const fetchTaskGroupsFailure = error => ({
//   type: FETCH_TASK_GROUPS_FAILURE,
//   payload: error,
// });

export const addTaskSuccess = task => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});
export const addTaskFailure = error => ({
  type: ADD_TASK_FAILURE,
  payload: error,
});

export const fetchTaskssuccess = task => ({
  type: FETCH_TASKS_SUCCESS,
  payload: task,
});

export const fetchTasksFailure = error => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

const updateTaskStatusSuccess = task => ({
  type: UPDATE_TASK_STATUS_SUCCESS,
  payload: task,
});

const updateTaskStatusFailure = error => ({
  type: UPDATE_TASK_STATUS_FAILURE,
  error,
});

// export const createTaskGroup = (groupName, icon, members) => {
//   return async dispatch => {
//     console.log('Ad', groupName, icon, members);
//     try {
//       if (!groupName || !icon || !members) {
//         ToastAndroid.showWithGravity(
//           'Please fill in all fields',
//           ToastAndroid.CENTER,
//           ToastAndroid.CENTER,
//           200,
//           200,
//         );
//         return;
//       }
//       const response = await fetch(`${BASE_URL}/TGroups`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({groupName, icon, members}),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error);
//       }

//       const result = await response.json();
//       console.log(result);
//       dispatch(createTaskGroupSuccess(result));
//       ToastAndroid.showWithGravity(
//         'Task Group added sucessfully',
//         ToastAndroid.CENTER,
//         ToastAndroid.CENTER,
//         200,
//         200,
//       );
//     } catch (error) {
//       console.error('Error creating task group1:', error.message);
//       dispatch(createTaskGroupFailure(error.message));
//     }
//   };
// };
export const createTaskGroup = (
  groupName,
  deptHead,
  projectLead,
  members,
  profilePic,
) => {
  // console.log('Add Tasks', groupName,deptHead,projectLead,members,profilePic);
  return async dispatch => {
    // console.log('Add Tasks', profilePic,groupName,deptHead,projectLead,members,);
    try {
      if (!groupName || !members) {
        ToastAndroid.showWithGravity(
          'Please fill in all fields',
          ToastAndroid.CENTER,
          ToastAndroid.CENTER,
          200,
          100,
        );
        return;
      }
      const response = await fetch(`${BASE_URL}/TGroups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profilePic,
          groupName,
          deptHead,
          projectLead,
          members,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      
      const result = await response.json();
      // console.log('res', result);
      dispatch(createTaskGroupSuccess(result));
      ToastAndroid.showWithGravity(
        'Task Group added sucessfully',
        ToastAndroid.CENTER,
        ToastAndroid.CENTER,
        200,
        200,
      );
    } catch (error) {
      console.error('Error creating task group1:', error.message);
      dispatch(createTaskGroupFailure(error.message));
    }
  };
};
// export const fetchTaskGroups = () => {
//   return async dispatch => {
//     try {
//       const response = await fetch(`${BASE_URL}/TGroups`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error);
//       }

//       const data = await response.json();
//       dispatch(fetchTaskGroupsSuccess(data));
//     } catch (error) {
//       console.error('Error fetching task groups:', error.message);
//       dispatch(fetchTaskGroupsFailure(error.message));
//     }
//   };
// };
export const addTask = taskData => async dispatch => {
  // console.log(taskData, 'pinaki');
  try {
    const formData = new FormData();
    for (const key in taskData) {
      if (taskData.hasOwnProperty(key)) {
        if (key === 'pdfFile' && taskData[key]) {
          formData.append(key, {
            uri: taskData[key].uri,
            type: 'application/pdf',
            name: taskData[key].name,
          });
        }
        else if (key === 'owner') {
          const owner = taskData[key];
          formData.append('owner[id]', owner.id);
          formData.append('owner[name]', owner.name);
          formData.append('owner[profilePic]', owner.profilePic);
        } else if (key === 'people') {
          const people = taskData[key];
          people.forEach((person, index) => {
            formData.append(`people[${index}][id]`, person.id);
            formData.append(`people[${index}][name]`, person.name);
            formData.append(`people[${index}][userId]`, person.userId);
          });
        }else if (key === 'taskGroup') {
          const taskGroup = taskData[key];
          formData.append('taskGroup[groupName]', taskGroup.groupName);
          formData.append('taskGroup[groupId]', taskGroup.groupId)
        }
         else {
          formData.append(key, taskData[key]);
        }
      }
    }

    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        // Do not set 'Content-Type' header for FormData
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data, 'task');
      const dataArray = Array.isArray(data) ? data : [data];
      dispatch(addTaskSuccess(dataArray));
      dispatch(fetchTasks())
      console.log('Task added successfully');
      ToastAndroid.showWithGravity(
        'Successfully Added',
        ToastAndroid.CENTER,
        ToastAndroid.CENTER,
        200,
        200,
      );
      //dispatching fetch task
      // dispatch(fetchTasks());
      // fetchTasks()
    } else {
      dispatch(addTaskFailure());
      console.error('Error adding task:', response.statusText);
    }
  } catch (error) {
    dispatch(addTaskFailure());
    console.error('Error adding task:', error.message);
  }
};

export const fetchTasks = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      // console.log('calling fetch task')
      // console.log('data.lenght', data[10])
      dispatch(fetchTaskssuccess(data));
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      dispatch(fetchTasksFailure(error.message));
    }
  };
};

export const updateTaskStatus = (taskId, selectedStatus) => async dispatch => {
  try {
    // if (!selectedStatus || !selectedProject || !selectedProject._id) {
    //   throw new Error('Selected status or taskId is not defined');
    // }

    // const taskId = selectedProject._id;

    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status: selectedStatus}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const dataArray = Array.isArray(data) ? data : [data];
    dispatch(updateTaskStatusSuccess(dataArray));
    ToastAndroid.showWithGravity(
      'Status Updated',
      ToastAndroid.CENTER,
      ToastAndroid.CENTER,
      200,
      200,
    );
  } catch (error) {
    console.error('Error:', error.message);
    dispatch(updateTaskStatusFailure(error.message));
  }
};

// export const fetchCompletedTasksCount = () => async dispatch => {
//   try {
//     const response = await fetch(`${BASE_URL}/countCompletedTasks`);
//     const data = await response.json();
//     dispatch({
//       type: 'FETCH_TASKS_COUNT_SUCCESS',
//       payload: {
//         completedCount: data.completedCount,
//         totalCount: data.totalCount,
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching task counts:', error.message);
//     dispatch({
//       type: 'FETCH_TASKS_COUNT_FAILURE',
//       error: error.message,
//     });
//   }
// };

export const fetchCompletedTasksCount = userId => async dispatch => {
  try {
    // if (!userId) {
    //   throw new Error('UserId is required');
    // }
    const userId = await AsyncStorage.getItem('userId');
    // console.log(userId,"userId")

    const response = await fetch(`${BASE_URL}/countCompletedTasks/${userId}`);
    const data = await response.json();
    // console.log(data,"data")
    dispatch({
      type: FETCH_TASKS_COUNT_SUCCESS,
      payload: {
        completedCount: data.completedCount,
        totalCount: data.totalCount,
      },
    });
  } catch (error) {
    console.error('Error fetching task counts:', error.message);
    dispatch({
      type: 'FETCH_TASKS_COUNT_FAILURE',
      error: error.message,
    });
  }
};

// export const fetchCompletedTasksCount = (userId) => async dispatch => {
//   try {
//     // Update the URL to include the userId parameter in the request
//     const response = await fetch(`${BASE_URL}/countCompletedTasks/${userId}`);
//     const data = await response.json();
//     dispatch({
//       type: 'FETCH_TASKS_COUNT_SUCCESS',
//       payload: {
//         completedCount: data.completedCount,
//         totalCount: data.totalCount,
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching task counts:', error.message);
//     dispatch({
//       type: 'FETCH_TASKS_COUNT_FAILURE',
//       error: error.message,
//     });
//   }
// };

// export const fetchTasksCountByGroup = (taskGroupName) => {
//   return dispatch => {
//       axios.get(`${BASE_URL}/countTasksByGroup/${taskGroupName}`);
//       const data = await response.json();
//           .then(response => {
//               dispatch(fetchTasksCountSuccess(response.data));
//           })
//           .catch(error => {
//               dispatch(fetchTasksCountFailure(error));
//           });
//   };
// };

// export const fetchTasksCountByGroup = () => async (taskGroupName) => {
//   console.log(taskGroupName,"groupnamr")
//   try {
//     const response = await fetch(`${BASE_URL}/countTasksByGroup/${taskGroupName}`);
//     const data = await response.json();
//     dispatch({
//       type: 'FETCH_TASKSGROUP_COUNT_SUCCESS',
//       payload: { completedCount: data.completedCount, totalCount: data.totalCount },
//     });

//   } catch (error) {
//     console.error('Error fetching task counts:', error.message);
//     dispatch({
//       type: 'FETCH_TASKSGROUP_COUNT_FAILURE',
//       error: error.message,
//     });
//   }
// };

export const fetchTasksCount = taskGroupName => async dispatch => {
  try {
    const response = await fetch(
      `${BASE_URL}/countTasksByGroup/${taskGroupName}`,
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }
    const data = await response.json();
    dispatch({type: FETCH_TASKS_COUNT_SUCCESS, payload: data});
  } catch (error) {
    console.error('Error fetching grouptask counts:', error.message);
    dispatch({type: FETCH_TASKS_COUNT_FAILURE, payload: error.message});
  }
};

export const updateCategory =
  (taskId, category, status, remark) => async dispatch => {
    // Assuming updateCategoryStart, updateCategorySuccess, and updateCategoryFail are action creators
    // dispatch(updateCategoryStart());

    console.log('update', taskId, category, status, remark);
    try {
      const response = await axios.put(
        `${BASE_URL}/category/${taskId}`,
        {
          category,
          status,
          remark,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      dispatch(updateCategorySuccess(response.data));
      // console.log(response.data, 'update');
    } catch (error) {
      // Enhanced error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
      dispatch(updateCategoryFail(error.message));
    }
  };
// export const updateTask = (taskId, taskUpdates) => async dispatch => {
//   console.log('Accept and mof', taskId, taskUpdates);
//   try {
//     const response = await axios.put(
//       `${BASE_URL}/tasks/update/${taskId}`,
//       taskUpdates,
//     );
//     dispatch({
//       type: UPDATE_TASK_SUCCESS,
//       payload: response.data,
//     });
//     console.log(response.data);
//   } catch (error) {
//     dispatch({
//       type: UPDATE_TASK_FAIL,
//       payload: error.response
//         ? error.response.data
//         : 'Could not connect to the server',
//     });
//   }
// };

export const updateTaskGroup = (
  TGroupId,
  groupName,
  profilePic,
  deptHead,
  projectLead,
  members,
) => {
  // console.log('data', TGroupId, groupName, members, profilePic);

  return async dispatch => {
    // dispatch(updateTaskGroupRequest());
    // const profilePic = profile;
    try {
      // if (!TGroupId || !groupName || !members) {
      //   ToastAndroid.showWithGravity(
      //     'Please fill in all fields',
      //     ToastAndroid.CENTER,
      //     ToastAndroid.CENTER,
      //     200,
      //     200,
      //   );
      // return;
      // }

      const response = await fetch(`${BASE_URL}/TGroup/${TGroupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TGroupId,
          groupName,
          profilePic,
          deptHead,
          projectLead,
          members,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const result = await response.json();
      dispatch(updateTaskGroupSuccess(result));
      // console.log(result,"result")
      ToastAndroid.showWithGravity(
        ' Updated Successfully',
        ToastAndroid.CENTER,
        ToastAndroid.CENTER,
        200,
        200,
      );
    } catch (error) {
      console.error('Error updating task group:', error.message);
      dispatch(updateTaskGroupFailure(error.message));
    }
  };
};
export const updateTask = (taskId, taskDetails) => async dispatch => {
  // dispatch({ type: UPDATE_TASK_START });
  // console.log(taskId, taskDetails,"updateddetails ")
  try {
    const response = await fetch(`${BASE_URL}/updatetasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskDetails),
    });

    if (!response.ok) {
      throw new Error('Task not found or error updating task');
    }

    const updatedTask = await response.json();
    console.log(updatedTask, 'taskudated');
    dispatch({type: UPDATE_TASK_SUCCESS, payload: updatedTask});
  } catch (error) {
    dispatch({type: UPDATE_TASK_FAILURE, payload: error.message});
  }
};

// // index.js (where you combine reducers)

// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import userReducer from '../Reducers/UserLogin';
// import { configureStore } from '@reduxjs/toolkit';
// import { thunk } from 'redux-thunk';
// import userSetReducer from '../Reducers/UserSetR';

// // const rootReducer = combineReducers({
// //   user: userReducer,
// //   // Add other reducers if needed
// // });

// const store = createStore(userReducer,userSetReducer, applyMiddleware(thunk));

// export default store;
 
import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import userReducer from '../Reducers/UserReducer';
import taskReducer from '../Reducers/TaskReducers';
import notificationReducer from '../Reducers/NotificationReducer';
import TaskGroupReducer from '../Reducers/TaskGroupReducer';
const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
  notifications: notificationReducer,
  TGgroup:TaskGroupReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import store from './Redux/Store/Store'
const MainApp = () => {
  return (
    <Provider store={store}>
        <App/>
    </Provider>
  )
}

export default MainApp
const styles = StyleSheet.create({})
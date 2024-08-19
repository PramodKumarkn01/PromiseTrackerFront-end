import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
const logo = require('../Images/logo.gif');
const WCscree = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Signup');
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <FastImage
            source={logo}
            style={{height: 250, width: 150}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.Text}>PROMISE TRACKER</Text>
        <Text style={styles.text1}>
          This productive tool is designed to help you better manage your task
          project-wise conveniently
        </Text>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            backgroundColor: '#EA791D',
            padding: 20,
            borderRadius: 10,
            fontSize: 16,
            marginTop: 30,
            width: '90%',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 500,
              fontSize: 25,
              textAlign: 'center',
              // marginTop:10,
            }}>
            Get started
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default WCscree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  Text: {
    fontSize: 30,
    color: 'black',
    marginBottom: 10,
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily:'sans-serif'
  },
  text1: {
    paddingHorizontal: 55,
    color: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500',
  },
});

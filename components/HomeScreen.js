import React, {  Component, useState, useEffect } from 'react';
import { PermissionsAndroid, Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraScreen } from './CameraScreen';
import { ChatScreen } from './User/ChatScreen';
import { ProfileScreen } from './User/ProfileScreen';
import Swiper from 'react-native-swiper';
import { Camera, CameraType, FlashMode } from 'expo-camera';

export function HomeScreen({ navigation }) {
  const [User, setUser] = useState();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };



  AsyncStorage.getItem("user").then((value) => {
    setUser(value);
    console.log(value);
  })

  if (User) {
    requestCameraPermission();
    return (
      <Swiper 
      index={1} 
      showsPagination={false} 
      loop={false}
      >
          <ChatScreen/>     
          <CameraScreen/>     
          <ProfileScreen/>
      </Swiper>
    )
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Inscription"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Connexion"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}
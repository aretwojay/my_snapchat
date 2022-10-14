import React, {  Component, useState, useEffect } from 'react';
import { PermissionsAndroid, Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraScreen } from './CameraScreen';
import { ChatScreen } from './User/ChatScreen';
import { ProfileScreen } from './User/ProfileScreen';
import Swiper from 'react-native-web-swiper';
import { Camera, CameraType, FlashMode } from 'expo-camera';

export function HomeScreen({ navigation }) {
  const [User, setUser] = useState();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  
  AsyncStorage.getItem("user").then((value) => {
    setUser(value);
    console.log(value);
  })

  if (User) {

    return (
      <Swiper 
      from={0} 
      loop={false}
      controlsEnabled={false}
      minDistanceForAction={0.15}
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
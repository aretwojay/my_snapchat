import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export function ProfileScreen() {
  const navigation = useNavigation(); 

  Camera.requestCameraPermissionsAsync().then((value) => {
    console.log(value);
  });

  function logout() {
    AsyncStorage.removeItem("user").then((value) => {
      navigation.replace("Home");
    });

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Déconnexion"
        onPress={logout}
      />
    </View>
  );
}
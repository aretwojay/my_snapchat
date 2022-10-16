import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Icon, Text, View, SafeAreaView, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraScreen } from './CameraScreen';
import { ChatScreen } from './User/ChatScreen';
import { ProfileScreen } from './User/ProfileScreen';
import Swiper from 'react-native-web-swiper';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen() {
  const [User, setUser] = useState();
  const navigation = useNavigation();
  AsyncStorage.getItem("user").then((value) => {
    setUser(value);
  })

  if (User) {

    return (
      <Swiper
        from={1}
        loop={false}
        controlsEnabled={false}
        minDistanceForAction={0.15}
      >
        <ChatScreen />
        <CameraScreen />
        <ProfileScreen />
      </Swiper>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#ffd600" ,alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontWeight: "bold"}}>My_Snapchat</Text>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textBtn}>Inscription</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textBtn}>Connexion</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  btnRegister: {
    backgroundColor: "#2986CC",
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  btnLogin: {
    backgroundColor: "#B20000",
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  textBtn: {
    alignSelf: "center",
    color: "#ffffff",
    textTransform: "uppercase"
  }
});
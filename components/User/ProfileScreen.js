import React, { Component, useState } from 'react';
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export function ProfileScreen() {
  const navigation = useNavigation();
  const [User, setUser] = useState();

  AsyncStorage.getItem("user").then((value) => {
    setUser(value);
  })

  function logout() {
    AsyncStorage.removeItem("user").then((value) => {
      navigation.replace("Home");
    });

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#ffd600" }}>
      <Text style={{ marginBottom: 5 }}>
          {User && JSON.parse(User).email}
          </Text>
      <Button
        title="Déconnexion"
        onPress={logout}
      />
    </View>
  );
}


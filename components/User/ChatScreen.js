import React, { Component, useState } from 'react';
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ChatScreen({ navigation }) {
    const [User, setUser] = useState();


    AsyncStorage.getItem("user").then((value) => {
      setUser(value);
    })

    
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Chat Screen</Text>
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
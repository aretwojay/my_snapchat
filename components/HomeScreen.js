import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export function HomeScreen({ navigation }) {
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
import React, { Component, useState } from 'react';
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export function ChatScreen({ navigation }) {
    const [User, setUser] = useState();

    AsyncStorage.getItem("user").then((value) => {
        setUser(value);
        axios.get('http://snapi.epitech.eu:8000/all', {
            headers: {
                token: JSON.parse(value).token
            }
        })
            .then(function (response) {
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    })



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Chat Screen</Text>
        </View>
    );
}
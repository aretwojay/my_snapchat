import React, { FC, ReactElement, useState } from "react";
import { Button, StyleSheet, TextInput, View, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({navigation}) => {


    const doUserLogin = () => {

        axios.post('http://snapi.epitech.eu:8000/connection', {
            email: email,
            password: password
        })
            .then(function (response) {
                AsyncStorage.setItem("user", JSON.stringify(response.data.data)).then((value) => {
                    AsyncStorage.getItem("user").then((value) => {
                        console.log(value);
                        navigation.replace("Home");
                    })
                })


            })
            .catch(function (error) {
                if (email == "" || password == "") {
                    msg = "Veuillez remplir l'un des champs."
                }
                else {
                    msg = "Vos identifiants sont incorrects."
                }
                Alert.alert("Erreur",
                    msg,
                    [
                        {
                            text: "Annuler",
                            style: "cancel"
                        },
                        { text: "OK" }
                    ]);

            });
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
                style={styles.input}
                value={email}
                placeholder={"Email"}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize={"none"}
            />
            <TextInput
                autoCapitalize={"none"}
                style={styles.input}
                value={password}
                placeholder={"Password"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <Button title={"Se connecter"} onPress={doUserLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});
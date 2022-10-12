import React, { FC, ReactElement, useState } from "react";
import { Button, StyleSheet, TextInput, View, Alert } from "react-native";
import axios from "axios";

export const RegisterScreen = ({ navigation }) => {
    const doUserRegistration = () => {

        axios.post('http://snapi.epitech.eu:8000/inscription', {
            email: email,
            password: password
        })
            .then(function (response) {
                Alert.alert("Bienvenue !",
                    "Connectez-vous pour poursuivre l'aventure !",
                    [
                        {
                            text: "Annuler",
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => navigation.navigate('Login')}
                    ]
                );
            })
            .catch(function (error) {
                if (email == "" || password == "") {
                    msg = "Veuillez remplir l'un des champs."
                }
                else {
                    msg = "Cet email est déjà pris."
                }
                Alert.alert("Erreur",
                    msg,
                    [
                        {
                            text: "Annuler",
                            style: "cancel"
                        },
                        { text: "OK" }
                    ]
                );
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
                style={styles.input}
                value={password}
                placeholder={"Password"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <Button title={"S'inscrire"} onPress={doUserRegistration} />
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
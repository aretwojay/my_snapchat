import React, { FC, ReactElement, useState } from "react";
import { Button, StyleSheet, TextInput, View, Alert } from "react-native";
import axios from "axios";

export const RegisterScreen = ({ navigation }) => {

    function AlertError(title, msg) {
        Alert.alert(title,
            msg,
            [
                {
                    text: "Annuler",
                    style: "cancel",
                    onPress: () => navigation.goBack()
                },
                { text: "OK" }
            ]
        )
    }

    const doUserRegistration = () => {

        axios.post('http://snapi.epitech.eu:8000/inscription', {
            email: email,
            password: password
        })
            .then(function (response) {
                if (confirmPassword == "") {
                    AlertError("Erreur", "Veuillez remplir l'un des champs.");
                }
                else if (password !== confirmPassword) {
                    AlertError("Erreur", "Les mots de passe ne correspondent pas.");
                }
                else {
                    Alert.alert("Bienvenue !",
                        "Connectez-vous pour poursuivre l'aventure !",
                        [
                            { text: "OK",  onPress: () => navigation.navigate('Login')}
                        ]
                    );
                }

            })
            .catch(function (error) {
                if (email == "" || password == "") {
                    msg = "Veuillez remplir l'un des champs."
                }
                else {
                    msg = "Cet email est déjà pris."
                }
                AlertError("Erreur", msg);
            });
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
            <TextInput
                autoCapitalize={"none"}
                style={styles.input}
                value={confirmPassword}
                placeholder={"Confirm Password"}
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
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
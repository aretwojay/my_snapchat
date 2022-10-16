import React, { Component, useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Ionicons from '@expo/vector-icons/Ionicons';

export function ChatScreen({ navigation }) {
    const [User, setUser] = useState();
    const [Snaps, setSnaps] = useState({});
    var _ = require('lodash');

    useEffect(() => {
        if (User) {
            axios.get('http://snapi.epitech.eu:8000/snaps', {
                headers: {
                    token: User.token
                }
            })
                .then(function (response) {
                    setSnaps(response.data.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            AsyncStorage.getItem("user").then((value) => {
                setUser(JSON.parse(value));
            })
        }

    }, [User])

    if (Snaps) {
        const grouped = [_.groupBy(Snaps, snap => snap.from)];
        console.log(grouped);
    }


    return (
        <View style={{ flex: 1, paddingTop: 40 }}>
            {Object.values([_.groupBy(Snaps, snap => snap.from)])
                .map((snap, index) =>
                    <View style={styles.user} key={index}>
                        <Ionicons name="person" size={32} />
                        <View style={{paddingLeft: 5}}>
                            <Text key={index}>{Object.keys(snap)}</Text>
                            <Text>{Object.values(snap)[0] && Object.values(snap)[0].length} snap(s) reçu(s)</Text>
                        </View>
                    </View>
                )}
            {/* {Object.values(Snaps)
                .sort((a, b) => (a.snap_id > b.snap_id) ? 1 : -1)
                .map((snap, index) =>
                    <View style={styles.user} key={index}>
                        <Ionicons name="person" size={32} />
                        <Text key={index}>{snap.from}</Text>
                    </View>
            )}         */}
        </View>
    );

} const styles = StyleSheet.create({
    user: {
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: .3,
        padding: 20
    },
    searchBar: {
        margin: 10
    }
});
import React, { Component, useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Touchable } from 'react-native-web';

export function ChatScreen({ navigation }) {
    const [User, setUser] = useState();
    const [Snaps, setSnaps] = useState({});
    const [imageUri, setImageUri] = useState(0)
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

    function handlePress(email){
        const userSnaps = Snaps.filter((user) => user.from == email);
        console.log(userSnaps[0].snap_id);
        axios.get('http://snapi.epitech.eu:8000/snap/'+userSnaps[0].snap_id, {
            headers: {
                token: User.token
            }
        })
            .then(function (response) {
                console.log(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    const AllSnaps = () => (
        
        <View>
            {[_.groupBy(Snaps, snap => snap.from)]
            .map((snap, index) => {
                return (
                    <View key={index}>    
                        {Object.values(snap).map((sub, sIndex) => {
                            return (
                                <View style={styles.user} key={sIndex}>
                                    <Ionicons name="person" size={32} />
                                    <TouchableOpacity style={{paddingLeft:10, width:"100%"}} onPress={() => handlePress(sub[0].from)}>
                                        <Text>{sub[0].from}</Text>
                                        <Text>{Object.values(snap)[sIndex].length} snap(s) reçu(s)</Text>
                                    </TouchableOpacity>
                                </View>                            
                            )               
                        })}
                    </View>
                )
            })
        }
        </View>
    )

    return (
        <View style={{ flex: 1, paddingTop: 40 }}>
            {console.log(Snaps.length)}
            {Snaps.length > 0 ? (
                <AllSnaps/>
                        // <View style={styles.user} key={index}>
                        //     <Ionicons name="person" size={32} />
                        //     <TouchableOpacity style={{paddingLeft:10, width:"100%"}} onPress={handlePress}>
                        //         <Text key={index}>{Object.keys(snap)}</Text>
                        //         <Text>{Object.values(snap)[0] && Object.values(snap)[0].length} snap(s) reçu(s)</Text>
                        //     </TouchableOpacity>
                        // </View>
                    
                ) : (
                    <Text style={styles.center}>Vous n'avez aucun snaps reçus :(</Text>
                )
            }
        </View>
    );

} const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 300
    },
    user: {
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: .3,
        padding: 20
    },
});
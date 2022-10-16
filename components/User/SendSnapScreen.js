import React, { Component, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, AccessibilityAnnouncementFinishedEventHandler, Button, StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import SearchBar from "react-native-dynamic-search-bar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';

export function SendSnapScreen({route}) {
  const navigation = useNavigation();
  const [User, setUser] = useState();
  const [AllUsers, setAllUsers] = useState({});
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const { data } = route.params;

  useEffect(() => {
    if (User) {
      axios.get('http://snapi.epitech.eu:8000/all', {
        headers: {
          token: User.token
        }
      })
        .then(function (response) {
          setAllUsers(response.data.data)
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

  function send(user) {

    setLoading(true);
    console.log(User)
    MediaLibrary.createAssetAsync(data.uri).then((value) => {
      axios.post('http://snapi.epitech.eu:8000/snap', {
        duration: 5,
        to: user,
        image: value
      },{
        headers: {
          "Content-Type": "multipart/form-data",
          token: User.token,
        }
      })
      .then(function (response) {
        console.log(response.data)
        setLoading(false);
        console.log(value);
        Alert.alert(
          'Message',
          'Votre snap a bien été envoyé.',
          [
            {text: 'Retour au menu', onPress: () => navigation.replace("Home")},
            {text: 'OK'},
          ],
          { cancelable: false }
        )
        MediaLibrary.deleteAssetsAsync(value);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        Alert.alert(
          'Erreur',
          'Veuillez réessayer.',
          [
            {text: 'Retour au menu', onPress: () => navigation.replace("Home")},
            {text: 'OK'},
          ],
          { cancelable: false }
        )
      });
    })
    console.log(user)
  }

  return (
    <View style={styles.container}>
     {!loading ? (
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.header}>
          <Text style={styles.heading}>
            Envoyer un snap
          </Text>
          <SearchBar
            style={styles.searchBar}
            autoCapitalize={"none"}
            placeholder="Rechercher un utilisateur"
            onChangeText={(text) => setFilter(text)}
          />
        </View>
        {Object.values(AllUsers)
          .sort((a, b) => (a.email > b.email) ? 1 : -1)
          .filter((user) => {
            const UserEmailLower = user.email.toLowerCase();
            if (filter)
              return UserEmailLower.startsWith(filter.toLowerCase());
          })
          .map((user, index) =>
            <View key={index}>
              {user.email == User.email ? (
                <Text style={styles.user} key={index} onPress={() => send(user.email)}>{user.email} (moi)</Text>
              ) : (
                <Text style={styles.user} key={index} onPress={() => send(user.email)}>{user.email}</Text>
              )}
            </View>
          )}
      </ScrollView>
     ) : (
            <View style={styles.container}>
              <ActivityIndicator style={{top:0}} size="large" />
            </View>
     )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  },
  header:{
    backgroundColor: "white",
    height: "auto",
  },
  heading: {
    marginTop: 30,
    paddingLeft:20,
    fontSize: 25,
    fontWeight: "bold",
  },
  user: {
    marginVertical: 4,
    marginHorizontal: 3,
    padding: 20,
    width: "100%",
    borderRadius: 7,
    borderBottomWidth: 1
  },
  searchBar: {
    margin: 10,
    borderWidth: .2,
  }
});
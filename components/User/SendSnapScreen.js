import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import SearchBar from "react-native-dynamic-search-bar";

export function SendSnapScreen({route}) {
  const [User, setUser] = useState();
  const [AllUsers, setAllUsers] = useState({});
  const [filter, setFilter] = useState("");
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
    axios.post('http://snapi.epitech.eu:8000/snap', {
        duration: 5,
        to: user,
        image: data
      }
    ,{
      headers: {
        "Content-Type": "multipart/form-data",
        token: User.token,
      }
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(user)
  }

  return (
    <ScrollView>
      <SearchBar
        style={styles.searchBar}
        autoCapitalize={"none"}
        placeholder="Search here"
        onChangeText={(text) => setFilter(text)}
      />
      {Object.values(AllUsers)
        .sort((a, b) => (a.email > b.email) ? 1 : -1)
        .filter((user) => {
          const UserEmailLower = user.email.toLowerCase();
          if (filter)
            return UserEmailLower.startsWith(filter.toLowerCase());
        })
        .map((user, index) =>
          <View style={styles.user} key={index}>
            {user.email == User.email ? (
              <Text key={index} onPress={() => send(user.email)}>{user.email} (moi)</Text>
            ) : (
              <Text key={index} onPress={() => send(user.email)}>{user.email}</Text>
            )}
          </View>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  user: {
    borderWidth: .3,
    padding: 10
  },
  searchBar: {
    margin: 10
  }
});
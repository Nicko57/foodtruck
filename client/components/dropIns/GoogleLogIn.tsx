import * as Google from 'expo-google-app-auth';
import React, { useState, useEffect } from 'react';
import {
  View, Button, StyleSheet, AsyncStorage,
} from 'react-native';

import axios from 'axios';
import LogOut from '../screens/LogOut';

export default function GoogleLogIn({
  setIsUserLoggedIn,
  setIsTruckOwnerLoggedIn,
  accessToken,
  setAccessToken,
}) {
  // const [accessToken, setAccessToken] = useState('');

  // useEffect(() => {
  //   console.log(accessToken);
  // }, [accessToken]);

  const userConfig = {
    iosClientId: process.env.EXPO_iosClientId,
    androidClientId: process.env.EXPO_androidClientId,
    scopes: ['profile', 'email'],
  };

  const truckConfig = {
    iosClientId: process.env.EXPO_iosClientId,
    androidClientId: process.env.EXPO_androidClientId,
    scopes: ['profile', 'email'],
  };

  const storeData = async(dataKey, dataValue) => {
    try {
      await AsyncStorage.setItem(
        dataKey,
        dataValue,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveData = async() => {
    try {
      let value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        // We have data!!
        value = JSON.parse(value);
        // console.log(value.user.id);
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  async function signUserInWithGoogleAsync(configuration: Object) {
    try {
      const result = await Google.logInAsync(configuration);
      if (result.type === 'success') {
        // setAccessToken(result.accessToken);
        storeData('userData', JSON.stringify(result));
        setIsUserLoggedIn(true);

        axios.post(`${process.env.EXPO_LocalLan}/user/new`, {
          fullName: result.user.name,
          googleId: result.user.id,
          profilePhotoUrl: result.user.photoUrl,
        })
          .then((response) => {
            console.log('response.data', response.data);
          })
          .catch((err) => console.error(err));
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }

  async function signTruckInWithGoogleAsync(configuration: Object) {
    try {
      const result = await Google.logInAsync(configuration);
      if (result.type === 'success') {
        setAccessToken(result.accessToken);
        setIsTruckOwnerLoggedIn(true);

        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }

  const userSignIn = () => {
    signUserInWithGoogleAsync(userConfig);
  };

  const truckSignIn = () => {
    signTruckInWithGoogleAsync(truckConfig);
  };

  // const logOut = async() => {
  //   const logOutConfig = {
  //     iosClientId: process.env.EXPO_iosClientId,
  //     androidClientId: process.env.EXPO_androidClientId,
  //   };

  //   await Google.logOutAsync({ accessToken, ...logOutConfig });
  //   console.log(accessToken);
  //   setAccessToken('');
  //   setIsUserLoggedIn(false);
  //   setIsTruckOwnerLoggedIn(false);
  //   console.log('you have been logged out');
  // };

  return (
    <View style={styles.container}>
      <View>
        <Button title="Google User Sign In" onPress={userSignIn} />
        <Button title="get asyncstorage" onPress={retrieveData} />
      </View>
      <View>
        <Button title="Google Truck Owner Sign In" onPress={truckSignIn} />
      </View>
      <View>
        <LogOut
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          setIsUserLoggedIn={setIsUserLoggedIn}
          setIsTruckOwnerLoggedIn={setIsTruckOwnerLoggedIn}
        />
        {/* <Button title="logout" onPress={logOut} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

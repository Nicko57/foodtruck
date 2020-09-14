import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Button, Switch,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import axios from 'axios';

const TruckOwnerProfile = ({ navigation, route }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [truckName, setTruckName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [logo, setlogo] = useState('');
  const [foodGenre, setFoodGenre] = useState('');
  const [blurb, setBlurb] = useState('');
  const [starAverage, setStarAverage] = useState(null);
  const [numberOfReview, setNumberOfReviews] = useState(null);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [openStatus, setOpenStatus] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getData = async() => {
      await axios.get(`${process.env.EXPO_LocalLan}/truck/login/${route.params.googleId}`)
        .then((response) => {
          setTruckName(response.data.full_name);
          setPhoneNumber(response.data.phone_number);
          setQrCode(response.data.qrCode);
          setlogo(response.data.logo);
          setFoodGenre(response.data.food_genre);
          setBlurb(response.data.blurb);
          setStarAverage(response.data.starAverage);
          setNumberOfReviews(response.data.number_of_review);
          setOpenTime(response.data.open_time);
          setCloseTime(response.data.close_time);
          setOpenStatus(response.data.open_status);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
        })
        .catch((err) => console.error('error in profile catch', err));
    };
    getData();
  }, []);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View>
      <Switch
        trackColor={{ false: '767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>{truckName}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('TruckOwnerProfileEdit')}> Click</Button>
      <Button
        title="Logout"
        onPress={() => {
          navigation.navigate('LogIn',
            { previous_screen: 'LogOut' });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TruckOwnerProfile;

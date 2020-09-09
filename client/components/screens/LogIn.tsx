import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import GoogleLogIn from '../dropIns/GoogleLogIn';
import RootDrawerNavigator from '../routes/drawer';
import TruckOwnerProfile from './truckOwnerProfile';
import PushNotifications from '../dropIns/PushNotifications';

export default function LogIn() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isTruckOwnerLoggedIn, setIsTruckOwnerLoggedIn] = useState(false);

  return (
    <><><PushNotifications /></>
      <>
        { (!isUserLoggedIn && !isTruckOwnerLoggedIn) && (
        <GoogleLogIn
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          isTruckOwnerLoggedIn={isTruckOwnerLoggedIn}
          setIsTruckOwnerLoggedIn={setIsTruckOwnerLoggedIn}
        />
        )}
      </>
      <>
        { isUserLoggedIn && <RootDrawerNavigator /> }
        { isTruckOwnerLoggedIn && <TruckOwnerProfile /> }
      </>
    </>
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

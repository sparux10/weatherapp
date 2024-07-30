// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import splash from '../assets/splash.png'

const SplashScreenComponent = ({ onFinish }) => {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        onFinish();
      }, 5000); 
    }

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={splash} style={styles.image} />
      <Text style={styles.text}>Welcome to My App</Text>
      <Text style={styles.text2}>by Sparux</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
  },
  text2: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 300,
  },
});

export default SplashScreenComponent;

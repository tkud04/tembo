import React from 'react';
import {StatusBar, StyleSheet, Dimensions, Pressable, View, Text, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';







const SplashScreen = () => {
	return (
	 <View style={styles.container}>
	  <Image source={require('../assets/logo.png')}  style={{ height: Dimensions.get('window').height }}/>
	  </View>	
	);
}

const styles = StyleSheet.create({

  container: {
	   flex: 1
  }
});

export default SplashScreen;

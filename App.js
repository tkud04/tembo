import 'react-native-gesture-handler';

import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen, AppLoading } from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as helpers from './Helpers';
import AppNavigator from './navigation/AppNavigator';
import GuestNavigator from './navigation/GuestNavigator';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Notifications } from 'expo';
import { createAppContainer } from 'react-navigation';
import FlashMessage from 'react-native-flash-message';

export default class App extends React.Component {
constructor(props){
	super(props);
	this.state = {
    isLoadingComplete: false,
	uu: {}
  };
  
    helpers.getLoggedInUser((u) => {this._updateUser(u)});

}
  
  _notificationSubscription = null;
  
  //this._notificationSubscription = Notifications.addListener(this._handleNotification);

  _handleNotification = (notification) => {
	   console.log(notification.origin);
	   console.log(JSON.stringify(notification.data));
    this.setState({notification: notification});
  };
  
  _updateUser = (ret) => {
    this.state.uu = ret;
  };

  render() {
   
	  //helpers._getPermissionAsync();
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
		helpers.getLoggedInUser((u) => {this._updateUser(u)});
		console.log('User',this.state.uu);
		//console.log('Object count',Object.keys(this.state.uu).length);
		let mnav = (Object.keys(this.state.uu).length === 0) ? GuestNavigator : AppNavigator;
		const AppContainer = createAppContainer(mnav);
		
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
		 <AppContainer />
          <FlashMessage position="bottom" />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      /**
	  Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
	  **/
      await Font.loadAsync({
        // This is the font that we are using for our tab bar
        //...Ionicons.font,
		//...FontAwesome.font
		'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf')
      }),
    ]);
  };
  

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
	fontFamily: 'Roboto'
  },
});

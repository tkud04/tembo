import 'react-native-gesture-handler';

import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen, AppLoading } from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as helpers from './Helpers';
import CustomContainer from './navigation/CustomContainer';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Notifications } from 'expo';
import FlashMessage from 'react-native-flash-message';
import {ThemeContext,UserContext} from './MyContexts.js';


export default class App extends React.Component {
constructor(props){
	super(props);
	this.uuu = {};
	
	this.state = {
    isLoadingComplete: false,
	uu: {
		user:  this.uuu,
		up: this._updateUser
	},
	
	
  };
  
  	  helpers.getLoggedInUser2()
	  .then((u) => {
		  this._updateUser(u);
		}); 

}
  
  _notificationSubscription = null;
  
  //this._notificationSubscription = Notifications.addListener(this._handleNotification);

  _handleNotification = (notification) => {
	   console.log(notification.origin);
	   console.log(JSON.stringify(notification.data));
    this.setState({notification: notification});
  };
  
  _updateUser = (ret) => {
    this.state.uu.user = ret;
  };

  render() {
   
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
		//helpers.getLoggedInUser((u) => {this._updateUser(u)});
		console.log('User from app js',this.state.uu);		
		
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
		  <ThemeContext.Provider>
		     <UserContext.Provider value={this.state.uu}>
		       <CustomContainer />
		     </UserContext.Provider>
		  </ThemeContext.Provider>
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

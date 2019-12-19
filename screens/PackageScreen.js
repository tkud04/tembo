import React from 'react';
import { View, ScrollView, StyleSheet, Platform, StatusBar, CameraRoll} from 'react-native';
import { Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderMenuButton from '../components/HeaderMenuButton';
import SubscribeCard from '../components/SubscribeCard';
import AppHeader from '../components/AppHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import util from 'react-native-util';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import styled from 'styled-components';
import {showMessage, hideMessage} from 'react-native-flash-message';


//var RNFS = require('react-native-fs');

export default class PackageScreen extends React.Component { 
 constructor(props) {
    super(props);
	this.pkg = props.navigation.state.params.pkg;
	
    this.state = { text: '',
                   loading: false,
				   id: pkg.id,
				   name: pkg.name,
				   price: pkg.price,
				   saved: pkg.saved,
				 };
    this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.navv = null;
	console.log(this.state);
  }
  
  launchDrawer = () => {
	this.navv.toggleDrawer();  
  }

static navigationOptions = ({navigation}) => {
	
	  return {
       headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight / 2  		   
	   },
	   headerTitle: () => <AppHeader w="80%" h="80%" ml="30px" xml={AppStyles.svg.chartBar} title="Subscribe"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerLeft: () => (
	    <MenuButton onPress={navigation.getParam('launchDrawer')}>
		  <HeaderMenuButton xml={AppStyles.svg.headerHamburger} w={30} h={30} ss={{marginLeft: 10}}/>
		</MenuButton>
		),
	   headerTitleStyle: {
		   
	   }
	  }
	  
	  };

  render() {
	  let navv = this.props.navigation;
	  this.navv = navv;
    return (
	       <Container>
           <WebView 
		    useWebKit={true}
		    source={{ uri: 'http://www.disenado.com.ng' }} 
		    style={{flex: 1}}
			startInLoadingState={true}
            allowUniversalAccessFromFileURLs={true}
            javaScriptEnabled={true}
            mixedContentMode={'always'}
			onMessage={event => {
               helpers.handlePostMessageAsync(event.nativeEvent.data);
            }}
            onNavigationStateChange={this.handleNavStateChange}
		   />
		   </Container>
    );
  }
  
      handleNavStateChange = newNavState => {
	 const { url } = newNavState;
	 	 if (!url) return;
	// console.log("url: " + url);
	 if(url.includes("admin/assignment")){
		 this.webview.stopLoading();
		 console.log("url: " + url);
	 }

  };
}


const Container = styled.View`
                     flex: 1;
					 background-color: white;	
                     border-radius: 20px;					 
`;
const MenuButton = styled.TouchableOpacity`

`;
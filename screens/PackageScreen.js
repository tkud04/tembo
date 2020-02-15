import React from 'react';
import { View, ScrollView, StyleSheet, Platform, StatusBar, CameraRoll} from 'react-native';
import { Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderMenuButton from '../components/HeaderMenuButton';
import SubscribeCard from '../components/SubscribeCard';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import util from 'react-native-util';
import AssetUtils from 'expo-asset-utils';
import CButton from '../components/CButton';
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
	this.url = props.navigation.state.params.url;
	this.signupData = props.navigation.state.params.signupData;
	this.upp = props.navigation.state.params.upp;
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	
	console.log('this.url: ',this.url);
	console.log('this.signupData: ',this.signupData);
	
    this.state = { text: '',
                   loading: false,
				 };
    this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.navv = null;
	
		this.html = "";
		this.webview = null;
  }
  
  getHtml = async () => {
	  //Webview local html
	let file = await AssetUtils.resolveAsync(require('../html/charts.html'));
	let fileContents = await FileSystem.readAsStringAsync(file.localUri);
	this.html = fileContents;
  }

  _chargeCard = () => {
	console.log('_chargeCard -> this.pkg: ',this.pkg);
	console.log('_chargeCard -> this.signupData: ',this.signupData);
	
  }
  
  sendData = () => {
	  //console.log("webview: ",this.webview);
	  if(this.webview !== null){
	   this.webview.postMessage(this.state.run);
	  }
  }
  
  
  handlePaymentPostMessageAsync = (msgg) => {	  
	  //console.log("posted message: " + msgg);
	  parsedMsg = helpers.tryParseJSON(msgg);
	  console.log("parsed message: ",parsedMsg);
	  
	   if(parsedMsg && parsedMsg.status === "success"){
		 
     helpers.signup(this.signupData,(res) => {
		 if(res.status == "ok"){
			    showMessage({
			      message: "Signup successful! Signing you in..",
			      type: 'success'
		        });
		        this.signupData.tk = res.token;
				
		        //Log user in
		        helpers.login(this.signupData,(res) => {
					if(res.status == "ok"){
                        showMessage({
			              message: `Welcome back ${res.user.name}! Fetching your dashboard..`,
			              type: 'success'
		                });	
                         
                        this.upp(res.user);
                        						
						//this.navv.navigate("Dashboard");
					}
					else{
						showMessage({
			              message: `Username or password incorrect, please try again.`,
			              type: 'danger'
		                });
					}
					this.state.loading = false;
				});   
		   }
		   else{
			    showMessage({
			      message: "There was a problem signing you up, please try again later",
			      type: 'danger'
		        });
		    
		   }
	 });
     
	  }
	  
}

  
  launchDrawer = () => {
	this.navv.toggleDrawer();  
  }

static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.chartBar}  leftParam = "goBack" navv = {navigation} title="Signup" subtitle="Make payment" sml={60}/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
	   }
   
    };

  render() {
	  let navv = this.props.navigation;
	  this.navv = navv;
    return (
	       <Container>
				<WebView 
		    useWebKit={true}
		    source={{ uri: this.url }} 
			originWhitelist={['*']}
		    style={{flex: 1}}
			startInLoadingState={true}
            allowUniversalAccessFromFileURLs={true}
            javaScriptEnabled={true}
            mixedContentMode={'always'}
			onMessage={event => {
               this.handlePaymentPostMessageAsync(event.nativeEvent.data);
            }}
			onLoadEnd={() => {this.sendData()}}
            onNavigationStateChange={this.handleNavStateChange}
			ref={r => {this.webview = r;}}
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

const SubmitButton = styled.TouchableOpacity`

`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
   flex-direction: row;
`;

const ProductInputWrapper = styled.View` 
                   margin-left: 10px;
				   border: 1px solid #bbb;
				   padding: 10px;
`;

const ProductDescription = styled.Text` 
                   color: #555;
				   margin-bottom: 2px;
				   font-size: 12px;
`;
					 
const ProductInput = styled.TextInput`
					 align-items: center;
					 padding: 10px;
					 margin-top: 2px;
					 margin-bottom: 2px;
					 color: #000;
`;
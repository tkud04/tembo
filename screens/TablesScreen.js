import React from 'react';
import { View, ScrollView, StyleSheet, Platform, StatusBar, CameraRoll} from 'react-native';
import { Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import AppInputImageHeader from '../components/AppInputImageHeader';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import AssetUtils from 'expo-asset-utils';
import * as FileSystem from 'expo-file-system';
import { Notifications } from 'expo';
import styled from 'styled-components';
import {showMessage, hideMessage} from 'react-native-flash-message';


//var RNFS = require('react-native-fs');

export default class TablesScreen extends React.Component { 
 constructor(props) {
    super(props);
	this.dt = props.navigation.state.params.dt;
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	this.props.navigation.setParams({goToCharts: () => {this.goToCharts()}});
	
    this.state = { text: '',
                   dt: this.dt,
				   run: `${JSON.stringify(this.dt)}`
				 };
    this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.navv = null;
	//console.log(this.state);
	
		this.html = "";
		this.getHtml();
		this.webview = null;
		
  }
  
  getHtml = async () => {
	  //Webview local html
	let file = await AssetUtils.resolveAsync(require('../html/tables.html'));
	let fileContents = await FileSystem.readAsStringAsync(file.localUri);
	this.html = fileContents;
  }
  
    goToCharts = (type) => {
		let dtt = {dt: this.dt, type:type};
		console.log("dtt: ",dtt);
	this.navv.navigate('Charts',{
		dtt: dtt,
	});  
  }
  
  launchDrawer = () => {
	this.navv.toggleDrawer();  
  }
  
  sendData = () => {
	  //console.log("webview: ",this.webview);
	  if(this.webview !== null){
	   this.webview.postMessage(this.state.run);
	  }
  }

static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.headerClipboard}  leftParam = "goBack" navv = {navigation} title="Reports" subtitle="View reports" sml={40}/>,
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
		    <Row>
			<SubmitButton
				onPress={() => {this.goToCharts("line")}}
				title="Submit"
            >
		    <CButton title="Line" background="green" color="#fff" />
			</SubmitButton>
			<SubmitButton
				onPress={() => {this.goToCharts("bar")}}
				title="Submit"
            >
		    <CButton title="Bar" background="green" color="#fff" />
			</SubmitButton>
			<SubmitButton
				onPress={() => {this.goToCharts("area")}}
				title="Submit"
            >
		    <CButton title="Area" background="green" color="#fff" />
			</SubmitButton>
			<SubmitButton
				onPress={() => {this.goToCharts("doughnut")}}
				title="Submit"
            >
		    <CButton title="Doughnut" background="green" color="#fff" />
			</SubmitButton>
			</Row>
           <WebView 
		    useWebKit={true}
		    source={{ html: this.html }} 
			originWhitelist={['*']}
		    style={{flex: 1}}
			startInLoadingState={true}
            allowUniversalAccessFromFileURLs={true}
            javaScriptEnabled={true}
            mixedContentMode={'always'}
			onMessage={event => {
               helpers.handlePostMessageAsync(event.nativeEvent.data);
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
const MenuButton = styled.TouchableOpacity`

`;
const SubmitButton = styled.TouchableOpacity`

`;

const Row = styled.View`
   margin-top: 10px;
   width: 100%;
   flex-direction: row;
`;
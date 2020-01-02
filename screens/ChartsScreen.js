import React from 'react';
import styled from 'styled-components';
import AppInputImageHeader from '../components/AppInputImageHeader';
import Sale from '../components/Sale';
import * as helpers from '../Helpers';
import * as wvhelpers from '../WebViews/Helper';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import { WebView } from 'react-native-webview';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ReportsScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	this.dt = props.navigation.state.params.dt;
    this.state = { text: '', loading: false,sales: []};	
    this.navv = null;
	
	this.htmlString = wvhelpers.drawChart(this.dt);
	console.log("htnl string",this.htmlString.length)
  }


  static navigationOptions = ({navigation}) => {
	 
	  return {
       drawerLabel: 'Reports',
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight    		   
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.headerClipboard} leftParam = "goBack" navv = {navigation} title="Tembo" subtitle="Charts"/>,
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
			originWhitelist={['*']}
		    source={{ html: this.htmlString }} 
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
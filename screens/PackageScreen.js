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
	this.pkg = props.navigation.state.params.pkg;
	this.signupData = props.navigation.state.params.signupData;
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	
	console.log('this.pkg: ',this.pkg);
	console.log('this.signupData: ',this.signupData);
	
    this.state = { text: '',
                   loading: false,
				   id: this.pkg.id,
				   name: this.pkg.name,
				   price: this.pkg.price,
				   saved: this.pkg.saved,
				   cardNumber: "",
				   cardNumberBorderBottomColor: "#ccc",
				   cardExpiry: "",
				   cardExpiryBorderBottomColor: "#ccc",
				   cvv: "",
				   cvvBorderBottomColor: "#ccc"
				 };
    this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.navv = null;
	console.log(this.state);
	
		this.html = "";
		this.getHtml();
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
  
  launchDrawer = () => {
	this.navv.toggleDrawer();  
  }

static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.chartBar}  leftParam = "goBack" navv = {navigation} title="Choose package" subtitle="Choose a package" sml={60}/>,
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
              <ScrollView>
			  <Row>
			  <ProductInputWrapper style={{borderColor: this.state.cardNumberBorderBottomColor}}>
					 <ProductDescription>CARD NUMBER</ProductDescription>
				    <ProductInput			
				     placeholder="0000 0000 0000 0000"
				     onChangeText={text => {
						this.setState({cardNumber: text});
					 }}
					 onFocus={() => {
						 
						this.setState({cardNumberBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({cardNumberBorderBottomColor: "#ccc"});
					 }}
					 keyboardType="decimal-pad"
					/>
				</ProductInputWrapper>
				</Row>
				<Row>
			  <ProductInputWrapper style={{borderColor: this.state.cardExpiryBorderBottomColor}}>
					 <ProductDescription>CARD EXPIRY</ProductDescription>
				    <ProductInput			
				     placeholder="MM / YY"
				     onChangeText={text => {
						this.setState({cardExpiry: text});
					 }}
					 onFocus={() => {
						 
						this.setState({cardExpiryBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({cardExpiryBorderBottomColor: "#ccc"});
					 }}
					 keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper style={{borderColor: this.state.cvvBorderBottomColor}}>
					 <ProductDescription>CVV</ProductDescription>
				    <ProductInput			
				     placeholder="123"
				     onChangeText={text => {
						this.setState({cvv: text});
					 }}
					 onFocus={() => {
						 
						this.setState({cvvBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({cvvBorderBottomColor: "#ccc"});
					 }}
					 keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
				</Row>
				<SubmitButton
				       onPress={() => {this._chargeCard()}}
				       title="Submit"
                    >
                        <CButton title={`Pay N${this.pkg.price}`} background="green" color="#fff" />					   
				</SubmitButton>	
			  </ScrollView>	
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
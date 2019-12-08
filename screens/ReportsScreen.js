import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import Tips from '../components/Tips';
import AppHeader from '../components/AppHeader';
import Sale from '../components/Sale';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ReportsScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({goToCharts: this.goToCharts});
    this.state = { text: '', loading: false,sales: []};	
    this.navv = null;
  }

  goToCharts = () => {
	showMessage({
			 message: `Takes you the the Charts screen.. coming soon`,
			 type: 'info'
		 });
	
	//this.navv.navigate('EditSale',{
	//	s: this.s,
	//});  
  }

  static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppHeader w="80%" h="80%" xml={AppStyles.svg.headerClipboard} title="Reports"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerRight: () => <Button onPress={navigation.getParam('goToCharts')} title="CHARTS"></Button>,
	   headerTitleStyle: {
		   
       }
	   
	   }
   
    };

  render() {
	  let navv = this.props.navigation;
    return (
	        <Container>
			  <ScrollView>		     
				  <Tips/>
                  <SearchInput
				    placeholder="Search"
				    onChangeText={text => {
						console.log(`Current text: ${text}`);
					}}
                  />
				  
				  <Row>
				   
				   </Row>
				  			  
			  </ScrollView>
			</Container>
    );
  }
  
}

const Container = styled.View`
                     flex: 1;
					 background-color: #fff;
					 justify-content: center;
					 align-items: center;
`;
					 
const SearchInput = styled.TextInput`
					 align-items: center;
					 border: 1px solid #bcbcbc;
					 border-radius: 5;
					 margin-top: 10px;
`;

const Logo = styled.Image`
           width: 55px;
		   height: 55px;
		   background: black;
		   border-radius: 30px;
		   margin-left: 2px;
		   margin-bottom: 8px;
`;

const Row = styled.View`
   marginVertical: 20px;
   width: 100%;
   border-bottom-width: 1;
   border-bottom-color: #000;
   flex-direction: row;
`;

const ProductName = styled.View`
   margin-left: 4px;
   margin-right: 5px;
   border-right-width: 1;
   border-right-color: #000;
   width: 60%;
   flex-direction: row;
`;
const ProductInfo = styled.View`
   width: 40%;
`;

const Name = styled.Text`
  font-size: 15;
  font-weight: 300;
  margin-left: 6px;
  margin-top: 10px;
  align-items: center;
`;

const PriceView = styled.View`
   width: 100%;
   border-bottom-width: 1;
   border-bottom-color: #ccc;
`;

const StockView = styled.View`
   width: 100%;
`;

const Price = styled.Text`
  font-size: 15;
  font-weight: 300;
  margin-horizontal: 5px;
  margin-vertical: 10px;
  align-items: center;
`;

const Stock = styled.Text`
  font-size: 15;
  font-weight: 300;
  margin-horizontal: 5px;
  margin-vertical: 10px;
  align-items: center;
`;

const TestButton = styled.Button`
  background-color: blue;
  color: #fff;
  border-radius: 5;
`;

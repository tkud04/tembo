import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import Tips from '../components/Tips';
import AppHeader from '../components/AppHeader';
import HeaderMenuButton from '../components/HeaderMenuButton';
import Sale from '../components/Sale';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class SalesScreen extends React.Component { 
  constructor(props) {
    super(props);
	this.props.navigation.setParams({goToAddSale: this.goToAddSale});
    this.state = { text: '', loading: false,sales: []};	
    this.navv = null;
    this.s = null;	
	
	helpers.getSales((ss => {
		this.state.sales = ss;
		}));
  }
  
  
   goToSale = () => {
	showMessage({
			 message: `Going to sale screen with id ${this.s.id}`,
			 type: 'info'
		 });
	
	this.navv.navigate('EditSale',{
		s: this.s,
	});  
  }
  
  goToAddSale = () => {
	this.navv.navigate('AddSale');  
  }

   static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppHeader w="80%" h="80%" ml="60px" xml={AppStyles.svg.headerWallet} title="Sales"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerRight: () => (
	    <MenuButton onPress={navigation.getParam('goToAddSale')}>
		  <HeaderMenuButton xml={AppStyles.svg.headerPlus} w={30} h={30} ss={{marginRight: 10}}/>
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
			  <ScrollView>		     
				  <SearchInput
				    placeholder="Sales id or customer name"
				    onChangeText={text => {
						console.log(`Current text: ${text}`);
					}}
                  />
				  
				   {
					  this.state.sales.map((s) => {
						  //console.log(s);							  
						  return  <SalesButton key={s['id']} onPress={() => {this.s = s; this.goToSale()}}><Sale data={s}/></SalesButton>
					  })
				  }
				  
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


const SalesButton = styled.TouchableOpacity`

`;

const MenuButton = styled.TouchableOpacity`

`;
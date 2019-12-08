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

export default class ProfileScreen extends React.Component { 
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
	   headerTitle: () => <AppHeader w="80%" h="80%" xml={AppStyles.svg.headerUsers} title="Profile"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       }
	   
	   }
   
    };

  render() {
    return (
	        <Container>
			  <ScrollView>
			     <TitleBar>
			             <Logo source={require('../assets/images/pic-11.jpg')}/>
			             <Title>Welcome back,</Title>
			             <Name>Tobi</Name>
				        
			        </TitleBar>
				   <Tips/>		    
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

const TitleBar = styled.View`
                     width: 100%;
					 margin-top: 40px;
					 padding-left: 80px;
					 flex-direction: row;
`;

const Avatar = styled.Image`
           width: 44px;
		   height: 44px;
		   background: black;
		   border-radius: 22px;
		   margin-left: 20px;
		   position: absolute;
		   top: 0;
		   left: 0;
`;

const Logo = styled.Image`
           width: 33px;
		   height: 33px;
		   background: black;
		   border-radius: 22px;
		   margin-left: 20px;
		   position: absolute;
		   top: 0;
		   left: 0;
`;

const Title = styled.Text`
                     margin-top: -5px;
                     font-size: 24;
					 font-weight: 500;
					 color: #b8bece;
`;

const Name = styled.Text`
                     font-size: 24;
					 font-weight: bold;
					 color: #3c4560;
					 margin-left: 10px;
					 margin-top: -5px;
`;

const NavButton = styled.Button``;

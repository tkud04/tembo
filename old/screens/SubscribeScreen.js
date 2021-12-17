import React from 'react';
import {ScrollView, Button} from 'react-native';
import styled from 'styled-components';
import Categories from '../components/Categories';
import SubscribeCard from '../components/SubscribeCard';
import AppInputImageHeader from '../components/AppInputImageHeader';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');



export default class SubscribeScreen extends React.Component { 

 constructor(props) {
    super(props);
    this.state = { text: '', loading: false,dataSource: []};
    this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	this.navv = null;
	this.signupData = props.navigation.state.params.signupData;
	console.log("Signup data (subscribe screen): ",this.signupData);
	
	this.pkgRow1 = [
		{
		   id: 345,
	 	   name: "1 Week",
		   price: "N100.00",
		   saved: "N0",
		   plan: 'PLN_2uvu6h4nwe36e47'
		},
		{
		   id: 232,
	 	   name: "1 Month",
		   price: "N200.00",
		   saved: "N0",
		   plan: 'PLN_9e4lr2n0wvw1qjw'
		},
	];
	
	this.pkgRow2 = [
		{
		   id: 125,
	 	   name: "3 Months",
		   price: "N400.00",
		   saved: "N100",
		   plan: 'PLN_uuzfsn4x9x6vcrc'
		},
		{
		   id: 962,
	 	   name: "1 Year",
		   price: "N800.00",
		   saved: "N200",
		   plan: 'PLN_7nbz32fygirg5zt'
		},
	];
		
	this.lifetimePkg = {
		   id: 837,
	 	   name: "One Time Purchase (Lifetime)",
		   price: "N1,000.00",
		   saved: "N500",
		   amount: 100000
		};
	
  }
  
  launchDrawer = () => {
	this.navv.toggleDrawer();  
  }

static navigationOptions = ({navigation}) => {
	 
	  return {
       drawerLabel: 'Subscribe',
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight    		   
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.chartBar}  leftParam = "goBack" navv = {navigation} title="Tembo" subtitle="Select a plan"  sml={60}/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
	   },
	   headerLeft: null,
	  }
	  
	  };


  render() {
	  let items = [];
	  let navv = this.props.navigation;
	  this.navv = navv;
		 //console.log(items);
		 
    return (
	        <Container>
			    <ScrollView>
					<ItemsLayout>
					 {
					  this.pkgRow1.map((p) => {
						 // console.log(p);					  
						  return (
						    <Column key={p.id}>
					          <SubscribeCard pkg={p} signupData={this.signupData} navv={navv}/>
					        </Column>  
						  )
					  })
				     }			
					</ItemsLayout>
					<ItemsLayout style={{marginTop: -30}}>
					  {
					  this.pkgRow2.map((p) => {
						  //console.log(p);					  
						  return (
						    <Column key={p.id}>
					          <SubscribeCard pkg={p} signupData={this.signupData} navv={navv}/>
					        </Column>  
						  )
					  })
				     }
					</ItemsLayout>
					
			    </ScrollView>
			</Container>
    );
  }
  
}

const Container = styled.View`
                     flex: 1;
					 background-color: white;	
                     border-radius: 20px;					 
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

const Subtitle = styled.Text`
                    font-size: 20px;
					color: #3c4560;
					font-weight: 500;
					margin-top: 10px;
					margin-left: 25px;
					text-transform: uppercase;
`;

const ItemsLayout = styled.View`
                     flex-direction: row;
					 flex: 1;					 
`;

const Column = styled.View`
                   width: 50%;
				   align-items: center;
`;

const FullColumn = styled.View`
                   width: 90%;
				   align-items: center;
`;


const NavButton = styled.Button``;

const MenuButton = styled.TouchableOpacity`

`;

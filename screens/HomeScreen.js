import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import Categories from '../components/Categories';
import Card from '../components/Card';
import Tips from '../components/Tips';
import AppHeader from '../components/AppHeader';
import * as helpers from '../Helpers';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class HomeScreen extends React.Component { 

 constructor(props) {
    super(props);
    this.state = { text: '', loading: false,dataSource: []};
	
		 
  }

  static navigationOptions = {
       drawerLabel: 'Home',
	   headerTitle: () => <AppHeader title="Daily Sales Report"/>
	   
	  };


  render() {
	  let items = [];
	  let navv = this.props.navigation;
	  helpers.getList((dt => {
		  items = dt;
		 }));
		 console.log(items);
		 
    return (
	        <Container>
			    <ScrollView>
			        <Tips/>
					<ItemsLayout>
					   <Column>
					       <Card src={require('../assets/images/product-1.jpg')} title="Products" navv={navv}/>
					   </Column>
					   <Column>
					       <Card  src={require('../assets/images/product-1.jpg')} title="Customers" navv={navv}/>
					   </Column>
					</ItemsLayout>
					<ItemsLayout>
					   <Column>
					       <Card  src={require('../assets/images/product-1.jpg')} title="Sales" navv={navv}/>
					   </Column>
					   <Column>
					       <Card  src={require('../assets/images/product-1.jpg')} title="Reports" navv={navv}/>
					   </Column>
					</ItemsLayout>
			    </ScrollView>
			</Container>
    );
  }
  
}

const Container = styled.View`
                     flex: 1;
					 background-color: white;
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
					 flex-wrap: wrap;					 
`;

const Column = styled.View`
                   width: 50%;
				   align-items: center;
`;


const NavButton = styled.Button``;
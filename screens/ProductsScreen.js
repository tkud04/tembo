import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import Tips from '../components/Tips';
import AppHeader from '../components/AppHeader';
import AppHeaderButton from '../components/AppHeader';
import * as helpers from '../Helpers';
import {ScrollView} from 'react-native';
import {Alert} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ProductsScreen extends React.Component { 
   constructor(props) {
    super(props);
    this.state = { text: '', loading: false,dataSource: []};		 
  }

   static navigationOptions = {
	   headerTitle: () => <AppHeader title="Products"/>,
	   headerRight: () => <AppHeaderButton title="+  " onPress={() => {Alert.alert('Add a new product')}}/>
	  };

  render() {
	  let navv = this.props.navigation;
    return (
	        <Container>
			  <ScrollView>		     
				  <Tips/>
                  <SearchInput
				    placeholder="Product name or SKU"
				    onChangeText={text => {
						console.log(`Current text: ${text}`);
					}}
                  />
				  
				  <Row>
				    <ProductName>
				      <Logo source={require('../assets/images/pic-11.jpg')}/>
					  <Name>Product Name</Name>
                    </ProductName>				  
				    <ProductInfo>
				   
				    </ProductInfo>
				   </Row>
				  
                  <TestButton
				  onPress={() => navv.navigate('AddProduct')}
				  title="Add a new product"
				  />				  
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

const Price = styled.Text`
  font-size: 19;
  font-weight: 400;
  margin-left: 3px;
  margin-top: 6px;
  align-items: center;
`;

const Stock = styled.Text`
  font-size: 19;
  font-weight: 400;
  margin-left: 3px;
  margin-top: 6px;
  align-items: center;
`;

const TestButton = styled.Button`
  background-color: blue;
  color: #fff;
  border-radius: 5;
`;

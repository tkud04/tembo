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
    return (
	        <Container>
			  <ScrollView>		     
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

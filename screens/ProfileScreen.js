import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import Tips from '../components/Tips';
import AppHeader from '../components/AppHeader';
import * as helpers from '../Helpers';
import {ScrollView} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ProfileScreen extends React.Component { 
   constructor(props) {
    super(props);
    this.state = { text: '', loading: false,dataSource: []};
  }

   static navigationOptions = {
	   headerTitle: () => <AppHeader title="Profile"/>
	  };

  render() {
    return (
	        <Container>
			  <ScrollView>
			     <TitleBar>
			             <Logo source={require('../assets/images/pic-11.jpg')}/>
			             <Title>Welcome back,</Title>
			             <Name>Tobi</Name>
				         <FontAwesome name="user" size={32} color="black" style={{position: 'absolute',right: 20, top: 0}}/>
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

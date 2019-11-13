import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import * as helpers from '../Helpers';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class TestScreen extends React.Component { 
  static navigationOptions = {
       header: null
	  };

  state = {
	userCook: "",
	activeUser: ""
  };
  static navigatorStyle = {
    tabBarHidden: true,
}

  render() {
    return (
	        <Container>
			   <Title>This component is styled using styled-components</Title>
			   <CustomButton text="Click me" textColor="#01d1e5" backgroundColor="lavenderblush"/>
			</Container>
    );
  }
  
}

const Container = styled.View`
                     flex: 1;
					 background-color: papayawhip;
					 justify-content: center;
					 align-items: center;
`;

const Title = styled.Text`
                     font-size: 24;
					 font-weight: 500;
					 color: palevioletred;
`;

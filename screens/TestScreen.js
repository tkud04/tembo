import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import * as helpers from '../Helpers';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class TestScreen extends React.Component { 
   static navigationOptions = {
       drawerLabel: 'Test',
	   drawerIcon: ({tintColor}) => (
	      <FontAwesome name="bar-chart" size={32} color="black" style={{position: 'absolute',right: 20, top: 0}}/>
	   )
	  };

  state = {
	userCook: "",
	activeUser: ""
  };

  render() {
    return (
	        <Container>
			<Button
					 onPress={() => (this.props.navigation.navigate('Test'))}
					 title="Go to Test screen"
					>
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

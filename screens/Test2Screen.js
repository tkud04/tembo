import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import Categories from '../components/Categories';
import Card from '../components/Card';
import HomeCard from '../components/HomeCard';
import * as helpers from '../Helpers';
import {FontAwesome} from '@expo/vector-icons';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class Test2Screen extends React.Component { 

 constructor(props) {
    super(props);
    this.state = { text: '', loading: false,dataSource: []};
	
		 
  }

  static navigationOptions = {
       header: null
	  };

  static navigatorStyle = {
    tabBarHidden: true,
}

  render() {
	  let items = [];
	  helpers.getList((dt => {
		  items = dt;
		 }));
		 console.log(items);
		 
    return (
	        <Container>
			    <ScrollView>
			        <TitleBar>
			             <Avatar source={require('../assets/images/pic-11.jpg')}/>
			             <Title>Welcome back,</Title>
			             <Name>Tobi</Name>
				         <FontAwesome name="user" size={32} color="black" style={{position: 'absolute',right: 20, top: 0}}/>
			        </TitleBar>
			        
			        <Subtitle>Items</Subtitle>
					
					<ItemsLayout>
					   <Column>
					       <Card/>
					   </Column>
					   <Column>
					       <Card/>
					   </Column>
					</ItemsLayout>
					<ItemsLayout>
					   <Column>
					       <Card/>
					   </Column>
					   <Column>
					       <Card/>
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
					 margin-right: 10px;
`;

const Column = styled.View`
                   width: 50%;
`;

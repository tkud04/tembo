import React from 'react';
import {View,ScrollView, Button,SafeAreaView,TouchableNativeFeedback} from 'react-native';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';
import { DrawerItems } from 'react-navigation-drawer';
import {ThemeContext,UserContext} from '../MyContexts';



let uu = {};

_getUsername = (u) =>{
	let r = "Guest";
	if(u.name) r = u.name;
	return r;
}
_getEmail = (u) =>{
	let r = "Sign in";
	if(u.email) r = u.email; 
	return r;
}
const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
const CustomDrawerComponent = props => (
  <View style={{ flex: 1 }}>

        <ScrollView>
          <SafeAreaView
            style={{flex: 1}}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
		    
			<ThemeContext.Consumer>
             {theme => (
               <UserContext.Consumer>
			   {({user,up,loggedIn}) => {
				   //console.log("user in cdc: ",user);
				   //console.log("cdc items: ",props.items);
				   helpers.getLoggedInUser().then((dt) => {
			  uu = dt;
			  //console.log("updating context from cdc async");
			  //up([uu,loggedIn]);
			  //console.log('User inside cdc async function',uu);
		 });
				   return (
		     <View>
            <View style={{ backgroundColor: AppStyles.headerBackground }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
			    <Logo source={require('../assets/images/bg.jpg')}/>
				<Username style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Hi ${_getUsername(user)}`}</Username>
                <Email style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>{`${_getEmail(user)}`}</Email>
              </View>
            </View>
			             
			</View>

			  )
			   }}
              </UserContext.Consumer>
              )}
             </ThemeContext.Consumer>		
            <View>
			            <DrawerItems {...props} />
						 </View>
          </SafeAreaView>
        </ScrollView>
        <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
          <TouchableNativeFeedback background={ripple}>
            <FooterItem>
              <SvgIcon xml={AppStyles.svg.cardUsers} w="10%" h="10%"/>
              <FooterItemText style={{ fontFamily: 'sans-serif-medium' }}>FAQ</FooterItemText>
            </FooterItem>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback background={ripple}>
            <FooterItem style={{marginBottom: 5}}>
              <SvgIcon xml={AppStyles.svg.cardLightbulb} w="10%" h="10%"/>
              <FooterItemText style={{ fontFamily: 'sans-serif-medium' }}>Developer</FooterItemText>
            </FooterItem>
          </TouchableNativeFeedback>
        </View>

      </View>
);

export default CustomDrawerComponent;


const Username = styled.Text`

`;

const Email = styled.Text`
margin-bottom: 4px;
`;

const Divider = styled.View`
border-bottom-color: #adacac;
border-bottom-width: 1px;
`;

const FooterItem = styled.View`
flex-direction: row;
padding: 8px;
marginVertical: 10px;
`;

const FooterItemText = styled.Text`
color: black;
align-items: center;
justify-content: center;
margin-left: 5px;

`;

const SvgView = styled.View`
 margin-left: 20px;
 margin-right: 20px;
 margin-top: 60px;
 width: 100%;
 flex: 1;
`;

const Logo = styled.Image`
           width: 110px;
		   height: 110px;
		   background: black;
		   border-radius: 55px;
		   margin-top: 25px;
`;

import React from 'react';
import {View,ScrollView, Button,SafeAreaView,TouchableNativeFeedback} from 'react-native';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';
import { DrawerItems } from 'react-navigation-drawer';

const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
const CustomDrawerComponent = props => (
  <View style={{ flex: 1 }}>

        <ScrollView>
          <SafeAreaView
            style={{flex: 1}}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <View style={{ backgroundColor: AppStyles.headerBackground }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
			    <SvgView>
                <SvgIcon xml={AppStyles.svg.chartBar} w="30%" h="30%"/>
                </SvgView>
				<Username style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Hi tkud04`}</Username>
                <Email style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>{`kudayisitobi@gmail.com`}</Email>
              </View>
            </View>

            <DrawerItems {...props} />

            <View>
              <View style={{ marginTop: '5%' }}>
                <Divider />
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>

        <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
          <TouchableNativeFeedback background={ripple}>
            <FooterItem>
              <SvgIcon xml={AppStyles.svg.cardUsers} w="10%" h="10%"/>
              <FooterItemText style={{ fontFamily: 'sans-serif-medium' }}>Logout</FooterItemText>
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
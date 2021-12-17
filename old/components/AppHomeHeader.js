import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import HeaderMenuButton from './HeaderMenuButton';
import * as helpers from '../Helpers';
import {useNavigation} from '@react-navigation/native';


const AppHomeHeader = props => {
		//console.log("r: ",props.r);
		const navv = useNavigation();
		
return (
<Container>
<BackgroundImage source={require('../assets/images/header.jpg')}>
</BackgroundImage>
<OverlayView pointerEvents="none"></OverlayView>
<HeaderView>
  <ButtonsView>
  <MenuButton onPress={() => {console.log("pressing.."); navv.toggleDrawer()}}>
		  <HeaderMenuButton xml={AppStyles.svg.headerHamburger} w={30} h={30} ss={{marginTop: 10, marginLeft: 20, alignSelf: 'flex-start'}}/>
		</MenuButton>
	<SvgView>
	{
		props.xml && <SvgIcon xml={helpers.insertAppStyle(props.xml)} w={40} h={40}/>
	}
	<Title style={{fontSize: 12}}>{props.title}</Title>
  </SvgView>
  </ButtonsView>
  
  <TitleView sml={props.sml}>
  <Title>{props.subtitle}</Title>
  </TitleView>
</HeaderView>  
</Container>
)
};

export default AppHomeHeader;

const Container = styled.View`

`;

const BackgroundImage = styled.ImageBackground`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;

           width: 100%;
		   height: ${AppStyles.headerHeight - 40};
`;

const Title = styled.Text`
 font-size: 24;
 font-family: ${AppStyles.fontFamily};
 color: ${AppStyles.headerColor};
`;

const HeaderView = styled.View`
flex-direction: column;
 justify-content: flex-start;
 align-items: flex-start;

`;

const ButtonsView = styled.View`
flex-direction: row;
justify-content: space-evenly;
margin-top: 20px;
 
`;

const SvgView = styled.View`
 width: 100%;
align-items: center;
margin-top: 5;
margin-left: -10;
`;

const TitleView = styled.View`
margin-top: 55px;
margin-left: ${props => props.sml}px;
align-items: center;
justify-content: center;
 
`;

const MenuButton = styled.TouchableOpacity`

`;

const OverlayView = styled.View`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 155, 0,0.5);
height: ${AppStyles.headerHeight - 40};
`;

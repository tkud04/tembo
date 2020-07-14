import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import HeaderMenuButton from './HeaderMenuButton';
import {useNavigation} from '@react-navigation/native';
import * as helpers from '../Helpers';



const AppInputImageHeader = props => {
	//console.log("r: ",props.r);
	
	const navv = useNavigation();
	
	let hasNoBack = props.hnb && props.hnb == true;
	
return (
<Container>

<HeaderView>
 <Row>
 {!hasNoBack &&
  <ButtonsView>
  <MenuButton onPress={() => {console.log("pressing.."); navv.goBack()}} style={{marginLeft: 15}}>
		  <HeaderMenuButton xml={AppStyles.svg.headerBack} w={30} h={30} ss={{ alignSelf: 'flex-start'}}/>
		</MenuButton>
  </ButtonsView>
 }
  <TitleView sml={props.sml}>
  <Title>{props.subtitle}</Title>
  </TitleView>
  </Row>
</HeaderView>  

</Container>
)
};

export default AppInputImageHeader;

const Container = styled.View`
background-color: green;
height: 80;
margin-top: 30;
`;


const Title = styled.Text`
 font-size: 20;
 font-family: ${AppStyles.fontFamily};
 color: ${AppStyles.headerColor};
`;

const HeaderView = styled.View`
flex-direction: column;
margin-top: 10;
 `;

const ButtonsView = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 15px;
 
`;

const SvgView = styled.View`
 width: 10%;
align-items: center;
margin-top: -5;
`;

const TitleView = styled.View`
margin-bottom: 5px;
margin-left: 20;
margin-top: 10;
`;

const MenuButton = styled.TouchableOpacity`

`;

const OverlayView = styled.View`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(101, 33, 33,0.5);
height: 100;
`;

const Row = styled.View`
flex-direction: row;
`;

import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import { FontAwesome } from '@expo/vector-icons';
import SvgIcon from './SvgIcon';

let xmlString = `
<style>
svg{
	display: block; 
	margin: 0 auto;
}
</style>
<svg role="img" viewBox="0 0 512 512">
${AppStyles.svg.chartBar}
</svg>
`;

const AppHeader = props => (
<HeaderView>
  <SvgView>
     <SvgIcon xml={xmlString}/>
  </SvgView>
  <Title>{props.title}</Title>
</HeaderView>  
);

export default AppHeader;


const Title = styled.Text`
 font-size: 24;
 font-family: sans-serif;
 margin-left: 50px;
 margin-bottom: 15px;
 color: ${AppStyles.headerColor};
`;

const HeaderView = styled.View`
flex-direction: column;
`;

const SvgView = styled.View`
 margin-left: 50px;
`;
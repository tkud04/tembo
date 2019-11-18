import React from 'react';
import styled from 'styled-components';
import {FontAwesome} from '@expo/vector-icons';


const AppHeader = props => (
<Title>{props.title}</Title>			             				         
);

export default AppHeader;


const Title = styled.Text`
 font-size: 24;
 font-weight: bold;
`;

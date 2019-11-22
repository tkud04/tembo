import React from 'react';
import styled from 'styled-components';


const AppHeader = props => (
<Title>{props.title}</Title>			             				         
);

export default AppHeader;


const Title = styled.Text`
 font-size: 24;
 font-weight: 200;
 margin-left: 7px;
`;

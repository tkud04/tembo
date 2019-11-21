import React from 'react';
import styled from 'styled-components';
import {Icon} from 'expo';


const Tips = props => (
<TipsBar>
    <Tip>Tip: Swipe right to open the menu.</Tip>			             				         
</TipsBar>
);

export default Tips;

const TipsBar = styled.View`
                     width: 100%;
					 margin-top: 10px;
					 margin-left: 3px;
					 flex-direction: row;
					 background-color: green;					 
					 font-weight: 300;
`;


const Tip = styled.Text`
                     font-size: 14;					 
					 margin: 5px;
					 color: #fff;
`;

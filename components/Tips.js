import React from 'react';
import styled from 'styled-components';
import {FontAwesome} from '@expo/vector-icons';


const Tips = props => (
<TipsBar>
	 <FontAwesome name="info" size={32} color="black" style={{position: 'absolute',right: 20, top: 0}}/>
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

import React from 'react';
import styled from 'styled-components';
import {SvgXml} from 'react-native-svg';
import * as helpers from '../Helpers';

let naira = '\x8358';
let ml = "20px";


const Card = props => {
ml = props.ml;
console.log(`ml before": ${ml}`);
return(
<Container>
    <HomeButton
	    onPress={() =>{
			let navv = props.navv;
			navv.navigate(props.title);
		}}
	  >
	  
   <Cover ml={props.ml}> 
      <SvgXml xml={helpers.insertAppStyle(props.xml)} fill="white" width={props.w} height={props.h} />     	 
   </Cover>
   <Content>
     <Title>{props.title}</Title>
   </Content>
    </HomeButton>
</Container>
);
}

export default Card;

const Container = styled.View`
                  background: #fff;
				  height: 200px;
				  width: 150px;
				  border-radius: 14px;
				  border-color: #cdcdcd;
				  margin: 18px;
				  margin-top: 20px;
				  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
`;

console.log(`ml": ${ml}`);

const Cover = styled.View`
              width: 100%;
			  height:90px;
			  margin-left: ${props => props.ml};
			  border-top-left-radius: 14px;
			  border-top-right-radius: 14px;
			  overflow: hidden;
`;

const HomeButton = styled.TouchableOpacity`
              width: 100%;
			  height: 100%;

`;

const Image = styled.Image`
              width: 100%;
			  height: 100%;
`;

const Content = styled.View`
			 flex-direction: column;
			 align-items: center;
			 height: 30px;
`;

const Title = styled.Text`
             color: #555;
			 font-weight: 500;
			 font-family: sans-serif;
			 font-size: 15px;
			 margin-top: 5px;
`;
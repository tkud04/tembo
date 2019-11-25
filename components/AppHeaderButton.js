import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import { Icon } from 'expo';

export default class AppHeaderButton extends React.Component {
	constructor(props) {
      super(props);
      this.state = {};		 
    }
	
	render(){
		return (
<Btn
onPress={() => {
	console.log("button pressed"); 
	this.props.op();
	}}
>
<BtnContent>
<Icon.Ionicons
        name={this.props.title}
        size={26}
        color={AppStyles.color}
      />
</BtnContent>
</Btn>			             				         
);
	}
}

const Btn = styled.TouchableOpacity`
              width: 100%;
			  height: 100%;
`;

const BtnContent = styled.View`
 flex-direction: column;
			 align-items: center;

`;

const Txt = styled.Text`
font-size: 44;
 font-weight: bold;
  margin-right: 25px;
`;

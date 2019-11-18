import React from 'react';
import styled from 'styled-components';
import {FontAwesome} from '@expo/vector-icons';


const AppHeaderButton = props => (
<Btn
onPress={props.onPress}
>
<BtnContent>
<Txt>{props.title}</Txt>
</BtnContent>
<Btn/>			             				         
);

export default AppHeaderButton;


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

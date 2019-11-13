import React from 'react';
import styled from 'styled-components';

let naira = '\u8358';
const Card = props => (
<Container>
   <Cover>
      <HomeButton
	    onPress={() =>{alert('Hi');}}
	  >
      <Image source={require('../assets/images/product-1.jpg')}/>
	  </HomeButton>
   </Cover>
   <Content>
     <Title>Bags</Title>
     <Price>{naira}5,000.00</Price>
   </Content>
</Container>
);

export default Card;

const Container = styled.View`
                  background: #fff;
				  height: 200px;
				  width: 150px;
				  border-radius: 14px;
				  margin: 18px;
				  margin-top: 20px;
				  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
`;

const Cover = styled.View`
              width: 100%;
			  height: 120px;
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
             padding-top: 10px;
			 flex-direction: column;
			 align-items: center;
			 height: 60px;
`;

const Title = styled.Text`
             color: #3c4560;
			 font-weight: 500;
			 font-size: 20px;
`;

const Price = styled.Text`
             color: #cdcdcd;
			 font-weight: 500;
			 font-size: 15px;
			 margin-top: 5px;
`;
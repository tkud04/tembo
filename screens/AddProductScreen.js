import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import Tips from '../components/Tips';
import AppHeader from '../components/AppHeader';
import AppHeaderButton from '../components/AppHeader';
import * as helpers from '../Helpers';
import {ScrollView} from 'react-native';
import {Alert} from 'react-native';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ProductsScreen extends React.Component { 
   constructor(props) {
    super(props);
    this.state = { inputBorderBottomColor: '#aaa',
                   inputBorderBottomWidth: 1,
				   nameBorderBottomColor: '#aaa',
				   costPriceBorderBottomColor: '#aaa',
				   salePriceBorderBottomColor: '#aaa',
				   stockBorderBottomColor: '#aaa',
				   notesBorderBottomColor: '#aaa',
				   quantityType: "none",
				   loading: false,
				   dataSource: [],
				   quantityTypes: [{key: 1,name: "Box", value: "box"},
	                     {key: 3,name: "Case", value: "case"},
	                     {key: 2,name: "Pound", value: "pound"},
	                     {key: 4,name: "Feet", value: "feet"},
	                     {key: 5,name: "Centimeter", value: "cm"},
	                     {key: 9,name: "Inch", value: "inch"},
	                     {key: 7,name: "Gallon", value: "gallon"},
	                     {key: 8,name: "Feet", value: "feet"},
	                     {key: 6,name: "Gram", value: "gram"},
	                     {key: 11,name: "Kilometer", value: "km"},
	                     {key: 10,name: "Litre", value: "litre"},
	                     {key: 12,name: "Mile", value: "mile"},
	                     {key: 13,name: "Meter", value: "meter"},
	                     {key: 14,name: "Miligram", value: "mg"},
	                     {key: 15,name: "Milimeter", value: "mm"},
	                     {key: 16,name: "Mililitre", value: "ml"},
	                     {key: 17,name: "Pack", value: "pack"},
	                     {key: 18,name: "Piece", value: "piece"},
	                     {key: 19,name: "Ton", value: "ton"},
	                     {key: 20,name: "Set", value: "set"},
	                     {key: 21,name: "Unit", value: "unit"},
	                     {key: 22,name: "Yard", value: "yard"},
	                    ]	
				 };	
				 
	//form data
	this.productName = "";
	this.sku = helpers.generateSKU();
	this.quantityType = "none";
	this.costPrice = "0";
	this.sellingPrice = "0";
	this.stock = "0";
	this.notes = "";
	this.productImg = "";
    
  }

   static navigationOptions = {
	   headerTitle: () => <AppHeader title="New Product"/>,
	  };
	  
  _renderQuantityTypes = (src) => {
      
	  console.log(src);
	  
      return src.map((element) => {
								<ProductSelect.Item label={element.name} value={element.value}/>
								});						
  }
  
  _addProduct = () => {
	 console.log(`Product name: ${this.productName}`);
	 if(this.productName.length < 6){
		 Alert.alert("Product name must be at least 6 characters");
	 }
	 const dt = {
		name: this.productName
	 };  
  }
  
  render() {
	  let navv = this.props.navigation;
	  
    return (
	        <Container>
			  <ScrollView>		     
				  <Tips/>
                   
				   <Row>
				   <ImageUpload
				    onPress={() => Alert.alert('Upload new image')}
				   >
				   <Logo source={require('../assets/images/pic-11.jpg')}/>
				   </ImageUpload>
				   <TopRightInputs>
				   <ProductInputWrapper style={{borderBottomWidth: this.state.inputBorderBottomWidth, borderBottomColor: this.state.nameBorderBottomColor}}>
				    <ProductInput
				     placeholder="Product name"
				     onChangeText={text => {
						this.productName = text;
					 }}
					 onFocus={() => {
						 console.log('focus');
						this.setState({nameBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						 console.log('blur');
						this.setState({nameBorderBottomColor: "#aaa"});
					 }}
					/>
					</ProductInputWrapper>
					<ProductInputWrapper style={{borderBottomWidth: this.state.inputBorderBottomWidth, borderBottomColor: this.state.inputBorderBottomColor}}>
					  <ProductSelect
					    selectedValue={this.state.quantityType}
						mode="dropdown"
					    onValueChange={(value,index) => {this.setState({quantityType: value})}}
					  >
					    <ProductSelect.Item key="qtype-1" label="Quantity type" value="none"/>
						{
							this.state.quantityTypes.map((element) => {
								return <ProductSelect.Item key={"qtype-" + element.key} label={element.name} value={element.value}/>
								})	
						}
					  </ProductSelect>
					</ProductInputWrapper>
				   </TopRightInputs>
				   </Row>
				   <BottomInputs>
				     <ProductInputWrapper style={{borderBottomWidth: this.state.inputBorderBottomWidth, borderBottomColor: this.state.costPriceBorderBottomColor}}>
				    <ProductInput
				     placeholder="Cost price"
				     onChangeText={text => {
						console.log(`Current text: ${text}`);
					 }}
					 onFocus={() => {
						 console.log('focus');
						this.setState({costPriceBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						 console.log('blur');
						this.setState({costPriceBorderBottomColor: "#aaa"});
					 }}
					 keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper style={{borderBottomWidth: this.state.inputBorderBottomWidth, borderBottomColor: this.state.salePriceBorderBottomColor}}>
				    <ProductInput
				     placeholder="Sale price"
				     onChangeText={text => {
						console.log(`Current text: ${text}`);
					 }}
					 onFocus={() => {
						 console.log('focus');
						this.setState({salePriceBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						 console.log('blur');
						this.setState({salePriceBorderBottomColor: "#aaa"});
					 }}
					 keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper style={{borderBottomWidth: this.state.inputBorderBottomWidth, borderBottomColor: this.state.stockBorderBottomColor}}>
				    <ProductInput
				     placeholder="Stock"
				     onChangeText={text => {
						console.log(`Current text: ${text}`);
					 }}
					 onFocus={() => {
						 console.log('focus');
						this.setState({stockBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						 console.log('blur');
						this.setState({stockBorderBottomColor: "#aaa"});
					 }}
					 keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper style={{borderBottomWidth: this.state.inputBorderBottomWidth, borderBottomColor: this.state.notesBorderBottomColor}}>
				    <ProductInput
				     placeholder="Notes"
				     onChangeText={text => {
						console.log(`Current text: ${text}`);
					 }}
					 onFocus={() => {
						 console.log('focus');
						this.setState({notesBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						 console.log('blur');
						this.setState({notesBorderBottomColor: "#aaa"});
					 }}
					 multiline={true}
					/>
					</ProductInputWrapper>
				   </BottomInputs>
                  <SubmitButton
				  onPress={() => this._addProduct()}
				  title="Submit"				  
				  />
				  <TestButton
				  onPress={() => navv.navigate('Products')}
				  title="Back to products"				  
				  />				  
			  </ScrollView>
			</Container>
    );
  }
  
}

const Container = styled.View`
                     flex: 1;
					 background-color: #fff;
`;

const ProductInputWrapper = styled.View` 
                   margin-left: 10px;
`;
					 
const ProductInput = styled.TextInput`
					 align-items: center;
					 border: none;
					 margin-top: 10px;
					 color: #bcbcbc;
`;


const TestButton = styled.Button`
  background-color: blue;
  color: #fff;
  border-radius: 5;
  margin-top: 40px;
`;

const SubmitButton = styled.Button`
  background-color: green;
  color: #fff;
  border-radius: 5;
  margin-top: 40px;
   margin-bottom: 10px;
  width: 50%;
  align-items: center;
`;

const ImageUpload = styled.TouchableOpacity`

`;

const Logo = styled.Image`
           width: 66px;
		   height: 66px;
		   background: black;
		   border-radius: 33px;
		   margin-left: 8px;
`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
   flex-direction: row;
`;

const TopRightInputs = styled.View`
   margin-left: 10px;
   margin-right: 5px;
   width: 80%;
`;

const ProductSelect = styled.Picker`
    width: 90%;
	height: 50;
	color: #aaa;
`;

const BottomInputs = styled.View`
   margin-top: 10px;
   margin-bottom: 10px;
   width: 90%;
`;
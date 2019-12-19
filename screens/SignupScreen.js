import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CButton from '../components/CButton';
import AppHeader from '../components/AppHeader';
import HeaderMenuButton from '../components/HeaderMenuButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {ScrollView,Button,KeyboardAvoidingView} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class SignupScreen extends React.Component { 
   constructor(props) {
    super(props);
	helpers._getPermissionAsync('camera roll');
    this.state = { inputBorderBottomColor: '#ccc',
                   inputBorderBottomWidth: 1,
				   nameBorderBottomColor: '#ccc',				   
				   emailBorderBottomColor: '#ccc',
				   passwordBorderBottomColor: '#ccc',
				   confirmPasswordBorderBottomColor: '#ccc',
				   phoneBorderBottomColor: '#ccc',
				   
				   loading: false,
				   dataSource: [],
				   name: "",
				   email: "",				   
				   password: "",				   
				   phone: "",
                   img: null				   
				 };	
				     
	this.navv = null;
	
		
  }

   
   static navigationOptions = {
	  headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight / 2
	   },
	  headerTitle: () =>  <AppHeader w="80%" h="80%" ml="30px" xml={AppStyles.svg.headerUsers} title="Sign up"/>, 
	   headerTintColor: AppStyles.headerColor,
	  };
	  
  
  addImage = async () => {
	  let ret = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4,4],
		  quality: 1
	  });
	  
	  console.log(ret);
	  
	  if(!ret.cancelled){
		  this.setState({customerImg: {uri: ret.uri}});
		  this.customerImg = {uri: ret.uri};
		  
		  showMessage({
			 message: "Image uploaded!",
			 type: 'success'
		 });
	  }
  }
  
  _signup = () => {
	  //form validation
	 	  
  let validationErrors = (this.state.name.length < 4 || this.state.email.length < 6 ||  this.state.password.length < 6 || this.state.password != this.state.confirmPassword || this.state.phone.length < 6);
	  if(validationErrors){
	 if(this.state.name.length < 4 ){
		 showMessage({
			 message: "Your name must be at least 4 characters",
			 type: 'danger'
		 });
	 }
	 if(this.state.email.length < 6){
		 showMessage({
			 message: "Please input a valid email address",
			 type: 'danger'
		 });
	 }
	 if(this.state.password.length < 6){
		 showMessage({
			 message: "Password must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 if(this.state.password != this.state.confirmPassword){
		 showMessage({
			 message: "The password you provided does not match",
			 type: 'danger'
		 });
	 }
	 if(this.state.phone.length < 6){
		 showMessage({
			 message: "Please input a valid phone number",
			 type: 'danger'
		 });
	 }
	 
	}
	
	else{
	  const dt = {
		  img: this.state.img,
				   name: this.state.name,
				   password: this.state.password,
				   email: this.state.email,
				   phone: this.state.phone
	 };  
	 
	 console.log(dt); 
     helpers.signup(dt,(res) => {
		 if(res.status == "ok"){
			    showMessage({
			      message: "Signup successful! Fetching your dashboard..",
			      type: 'success'
		        });
		        dt.tk = res.token;
				
		        //Log user in
		        helpers.login(dt,(res) => {
					if(res.status == "ok"){						
						this.navv.navigate("Dashboard");
					}
				});   
		   }
		   else{
			    showMessage({
			      message: "There was a problem signing you up, please try again later",
			      type: 'danger'
		        });
		    
		   }
	 });	
	}
	 
  }
  
  render() {
	  this.navv = this.props.navigation;
	  
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
		   <KeyboardAvoidingView>
	        <Container>
			  <ScrollView>		     
				
				   <Row style={{justifyContent: 'center',alignItems: 'center'}}>
				   <ImageUpload
				    onPress={() => this.addImage()}
				   >
				   
				   <Logo source={{uri: this.state.img}}/>
				   <ProductDescription style={{marginTop: 2}}>Tap to upload</ProductDescription>
				   </ImageUpload>
				   
				   </Row>
				   <BottomInputs>
				    <ProductInputWrapper>
					 <ProductDescription>Name</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.nameBorderBottomColor}}
				     placeholder="Full name"
				     onChangeText={text => {
						this.setState({name: text});
					 }}
					 onFocus={() => {
						 
						this.setState({nameBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({nameBorderBottomColor: "#ccc"});
					 }}
					/>
					</ProductInputWrapper>
					
				     <ProductInputWrapper>
					 <ProductDescription>Email address</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.emailBorderBottomColor}}
				     placeholder="Email address"
					 onChangeText={text => {
						this.setState({email: text});
					 }}
					 onFocus={() => {
						 
						this.setState({emailBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({emailBorderBottomColor: "#ccc"});
					 }}
                      keyboardType="email-address"					  
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Phone number</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.phoneBorderBottomColor}}
				     placeholder="Phone number"
				     onChangeText={text => {
						this.setState({phone: text});
					 }}
					 onFocus={() => {
						 
						this.setState({phoneBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({phoneBorderBottomColor: "#ccc"});
					 }}
					 keyboardType="number-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Password</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.passwordBorderBottomColor}}
				     placeholder="Password"
				     onChangeText={text => {
						this.setState({password: text});
					 }}
					 onFocus={() => {
						 
						this.setState({passwordBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({passwordBorderBottomColor: "#ccc"});
					 }}
					 secureTextEntry={true}
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Confirm password</ProductDescription>
				    <ProductInput
					 style={{borderColor: this.state.confirmPasswordBorderBottomColor}}
				     placeholder="Confirm password"
				     onChangeText={text => {
						this.setState({confirmPassword: text});
					 }}
					 onFocus={() => {
						 
						this.setState({confirmPasswordBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({confirmPasswordBorderBottomColor: "#ccc"});
					 }}
					 secureTextEntry={true}
					/>
					</ProductInputWrapper>
				   </BottomInputs>
                  <SubmitButton
				       onPress={() => {this._signup()}}
				       title="Submit"
                    >
                        <CButton title="Submit" background="green" color="#fff" />					   
				    </SubmitButton>
			  </ScrollView>
			</Container>
			</KeyboardAvoidingView>
			</BackgroundImage>
    );
  }
  
}

const BackgroundImage = styled.ImageBackground`
           width: 100%;
		   height: 100%;
`;

const Container = styled.View`
					 background-color: #fff;
`;

const ProductInputWrapper = styled.View` 
                   margin-left: 10px;
`;

const ProductDescription = styled.Text` 
                   color: #999;
				   margin-bottom: 2px;
				   font-size: 14px;
`;
					 
const ProductInput = styled.TextInput`
					 align-items: center;
					 border: 1px solid #bbb;
					 padding: 5px;
					 margin-top: 5px;
					 margin-bottom: 10px;
					 color: #ccc;
`;


const TestButton = styled.Button`
  background-color: blue;
  color: #fff;
  border-radius: 5;
  margin-top: 40px;
`;

const SubmitButton = styled.TouchableOpacity`

`;

const ImageUpload = styled.TouchableOpacity`

`;

const Logo = styled.Image`
           width: 88px;
		   height: 88px;
		   background: black;
		   border-radius: 44px;
`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
   flex-direction: row;
`;

const TopRightInputs = styled.View`
   margin-left: 10px;
   margin-right: 5px;
   width: 60%;
`;

const CustomerSelect = styled.Picker`
    width: 90%;
	height: 50;
	color: #ccc;
	margin-bottom: 20px;
`;

const BottomInputs = styled.KeyboardAvoidingView`
   margin-top: 10px;
   margin-left: 10px;
   margin-bottom: 10px;
   width: 90%;
`;
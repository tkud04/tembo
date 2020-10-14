import React,{useState, useEffect, useRef} from 'react';
import CButton from '../components/CButton';
import * as helpers from '../Helpers';
import * as ImagePicker from 'expo-image-picker';
import AppStyles from '../styles/AppStyles';
import TitleHeader from '../components/TitleHeader';
import {Animated, View,StyleSheet, ScrollView, Dimensions, Button, TouchableOpacity, Image, TextInput, Text} from 'react-native';
import {ThemeContext,UserContext} from '../MyContexts';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

const { width, height } = Dimensions.get('window');
let dt = {}, navv = null;
  
  const _launchDrawer = () => {
	navv.toggleDrawer();  
  }
  
const ProfileScreen = (props) => {
	navv = props.navigation;
	//console.log("params: ",props.route.params);
	
	/**	   			   
				   name: "",				   
				   email: "",		
                   img: null,				   
				   phone: "",				   
				   confirmPassword: "",				   
				   password: ""			
	**/
	
	const [nameBorderBottomColor,setNameBorderBottomColor] = useState('#777');
	const [emailBorderBottomColor,setEmailBorderBottomColor] = useState('#777');
	const [phoneBorderBottomColor,setPhoneBorderBottomColor] = useState('#777');
	const [passwordBorderBottomColor,setPasswordBorderBottomColor] = useState('#777');
	const [confirmPasswordBorderBottomColor,setConfirmPasswordBorderBottomColor] = useState('#777');
	const [isLoading,setIsLoading] = useState(false);
	const [dataNotUpdated,setDataNotUpdated] = useState(true);
	const [name,setName] = useState("");
	const [email,setEmail] = useState("");
	const [img,setImg] = useState(null);
	const [phone,setPhone] = useState("");
	const [password,setPassword] = useState("");
	const [confirmPassword,setConfirmPassword] = useState("");
	const [fadeAnim] = useState(new Animated.Value(0));
	
	const addImage = async () => {
	  let ret = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4,4],
		  quality: 1
	  });
	  
	  console.log(ret);
	  
	  if(!ret.cancelled){
		  setImg(ret.uri);
		  
		  showMessage({
			 message: "Image uploaded!",
			 type: 'success'
		 });
	  }
  }
  
  const updateState = (dt) => {
			// console.log("user: ",dt);
			  setName(dt.name);
			  setEmail(dt.email);
			  setPhone(dt.phone);
			  setDataNotUpdated(false);
  }
	
	const _update = () => {
	  //form validation
	  
	  if(password.length > 0){
		  if(password.length < 6 || password != confirmPassword){
			   if(password.length < 6){
		 showMessage({
			 message: "Password must be at least 6 characters",
			 type: 'danger'
		 });
	 }if(password != confirmPassword){
		 showMessage({
			 message: "Passwords must match",
			 type: 'danger'
		 });
	 }
		  }
	  }
	  
	  else{
		 
  let validationErrors = (name.length < 2 || phone.length < 6 || email.length < 6);
	  if(validationErrors){

	 if(name.length < 2){
		 showMessage({
			 message: "Name must be at least 2 characters",
			 type: 'danger'
		 });
	 }
	 if(email.length < 6){
		 showMessage({
			 message: "Email address must be at least 6 characters",
			 type: 'danger'
		 });
	 }if(phone.length < 6){
		 showMessage({
			 message: "Phone number must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 
	}
	
	else{
		setIsLoading(true);
	  const dt = {
		  img: img,
				   name: name,
				   email: email,
				   phone: phone,
				   password: password
	 };  
	 
	 console.log(dt);
     helpers.updateProfile(dt,navv);	
	}
	
	  }
	 
  }
  
  
  useEffect(() => {
		 props.navigation.setParams({launchDrawer: _launchDrawer});
		 
   },[]);
   
   useEffect(() => {
	if(isLoading){
	Animated.loop(
	Animated.sequence([
	Animated.timing(fadeAnim,{
		toValue: 1,
		duration: 1000,
		useNativeDriver: false
	}),
	Animated.timing(fadeAnim,{
		toValue: 0,
		duration: 1000,
		useNativeDriver: false
	})
	])
	).start();
    }
   },[isLoading]);
  
	
	 return (
	 <UserContext.Consumer> 
   {({user,up,loggedIn}) => {
	     if(dataNotUpdated){
			updateState(user); 
		 }
	     
	      return (
	        <View style={styles.container}>	
               <ScrollView>			
					<View style={[styles.row,styles.topView,styles.centered]}>
						 <TitleHeader bc={AppStyles.mainButtonBackground} tc={AppStyles.mainButtonBackground} title={`Welcome back, ${name}`}/>
					</View>
					<View style={[styles.imageRow,styles.centered]}>
                      <TouchableOpacity
				       onPress={() => addImage()}
				      >					
				        <Image style={styles.avatar} source={{uri: img}}/>			   
				      </TouchableOpacity>
				      <Text style={[styles.textStyle1,{color: AppStyles.mainButtonBackground}]}>Tap to upload</Text>
	               </View>
				   <View style={styles.bottomInputs}>
				     <View style={styles.inputWrapper}>
					   <Text style={[styles.textStyle1,{color: AppStyles.mainButtonBackground}]}>Name</Text>
				       <TextInput
					     style={[styles.inputControl,{borderColor:nameBorderBottomColor}]}
				         placeholder="Name"
					     value={name}
				         onChangeText={text => {
						   setName(text);
					     }}
					     onFocus={() => {
						  setNameBorderBottomColor("#00a2e8");
					     }}
					     onBlur={() => {
						  setNameBorderBottomColor("#777");
					     }}
					   />
					  </View>
					  <View style={styles.inputWrapper}>
					   <Text style={[styles.textStyle1,{color: AppStyles.mainButtonBackground}]}>Email address</Text>
				       <TextInput
					     style={[styles.inputControl,{borderColor:emailBorderBottomColor}]}
				         placeholder="Email address"
					     value={email}
				         onChangeText={text => {
						   setEmail(text);
					     }}
					     onFocus={() => {
						  setEmailBorderBottomColor("#00a2e8");
					     }}
					     onBlur={() => {
						  setEmailBorderBottomColor("#777");
					     }}
					   />
					  </View>
					  <View style={styles.inputWrapper}>
					   <Text style={[styles.textStyle1,{color: AppStyles.mainButtonBackground}]}>Phone number</Text>
				       <TextInput
					     style={[styles.inputControl,{borderColor:phoneBorderBottomColor}]}
				         placeholder="Phone number"
					     value={phone}
				         onChangeText={text => {
						   setPhone(text);
					     }}
					     onFocus={() => {
						  setPhoneBorderBottomColor("#00a2e8");
					     }}
					     onBlur={() => {
						  setPhoneBorderBottomColor("#777");
					     }}
					   />
					  </View>
					  <View style={styles.inputWrapper}>
					   <Text style={[styles.textStyle1,{color: AppStyles.mainButtonBackground}]}>Password</Text>
				       <TextInput
					     style={[styles.inputControl,{borderColor:passwordBorderBottomColor}]}
				         placeholder="Password"
					     value={password}
				         onChangeText={text => {
						   setPassword(text);
					     }}
					     onFocus={() => {
						  setPasswordBorderBottomColor("#00a2e8");
					     }}
					     onBlur={() => {
						  setPasswordBorderBottomColor("#777");
					     }}
						 secureTextEntry={true}
					   />
					  </View>
					  <View style={styles.inputWrapper}>
					   <Text style={[styles.textStyle1,{color: AppStyles.mainButtonBackground}]}>Confirm password</Text>
				       <TextInput
					     style={[styles.inputControl,{borderColor:confirmPasswordBorderBottomColor}]}
				         placeholder="Password"
					     value={confirmPassword}
				         onChangeText={text => {
						   setConfirmPassword(text);
					     }}
					     onFocus={() => {
						  setConfirmPasswordBorderBottomColor("#00a2e8");
					     }}
					     onBlur={() => {
						  setConfirmPasswordBorderBottomColor("#777");
					     }}
						 secureTextEntry={true}
					   />
					  </View>
					{isLoading ? (
						<Animated.View
						  style={[styles.centered,{marginBottom: 2,opacity: fadeAnim}]}
						 >
						<TitleHeader bc={AppStyles.mainButtonBackground} tc={AppStyles.mainButtonBackground} title="Processing.."/>
						</Animated.View>
					   
						) : (
						<TouchableOpacity
				       onPress={() => {_update()}}
				       title="Submit"
                       >
                        <CButton title="Submit" background={AppStyles.mainButtonBackground} color="#fff" />					   
				    </TouchableOpacity>
						)}
				   </View>
			   </ScrollView>
	      </View>
		 );
   }}
   </UserContext.Consumer>
    );  

}

export default ProfileScreen;

const styles = StyleSheet.create({
  container:{
	   flex: 1,
	   backgroundColor: '#fff'
   },
   centered: {
	   justifyContent: 'center',
	   alignItems: 'center'
   },
  row:{
	    margin: 5,
        width: '100%',
       flexDirection: 'row'
    },
 topView:{
	 marginTop: 20,
	 width: '100%',
	 backgroundColor: 'rgba(0,0,0,0)'
 },
 imageRow: {
	 margin: 5,
     width: '100%'
 },
 avatar: {
	 width: 110,
	 height: 110,
     backgroundColor: '#adacac',
     borderRadius: 55
 },
 textStyle1: {
	  color: '#000',
	  marginBottom: 2,
	  fontSize: 14 
 },
 bottomInputs: {
	  marginTop: 20,
      marginLeft: 10,
      marginBottom: 10,
      width: '90%'
 },
 inputWrapper: {
	   marginLeft: 10
 },
 inputControl: {
	  color: '#000',
	  alignItems: 'center',
	  borderWidth: 1,
	  borderColor: '#bbb',
	  borderRadius: 5,
	  padding: 5,
	  marginTop: 5,
	  marginBottom: 10
 },
});
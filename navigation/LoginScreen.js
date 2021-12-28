import React, { useState, useEffect, useContext } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';


function LoginScreen(){
	const [u, setU] = useState("");
	const [p, setP] = useState("");
	const [validation, setValidation] = useState(false);
	const [badLogin, setBadLogin] = useState(false);
	const ctx = useContext(UserContext);
	
	const login = async (cb) => {
	
	if(u != "" || p != ""){
		let etk = await helpers.getValueFor("ace_etk");
		 //console.log("etk in LoginScreen: ",etk);
		 
	try {
		
		   let fd = new FormData();
		 fd.append("u",u);
		 fd.append("p",p);
		 fd.append("etk",etk);
		 
	//create request
	let url = `${helpers.API}/hello`;
	const req = new Request(url,{method: 'POST', body: fd});
      const response = await fetch(url, 
	  {
        method: 'POST',

		headers: {
         'Content-Type': 'multipart/form-data'
        },
        body: fd
       });
      const dt = await response.json();
      console.log("dt: ",dt);
	  console.log("ctx in login screen: ",ctx);
	  
	  if(dt.status == "ok"){
		  let tk = dt.tk;
		  helpers.save('ace_tk',tk);
		  helpers.save('ace_u',u);
		  ctx.setTk(tk);
		  ctx.setU(u);
		  ctx.setEtk(etk);
		  ctx.setLoggedIn(true);

	  }
	  else{
		  setBadLogin(true);
	  }
	  
	  cb();
    } catch (error) {
      console.error(error);
	  cb();
    }
    }
	else{
		setValidation(true);
		cb();
	}
}

	return (
	   <View style={styles.container}>
	     <Text style={styles.caption}>Enter your credentials to continue:</Text>
	     
		 <View style={styles.formGroup}>
		   <Text>Username:</Text>
		    <TextInput
              style={styles.ti}
              onChangeText={t => {setU(t)}}
              placeholder="Your username or email address"
            />
		  </View>
		  
		  <View style={styles.formGroup}>
		   <Text>Password:</Text>
		    <TextInput
              style={styles.ti}
			  secureTextEntry={true}
              onChangeText={t => setP(t)}
              placeholder="Your password"
            />
		  </View>
		  
		  {validation && <Text style={styles.validation}>Please fill in the required fields and try again</Text>}
		  {badLogin && <Text style={styles.validation}>Invalid login details. Please try again</Text>}
		  
		   <AwesomeButton
		      type="round"
			  activeOpacity={0.5}
			  width={Dimensions.get('window').width-20}
        textColor="#fff"
		backgroundColor="rgb(0,0,255)"
        style={styles.loginButton}
             progress
             onPress={next => {
              /** Do Something **/
			  setValidation(false);
			  console.log("moving..");
			  login(next);
             }}
    >
      Submit
    </AwesomeButton>
	   </View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
	marginTop: 30,
	marginLeft: 10,
    //justifyContent: 'center',
  },
  caption: {
    fontSize: 18,
	fontWeight: "bold"
  },
  validation: {
    fontSize: 16,
	fontWeight: "bold",
	color: "red"
  },
  ti: {
	  padding: 10,
	   width: Dimensions.get('window').width,
  },
  formGroup: {
	  marginTop: 30,
	 // padding: 10
  },
  loginButton: {
	 alignItems: 'center',
	 
	 marginTop: 30,
  },
});

export default LoginScreen;

import { Text, Linking, AsyncStorage} from 'react-native';
import { WebView } from 'react-native-webview';
import util from 'react-native-util';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import {showMessage, hideMessage} from 'react-native-flash-message';
 
  export async function download(url){
	 //result = await WebBrowser.openBrowserAsync(url);
	 result = await Linking.openURL(url);
	 console.log(result);
  }
  
    export function tryParseJSON(jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
}
  
    export async function handlePostMessageAsync(msgg){
	  let uu = ""; //main url to launch in browser  
	  let uc = ""; //user cookie
	  let au = "" //active user
	  
	  console.log("posted message: " + msgg);
	  parsedMsg = this.tryParseJSON(msgg);
	  
	  if(parsedMsg){
		  console.log("parsed message\n\nschool code: " + parsedMsg.userCook + "\nusername: " + parsedMsg.activeUser);
          uc = parsedMsg.userCook;	  
          au = parsedMsg.activeUser;	  
          cid = parsedMsg.cid;	  
		//this.setState({userCook: parsedMsg.userCook,activeUser: parsedMsg.activeUser});
	    postData = parsedMsg.data;
	  }
	  else{
		  postData = msgg;
	  }
	  console.log("postData: " + postData);
	  
	  if(postData === 'notification'){
		  this.registerForPushNotificationsAsync(parsedMsg);
	  }
	  else if(postData === 'logout'){
		  this.logout();
	  }
	  else{
		   this.download(postData);
		 /*
	  let msgArr = postData.split('|');
	  //let result = null;
	  
	  if(msgArr[0] == "report"){
		  uu = msgArr[1];
		  ffname = FileSystem.documentDirectory + "eschoolng.pdf";
		   console.log("report card script to download: " + uu);
           this.download(uu);
	  }
	  else if(msgArr[0] == "assignment"){
		  msg = msgArr[1];
		  let nmsg = msg.substr(3);
	      uu = "https://eschoolng.net/" + uc + "/" + nmsg;
		   console.log("assignment file to download: " + uu);
	      fnameArr =  msg.split('/');
	      ffname = FileSystem.documentDirectory + fnameArr[3];	  
          this.download(uu);
	  }
	  
	  */
	  
	  /**
	  else if(msgArr[0] == "assignment"){
		  msg = msgArr[1];
		  let nmsg = msg.substr(3);
	      uu = "https://eschoolng.net/berkley/" + nmsg;
		   console.log("assignment file to download: " + uu);
	      fnameArr =  msg.split('/');
	      ffname = FileSystem.documentDirectory + fnameArr[3];
		  
		  let result = await WebBrowser.openBrowserAsync(uu);
	  if(result.type == "opened"){
		  dmb = WebBrowser.dismissBrowser();
	  }
	  console.log(result);
	  }
	  

	
	 //alert(msg);
	 
	 //We have the URI, download the file to Documents
	 
	 //iOS
	 /*
	 if(Platform.OS === 'ios'){
	 
     }
     else if(Platform.OS === 'android'){
		 CameraRoll.saveToCameraRoll( uu, 'photo');
	 }	 
	 **/
	  }
   }
  
  
    export async function _getPermissionAsync(type){
  //const { status, permissions } = await Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE,Permissions.WRITE_EXTERNAL_STORAGE,Permissions.CAMERA);
 // const {cp} = await Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE);
  //const {wes} = await Permissions.askAsync(Permissions.WRITE_EXTERNAL_STORAGE);
  
  if(Constants.platform.ios){

	     let {status} = null;
	     if(type == 'camera roll'){
		     status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	        }
		 else if(type == 'contacts'){
		     status = await Permissions.askAsync(Permissions.READ_CONTACTS);
	        }
			console.log(status);
	    if(status !== 'granted'){
		 showMessage({
			 message: `Sorry, we need ${type} permissions to make this work!`,
			 type: 'danger'
		 });	
        }		 
	  
	  return status;
    }
    
  }




export async function signup(pm, callback) {
	const PUSH_ENDPOINT = 'https://tranquil-coast-18744.herokuapp.com/app/signup';
	//const PUSH_ENDPOINT = encodeURIComponent(`https://www.eschoolng.net/mobileapp/expo_url.php?ppp=n`);
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  let upu = PUSH_ENDPOINT + "?tk=" + token + "&name=" + pm.name + "&phone=" + pm.phone + "&email=" + pm.email + "&password=" + pm.password;
  return fetch(upu, {
    method: 'GET'
  })
  .then(response => {
	    console.log(response);
         if(response.status === 200){
			   //console.log(response);
			   
			   return response.json();
		   }
		   else{
			   return {status: "error:", message: "Couldn't fetch signup URL"};
		   }
		   })
    .catch(error => {
		   console.log(`Failed to fetch push endpoint ${PUSH_ENDPOINT}: ${error}`);		
	   })
	   .then(res => {
		   console.log(res); 
		   res.tk = token;
		   callback(res);
		   
	   }).catch(error => {
		   console.log(`Unknown error: ${error}`);			
	   });
}

export async function login(data,callback)
{
	const PUSH_ENDPOINT = 'https://tranquil-coast-18744.herokuapp.com/app/login';
	 const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  let upu = PUSH_ENDPOINT + "?tk=" + token + "&username=" + data.username + "&password=" + data.password;
  return fetch(upu, {
    method: 'GET'
  })
  .then(response => {
	    //console.log(response);
         if(response.status === 200){
			   //console.log(response);
			   
			   return response.json();
		   }
		   else{
			   return {status: "error:", message: "Couldn't fetch login URL"};
		   }
		   })
    .catch(error => {
		   console.log(`Failed to fetch push endpoint ${PUSH_ENDPOINT}: ${error}`);
           return {status: "error:", message: "Couldn't fetch login URL [HARD FAIL]"};		   
	   })
	   .then(res => {
		   //console.log('Test', JSON.stringify(res));
		   
		   saveData(res);
		   /**if(res.status == "ok"){
			   
		   }
		   else{
			   
		   }**/
		   callback(res);
		   
	   }).catch(error => {
		   console.log(`Unknown error: ${error}`);			
	   });   
}

export async function logout() {
	  await AsyncStorage.removeItem('ivtry_user');
	  await AsyncStorage.removeItem('products');
	  await AsyncStorage.removeItem('customers');
	  await AsyncStorage.removeItem('sales');
}

export async function saveData(dt){
	console.log(dt);
}

export function getData(callback){
	let req = "http://peaceful-scrubland-30200.herokuapp.com/flowers";
	
	//fetch request
	fetch(req)
	   .then(response => {
		   if(response.status === 200){
			   //console.log(response);
			   
			   return response.json();
		   }
		   else{
			   return {status: "error:", message: "Network error"};
		   }
	   })
	   .catch(error => {
		    alert("Failed to send message: " + error);			
	   })
	   .then(res => {
		   callback(res); 
		   
		   
	   }).catch(error => {
		    alert("Unknown error: " + error);			
	   });
}



export function getList(callback){
	let ret = [
	{text: 'Fruits'},
	{text: 'Drinks'},
	{text: 'Foods'},
	{ text: 'Vegetables'},
	{text: 'Salts'},
	];
	callback(ret);
}


export async function addProduct(data,n)
{
	let products = await AsyncStorage.getItem('products');
	let newProduct = JSON.parse(products);
	
	if(!newProduct) newProduct = [];
	newProduct.push(data);
	
	await AsyncStorage.setItem('products',JSON.stringify(newProduct))
	                  .then(() => {
						  showMessage({
			               message: `Product saved!`,
			               type: 'success'
		                 });
						 n.navigate("Home");
					  })
					  .catch((error) => {
						  showMessage({
			               message: `Error: ${error.message}`,
			               type: 'success'
		                 });
					  });
}

export async function updateProduct(data,n)
{
	let products = await AsyncStorage.getItem('products');
	let newProduct = JSON.parse(products);
	let updatedProducts = [];
	
	if(!newProduct){
	  updatedProducts.push(data);
	} 
	
	else{
	    updatedProducts = newProduct.map((p) =>{
			if(p.sku == data.sku){
				console.log('found you');
				p = data;
			}
			return p;
		});
	}
	
	await AsyncStorage.setItem('products',JSON.stringify(updatedProducts))
	                  .then(() => {
						  showMessage({
			               message: `Product updated!`,
			               type: 'success'
		                 });
						 n.navigate("Home");
					  })
					  .catch((error) => {
						  showMessage({
			               message: `Error: ${error.message}`,
			               type: 'danger'
		                 });
					  });
					  
}

export async function getProducts(callback)
{
	try{
		let products = await AsyncStorage.getItem('products');
		//console.log(products);
		if(products !== null){
			let ret = JSON.parse(products);
			//console.log(ret);
			callback(ret);
		}
	
	}
	catch(error){
		console.log(error);
	}
	
}


export async function addCustomer(data,n)
{
	let customers = await AsyncStorage.getItem('customers');
	let newCustomers = JSON.parse(customers);
	
	if(!newCustomers) newCustomers = [];
	newCustomers.push(data);
	
	await AsyncStorage.setItem('customers',JSON.stringify(newCustomers))
	                  .then(() => {
						  showMessage({
			               message: `Customer saved!`,
			               type: 'success'
		                 });
						 n.navigate("Home");
					  })
					  .catch((error) => {
						  showMessage({
			               message: `Error: ${error.message}`,
			               type: 'success'
		                 });
					  });
}

export async function getCustomers(callback)
{
	try{
		let customers = await AsyncStorage.getItem('customers');
		//console.log(customers);
		if(customers !== null){
			let ret = JSON.parse(customers);
			console.log(ret);
			callback(ret);
		}
	}
	catch(error){
		console.log(error);
	}
	
}

export async function updateCustomer(data,n)
{
	let customers = await AsyncStorage.getItem('customers');
	let newCustomers = JSON.parse(customers);
	let updatedCustomers = [];
	
	if(!newCustomers){
	  updatedCustomers.push(data);
	} 
	
	else{
	    updatedCustomers = newCustomers.map((c) =>{
			if(c.customerEmail == data.customerEmail){
				console.log('found you');
				c = data;
			}
			return c;
		});
	}
	
	await AsyncStorage.setItem('customers',JSON.stringify(updatedCustomers))
	                  .then(() => {
						  showMessage({
			               message: `Customer info updated!`,
			               type: 'success'
		                 });
						 n.navigate("Home");
					  })
					  .catch((error) => {
						  showMessage({
			               message: `Error: ${error.message}`,
			               type: 'danger'
		                 });
					  });
					  
}


export async function getSales(callback)
{
	try{
		let sales = {};
		//let customers = await AsyncStorage.getItem('customers');
		//console.log(customers);
		if(sales !== null){
			//let ret = JSON.parse(customers);
			let ret = [];
			//console.log(ret);
			callback(ret);
		}
	}
	catch(error){
		console.log(error);
	}
	
}



export function generateSKU()
{
	return `SKU${Math.floor(Math.random() * Math.floor(999999))}`;
}

export function getUniqueID(txt)
{
	return `${txt}_${Math.floor(Math.random() * Math.floor(999999))}`;
}

export function _launchDrawer(){
	showMessage({
			 message: "Launching drawer menu",
			 type: 'success'
		 })	 
}

export function insertAppStyle(s){
return `
<style>
svg{
	display: block; 
	margin: 0 auto;
}
</style>
<svg role="img" viewBox="0 0 512 512">
${s}
</svg>
`;	
}

export let nav = null;

export function setNavState(n){
	nav = n;
}

export function navigate(r){
	nav.navigate(r);
}

export function goToAddProduct(){
	this.navigate('AddProduct');
}

export async function getLoggedInUser(callback){

	let ret = {};

	try{
		let uuu = await AsyncStorage.getItem('ivtry_user');
		//console.log(customers);
		if(uuu !== null){
			let ret = JSON.parse(uuu);
			console.log(ret);
			callback(ret);
		}
	}
	catch(error){
		console.log(error);
	}

	/**ret = {
		id: 345,
		name: "Tobi Kudayisi",
		email: "kudayisitobi@gmail.com",
		phone: "07054291601"
	};
	**/
	callback(ret);
}




export async function getPackage(id,callback){

	let	ret = [
		{
		   id: 345,
	 	   name: "30 days",
		   price: "N1,500.00",
		   saved: "N0"
		},
		{
		   id: 232,
	 	   name: "90 days",
		   price: "N5,000.00",
		   saved: "N0"
		},
		{
		   id: 125,
	 	   name: "180 days",
		   price: "N9,500.00",
		   saved: "N500"
		},
		{
		   id: 962,
	 	   name: "360 days",
		   price: "N19,000.00",
		   saved: "N100"
		},
		{
		   id: 837,
	 	   name: "One Time Purchase (Lifetime)",
		   price: "N100,000.00",
		   saved: "N0"
		},
	];
	
	let rret = {};
	ret.map((p) =>{
			if(p.id == data.id){
				console.log('found you');
				rret = p;
			}
		});
	callback(rret);
}

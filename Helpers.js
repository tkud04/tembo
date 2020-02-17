import { Text, Linking, AsyncStorage} from 'react-native';
import { WebView } from 'react-native-webview';
import util from 'react-native-util';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
//import RNPaystack from 'react-native-paystack';
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
	  console.log("posted message: " + msgg);
	  parsedMsg = this.tryParseJSON(msgg);
	  console.log("parsed message: " + parsedMsg);
	  
	  /**
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
	  }
	  **/
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
	    //console.log(response);
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

export async function logout(callback) {
	let ret = {status: "Unknown"};
	 try{
	 //**
	 await AsyncStorage.removeItem('ivtry_user');
	  await AsyncStorage.removeItem('products');
	  await AsyncStorage.removeItem('customers');
	  //**/
	  await AsyncStorage.removeItem('sales');
	  
	  ret = {status: "ok"};
	 }
	 catch(err){
		 ret = {status: "error",message: err};
	 }
	 
	 callback(ret);
}

export async function saveData(dt){
	console.log(dt);
	
	
	await AsyncStorage.setItem('ivtry_user',JSON.stringify(dt.user))
	                  .then(() => {
						  console.log("user profile saved");
					  })
					  .catch((error) => {
						  console.log("Error saving user profile",error);
					  });
  
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
	data.createdAt = getDate();
	data.updatedAt = getDate();
	
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
	data.updatedAt = getDate();
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
	
	if(n === null){
		await AsyncStorage.setItem('products',JSON.stringify(updatedProducts));
	}

    else{
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
	data.id = generateID('customer');
	data.createdAt = getDate();
	data.updatedAt = getDate();
	
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
	data.updatedAt = getDate();
	let customers = await AsyncStorage.getItem('customers');
	let newCustomers = JSON.parse(customers);
	let updatedCustomers = [];
	
	if(!newCustomers){
	  updatedCustomers.push(data);
	} 
	
	else{
	    updatedCustomers = newCustomers.map((c) =>{
			if(c.id == data.id){
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

export async function addSale(data,n)
{
	data.id = generateID('sale');
	data.status = "ok"; 
	data.date = getDate();
	data.createdAt = getDate();
	data.updatedAt = getDate();
	let sales = await AsyncStorage.getItem('sales');
	let newSale = JSON.parse(sales);
	
	if(!newSale) newSale = [];
	newSale.push(data);

	await AsyncStorage.setItem('sales',JSON.stringify(newSale))
	                  .then(() => {
						  showMessage({
			               message: `Sale recorded!`,
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

export async function getSales(callback)
{
	try{
		let sales =  await AsyncStorage.getItem('sales');
		//console.log(sales);
		if(sales !== null){
			let ret = JSON.parse(sales);
			callback(ret);
		}
	}
	catch(error){
		console.log(error);
		callback({});
	}
	
}

export async function updateSale(data,n)
{
	data.updatedAt = getDate();
	let sales = await AsyncStorage.getItem('sales');
	let newSale = JSON.parse(sales);
	let updatedSales = [];
	
	if(!newSale){
	  updatedSales.push(data);
	} 
	
	else{
	    updatedSales = newSale.map((s) =>{
			if(s.id == data.id){
				console.log('found you');
				s = data;
			}
			return s;
		});
	}
	
	await AsyncStorage.setItem('sales',JSON.stringify(updatedSales))
	                  .then(() => {
						  showMessage({
			               message: `Sale updated!`,
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


export async function deleteSale(data,n)
{
	let sales = await AsyncStorage.getItem('sales');
	let newSale = JSON.parse(sales);
	let updatedSales = [];
	
	if(!newSale){
		
	} 
	
	else{
	    updatedSales = newSale.map((s) =>{
			if(s.id == data.id){
				console.log('found you');
				s.status = "deleted";
			}
			
			return s;
			
		});
	}
	
	await AsyncStorage.setItem('sales',JSON.stringify(updatedSales))
	                  .then(() => {
						  showMessage({
			               message: `Sale deleted!`,
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


export function generateSKU()
{
	return `SKU${Math.floor(Math.random() * Math.floor(999999))}`;
}

export function generateID(txt)
{
	return `${txt}-${Math.floor(Math.random() * Math.floor(999999))}`;
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

export async function getLoggedInUser(){

	let ret = {};

	try{
		let uuu = await AsyncStorage.getItem('ivtry_user');
		//console.log(customers);
		if(uuu !== null){
			let ret = JSON.parse(uuu);
			return ret;
		}
	}
	catch(error){
		console.log(error);
	}
    
	return ret;
}


export async function getLoggedInUser2(callback){

	let ret = {id: 0, name: "Guest"};

	try{
		let uuu = await AsyncStorage.getItem('ivtry_user');
		//console.log(customers);
		if(uuu !== null){
			let ret = JSON.parse(uuu);
			console.log("logged in user: ",ret);
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
	return ret;
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

export function getDate(){
	
	let options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	};
	
	let today = new Date();
	return today.toLocaleDateString();
}

export function setDate(str){
	let d = new Date(str);
	return d;
}


 Date.prototype.diff = function(y,m,d){
        var cleanDate = function(x){
            x.setHours(0);
            x.setMinutes(0);
            x.setSeconds(0);
            return x;
        }

        var dateToCompare = new Date(y,m,d),
            date = cleanDate(this),
            daysCount = [31,28,31,30,31,30,31,31,30,31,30,31],
            d = (date > dateToCompare ? date : dateToCompare),
            d1 = (date < dateToCompare ? date : dateToCompare),
            days = 0,
            months = 0,
            years = 0;

        var yearDiff = function(){
           years = d.getFullYear() - (d1.getFullYear() + 1);
           years = years < 0 ? 0 : years;
        }

        var monthDiff = function(){
            months = d.getFullYear() == d1.getFullYear() ? (d.getMonth() - 1) - d1.getMonth() : d.getMonth() + (12 - (d1.getMonth() + 1));
            if(months >= 12){
                years = years + Math.floor(months / 12)
                months = months % 12;
            }
        }

        var getAdjustedDays = function(){
            var adjustedDays = 0, i=0;
            for(i = (d1.getMonth() + 1); i <= 12; i++){
                if(daysCount[i] == 31){
                    adjustedDays++;
                }
            }
            return adjustedDays;
        }

        var dayDiff = function(){
             var month = d1.getMonth();
            if(month == 1 && months == 0 && years == 0){
                 days = d.getDate() - d1.getDate();
            }else if(month == 1){
                days = (isLeapYear(d1.getFullYear()) ? 29 - d1.getDate() : 28 - d1.getDate()) + d.getDate() + (d1.getDate() == d.getDate() ? 1 : 2);
                days = Math.ceil(days - (getAdjustedDays() / 2));
           }else{
                days = (daysCount[month] - d1.getDate()) + d.getDate() + (d1.getMonth() == d.getMonth() ? 2 : 1);
               days = Math.ceil(days - (getAdjustedDays() / 2));
           } 
           getAdjustedDays();
           if(days >= 30){
               months = months + Math.floor(days / 30); //averge are 30 days
               days = days % 30;
           }
       }  

       var isLeapYear = function(year) {
           return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
       }

       yearDiff();
       monthDiff();
       dayDiff();

       return {"years" : years, "months" : months, "days" : days};
    }


    
    //console.log(new Date().diff(2005, 8, 25));
    //console.log(new Date().diff(2018, 8, 25));


export function getDateInterval(dd){
	let d = new Date(), ret = null;
	
	switch(dd){
		case "today":
		ret = d.getDate();
		break;
		
		case "yesterday":
		ret = d.getDate() - 1;
		break;
		
		case "7-days":
		ret = d.getDate() - 7;
		break;
		
		case "30-days":
		ret = d.getDate() - 30;
		break;
		
		case "prev-month":
		let rr = d.toLocaleDateString('en-US',{month:"short"});
		ret = d.getMonth() - 30;
		break;
		
		case "current-month":
		ret = d.getMonth() + 1;
		break;
    }
	
	d.setDate(ret);
	return d;
}

export function compareDates(str1, str2,type){
	let today = new Date();
	let s2 = setDate(today), s1 = setDate(str1);
	let y1 = s1.getFullYear(), m1 = s1.getMonth(), d1 = s1.getDate();
	let y2 = s2.getFullYear(), m2 = s2.getMonth(), d2 = s2.getDate();
	console.log(`s1: ${s1}, s2: ${s2}, type: ${type}`);
	console.log(`y1: ${y1}, m1: ${m1}, d1: ${d1}`);
	console.log(`y2: ${y2}, m2: ${m2}, d2: ${d2}`);
	
	let x = false;
	
	switch(type){
		case 'today':
		  x = y1 === y2 && m1 === m2 && d1 === d2;
		break;
		case 'yesterday':
		  x = y1 <= y2 && m1 <= m2 && (d2 - d1 <= 1);
		break;
		case '7-days':
		  x = y1 <= y2 && m1 <= m2 && (d2 - d1 <= 7);
		break;
		case '30-days':
		   x = y1 <= y2 && (m2 - m1 <= 2 || m2 - m1 === 11) && (d2 - d1 <= 30);
		break;
		case 'previous-month':
		  x = y1 <= y2 && (m2 - m1 === 1 || m2 - m1 === 11);
		break;
		case 'current-month':
		  x = y1 === y2 && m2 - m1 === 1;
		break;
   }
   console.log("x: ",x);
 return x;
}

export function getTotal(products){
	let ret = 0;
	
	for(let i = 0; i < products.length; i++){
		let p = products[i];
		//console.log(`sp: ${parseInt(p.sellingPrice)}, qty: ${parseInt(p.qty)}, shipping: ${parseInt(p.shipping)}`);
		ret += (  parseInt(p.sellingPrice) * parseInt(p.qty) );
	}
	
	return ret;
	
}

export function getProfit(products){
	let ret = 0;
	
	for(let i = 0; i < products.length; i++){
		let p = products[i];
		ret += parseInt(p.profit);
	}
	
	return ret;
	
}

export function chargeCard(cardParams){
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

export function initializeTransaction(data){
	let initialize_url = "https://api.paystack.co/transaction/initialize/";
	
	return fetch(initialize_url, {
    method: 'POST',
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json',
    'authorization': 'Bearer sk_test_ba85038cb3b6a55e707404a245ad36108a9f2225',
    'cache-control': 'no-cache'
  },
      body: JSON.stringify(data)
  })
  .then(response => {
  	//console.log(response);
	    return response;
	})
	.then(response => {
	    //console.log(response);
         if(response.status === 200){
			   //console.log(response);
			   
			   return response.json();
		   }
		   else{
			   return {status: "error:", message: "Couldn't initialize transaction"};
		   }
		   })
    .catch(error => {
    	   return {status: "error:", message: `Failed to initialize transaction: ${error}`};
	   });
  /**
  .then(response => {
	    //console.log(response);
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
	**/
}

/* repeatString() returns a string which has been repeated a set number of times */
function repeatString(str, num) {
    out = '';
    for (var i = 0; i < num; i++) {
        out += str;
    }
    return out;
}

/*
dump() displays the contents of a variable like var_dump() does in PHP. dump() is
better than typeof, because it can distinguish between array, null and object.
Parameters:
    v:              The variable
    howDisplay:     "none", "body", "alert" (default)
    recursionLevel: Number of times the function has recursed when entering nested
                    objects or arrays. Each level of recursion adds extra space to the
                    output to indicate level. Set to 0 by default.
Return Value:
    A string of the variable's contents
Limitations:
    Can't pass an undefined variable to dump(). 
    dump() can't distinguish between int and float.
    dump() can't tell the original variable type of a member variable of an object.
    These limitations can't be fixed because these are *features* of JS. However, dump()
*/
export function dump(v, howDisplay, recursionLevel) {
    howDisplay = (typeof howDisplay.type === 'undefined') ? {type: "alert"} : howDisplay;
    recursionLevel = (typeof recursionLevel !== 'number') ? 0 : recursionLevel;

    var vType = typeof v;
    var out = vType;

    switch (vType) {
        case "number":
        /* there is absolutely no way in JS to distinguish 2 from 2.0
           so 'number' is the best that you can do. The following doesn't work:
           var er = /^[0-9]+$/;
           if (!isNaN(v) && v % 1 === 0 && er.test(3.0)) {
               out = 'int';
           }
        */
        break;
    case "boolean":
        out += ": " + v;
        break;
    case "string":
        out += "(" + v.length + '): "' + v + '"';
        break;
    case "object":
        //check if null
        if (v === null) {
            out = "null";
        }
        //If using jQuery: if ($.isArray(v))
        //If using IE: if (isArray(v))
        //this should work for all browsers according to the ECMAScript standard:
        else if (Object.prototype.toString.call(v) === '[object Array]') {
            out = 'array(' + v.length + '): {\n';
            for (var i = 0; i < v.length; i++) {
                out += repeatString('   ', recursionLevel) + "   [" + i + "]:  " +
                    dump(v[i], "none", recursionLevel + 1) + "\n";
            }
            out += repeatString('   ', recursionLevel) + "}";
        }
        else {
            //if object
            let sContents = "{\n";
            let cnt = 0;
            for (var member in v) {
                //No way to know the original data type of member, since JS
                //always converts it to a string and no other way to parse objects.
                sContents += repeatString('   ', recursionLevel) + "   " + member +
                    ":  " + dump(v[member], "none", recursionLevel + 1) + "\n";
                cnt++;
            }
            sContents += repeatString('   ', recursionLevel) + "}";
            out += "(" + cnt + "): " + sContents;
        }
        break;
    default:
        out = v;
        break;
    }

    if (howDisplay.type == 'body') {
        var pre = document.getElementById(howDisplay.elem);
        pre.innerHTML = out;
       // document.body.appendChild(pre);
    }
    else if (howDisplay.type == 'alert') {
       // alert(out);
    }

    return out;
}
 
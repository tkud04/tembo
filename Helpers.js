import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import * as RootNavigation from './RootNavigation.js';
import { showMessage, hideMessage } from "react-native-flash-message";

//import RNPaystack from 'react-native-paystack';
//import {showMessage, hideMessage} from 'react-native-flash-message';
export const API = "https://mail.aceluxurystore.com/api";
export const currentNav = null;

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

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key), ret = null;
  if (result) {
    ret = result;
  } else {
    //alert('No values stored under that key.');
  }
  return ret;
}

export async function remove(key) {
  await SecureStore.deleteItemAsync(key);
}


export function getInbox(){
	
let ret = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    from: 'First Item',
    subject: 'First Item',
    msg: 'First Item',
  },
  {
    id: 'bd7asdfea-c1b6-46c2-aed5-3ad53abb28ba',
    from: 'Second Item',
    subject: 'Second Item',
    msg: 'Second Item',
  },{
    id: 'bd7acmkea-s2b1-46c2-aed5-3ad53abb28ba',
    from: 'Third Item',
    subject: 'Third Item',
    msg: 'Third Item',
  },{
    id: 'bdbzcbea-x36y-46c2-aed5-3ad53abb28ba',
    from: 'Fourth Item',
    subject: 'Fourth Item',
    msg: 'Fourth Item',
  },
];

return ret;
}

export function fetchInbox(){
	
let ret = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    from: 'First Item',
    subject: 'First Item',
    msg: 'First Item',
  },
  {
    id: 'bd7asdfea-c1b6-46c2-aed5-3ad53abb28ba',
    from: 'Second Item',
    subject: 'Second Item',
    msg: 'Second Item',
  },{
    id: 'bd7acmkea-s2b1-46c2-aed5-3ad53abb28ba',
    from: 'Third Item',
    subject: 'Third Item',
    msg: 'Third Item',
  },{
    id: 'bdbzcbea-x36y-46c2-aed5-3ad53abb28ba',
    from: 'Fourth Item',
    subject: 'Fourth Item',
    msg: 'Fourth Item',
  },
];

return ret;
}

export async function fetchMessages(dt){
	
let ret = [], url = `${API}/messages?u=${dt.u}&tk=${dt.tk}&l=${dt.l}`;;
//console.log("url: ",url);
try {
	//create request
	const req = new Request(url);
      const response = await fetch(url);
      const dt = await response.json();
	  
	  if(dt.status == "ok"){
		let dtt = dt.data;
		for(let i = 0; i < dtt.length; i++){
			let ii = dtt[i];
			ret.push(ii);
		}
	  }
    } catch (error) {
      console.error(error);
	  
    }
//console.log("ret: ",ret);
return ret;
}


export function serializeJSON(data) {
  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
}

export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

export async function registerForPushNotificationsAsync() {
  let token = "", cid = Constants.isDevice;

  if (cid) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
		  // alert(`In registerForPushNotificationsAsync(), finalStatus = ${finalStatus}`);
    if (finalStatus == 'granted') {
      Notifications.getExpoPushTokenAsync()
	  .then(data => {
		  //alert(`In getExpoPushTokenAsync(), data = ${data}`);
		  console.log(` data: `,data);
		  token = data.data;
		  	save('ace_etk',token); 
	  })
	  .catch(err => {
		  alert(`In getExpoPushTokenAsync(), err = ${err}`);
	  });
    }
	else {
		alert('Failed to get push token for push notification!');
	}
    
    //console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  
  //alert(`In registerForPushNotificationsAsync(), token: ${token}`);
  return token;
}

export function findItem(l,x){
	console.log("[l,x]: ",[l,x]);
	return l.find(i => i.id == x);
}

export function wvParse(s){
	 let r = "";
	 const regex = /(html)|(device-width)/;
	 let sr = s.search(regex);
	   // console.log('sr: ',sr);
	 if(sr == -1){
		 r = `
		 <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  </head>
  <body style="max-width:100%; width:100%;background-color:white;">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
    <meta name="color-scheme" content="only" />
	${s}
	</body>
	</html>
		 `;
	 }
	 else{
		 r = s;
	 }
	 return r;
 }
 
 export async function reply(dt){
	 let {n, l} = dt;
    let msg = await getValueFor("ace_current_msg");	 
	let dest = "";
	if(l == "inbox") dest = 'InboxEditMessage';
	console.log(`l=`,l);
    n.navigate(dest,{op: "reply",l: l,msg: msg});
 }
 export async function forward(dt){
	  let {n, l} = dt;
    let msg = await getValueFor("ace_current_msg"); 
	let dest = "";
	if(l == "inbox") dest = 'InboxEditMessage';
    n.navigate(dest,{op: "forward",l: l,msg: msg});
 }

 export async function deleteMessage(){
	let xf = await getValueFor("ace_current_msg"), l = await getValueFor("ace_current_label");
    console.log(`delete msg with label ${l}, id ${xf}`);
}

export async function markMessageRead(dt){
	 let {n, l} = dt;
	let xf = await getValueFor("ace_current_xf"),	u = await getValueFor("ace_u"), tk = await getValueFor("ace_tk");
	console.log(`mark msg with id ${xf} as read`);
	
	//create request
	let url = `${API}/mark-read?u=${u}&tk=${tk}&xf=${xf}`, dest = "";
		   
	const req = new Request(url,{method: 'GET'});
	
	//fetch request
	fetch(req)
	   .then(response => {
		   if(response.status === 200){
			   return response.json();
		   }
		   else{
			   return {status: "error", message: "Technical error"};
		   }
	   })
	    .catch(error => {
		    alert("Failed first to mark message as read: " + error);	
	   })
	   .then(res => {
		   console.log(res);
			
	   }).catch(error => {
		    alert("Failed to mark message as read: " + error);
	   });
	
}

export async function markMessageUnread(dt){
	 let {n, l} = dt;
	let xf = await getValueFor("ace_current_xf"),	u = await getValueFor("ace_u"), tk = await getValueFor("ace_tk");
	console.log(`mark msg with id ${xf} as unread`);
	
	//create request
	let url = `${API}/mark-unread?u=${u}&tk=${tk}&xf=${xf}`, dest = "";
		   
	const req = new Request(url,{method: 'GET'});
	
	//fetch request
	fetch(req)
	   .then(response => {
		   if(response.status === 200){
			   return response.json();
		   }
		   else{
			   return {status: "error", message: "Technical error"};
		   }
	   })
	    .catch(error => {
		    alert("Failed first to mark message as unread: " + error);	
	   })
	   .then(res => {
		   console.log(res);
			// hideElem(['#rp-loading','#rp-submit']); 
             let nm = "", ntt = "";
			 
		   if(res.status == "ok"){
               nm = "Done!", ntt = "success";
		   }
		   else if(res.status == "error"){
			    nm = "Something went wrong, please try again later", ntt = "error";				 
		   }
		   
	         showMessage({
               message: nm,
               type: ntt,
             });
              
			  if(l == "inbox") dest = 'InboxScreen';
              n.navigate(dest);
		   		     
	   }).catch(error => {
		    alert("Failed to mark message as unread: " + error);
	   });
	
}

export async function clearEmailStorage(){
	let xf = await save("ace_current_msg");
}

export async function resetEmailStorage(){
	await save("ace_current_msg","");
	await save("ace_current_t","");
	await save("ace_current_label","");
	await save("ace_current_s","");
	await save("ace_current_xf","");
	await save("ace_current_op","");
	await save("ace_current_msgg","");
}

export async function replyMessage(l,dt){
	
	//create request
	let url = `${API}/message`, dest = "";
		   
	const req = new Request(url,{method: 'POST', body: dt});
	
	//fetch request
	fetch(req)
	   .then(response => {
		   if(response.status === 200){
			   return response.json();
		   }
		   else{
			   return {status: "error", message: "Technical error"};
		   }
	   })
	    .catch(error => {
		    alert("Failed first to send reply: " + error);	
	   })
	   .then(res => {
		   console.log(res);
			// hideElem(['#rp-loading','#rp-submit']); 
             	 
		   if(res.status == "ok"){
              alert("Message sent!");	
               if(l == "inbox") dest = "Inbox";	  
               else if(l == "drafts") dest = "Drafts";	 
                resetEmailStorage();			   
                 RootNavigation.navigate(dest);	   
		   }
		   else if(res.status == "error"){
			   console.log(res.message);
			 if(res.message == "validation" || res.message == "dt-validation"){
				 alert(`<p class='text-primary'>Please enter a valid email address.</p>`);
			 }
			 else{
			   alert("Got an error while sending reply: " + error);			
			 }					 
		   }
		   		     
	   }).catch(error => {
		    alert("Failed to send reply: " + error);
	   });
	 
}

export async function forwardMessage(l,dt){
	//create request
	let url = `${API}/message`, dest = "";
		   
	const req = new Request(url,{method: 'POST', body: dt});
	
	//fetch request
	fetch(req)
	   .then(response => {
		   if(response.status === 200){
			   return response.json();
		   }
		   else{
			   return {status: "error", message: "Technical error"};
		   }
	   })
	    .catch(error => {
		    alert("Failed first to forward message: " + error);	
	   })
	   .then(res => {
		   console.log(res);
			// hideElem(['#rp-loading','#rp-submit']); 
             	 
		   if(res.status == "ok"){
              alert("Message sent!");	
               if(l == "inbox") dest = "Inbox";	  
               else if(l == "drafts") dest = "Drafts";	  
			   resetEmailStorage();
			    RootNavigation.navigate(dest);	  
		   }
		   else if(res.status == "error"){
			   console.log(res.message);
			 if(res.message == "validation" || res.message == "dt-validation"){
				 alert(`<p class='text-primary'>Please enter a valid email address.</p>`);
			 }
			 else{
			   alert("Got an error while forwarding message: " + error);			
			 }					 
		   }
		   		     
	   }).catch(error => {
		    alert("Failed to forward message: " + error);
	   });
}

export async function sendNewMessage(){
		let  c = await getValueFor("ace_current_msgg"), t = await getValueFor("ace_current_t"), tt = [], s = await getValueFor("ace_current_s"),
       	u = await getValueFor("ace_u"), tk = await getValueFor("ace_tk");
		console.log("[c, s, t]: ",[c, s, t]);
		if(!c || !t || !s){
			let nm = "Please fill all required details", ntt = "danger";
	         showMessage({
               message: nm,
               type: ntt,
             });
		}
		else{
		tt.push({em: t});
	console.log(`sennd new msg with label ${c}, s ${s} to [${t}]`);
	
	let fd = new FormData();
	fd.append("u",u);
    fd.append("tk",tk);
    fd.append("t",JSON.stringify(tt));
    fd.append("s",s);
    fd.append("c",c);
	
	//create request
	let url = `${API}/new-message`, dest = "";
		   
	const req = new Request(url,{method: 'POST', body: fd});
	
	//fetch request
	fetch(req)
	   .then(response => {
		   if(response.status === 200){
			   return response.json();
		   }
		   else{
			   return {status: "error", message: "Technical error"};
		   }
	   })
	    .catch(error => {
		    alert("Failed first to send new message: " + error);	
	   })
	   .then(res => {
		   console.log('res: ',res);
			// hideElem(['#rp-loading','#rp-submit']); 
           
		   if(res.status == "ok"){
              let nm = "Message sent!", ntt = "success";
	         showMessage({
               message: nm,
               type: ntt,
             });
              dest = "Inbox";	  
			   resetEmailStorage();
			    RootNavigation.navigate(dest);	  
		   }
		   else if(res.status == "error"){
			   console.log(res.message);
			 if(res.message == "validation" || res.message == "dt-validation"){
				 alert(`Please enter all required fields.`);
			 }
			 else{
			   alert("Got an error while sending new message: " + res.message);			
			 }					 
		   }
		 
		   		     
	   }).catch(error => {
		    alert("Failed to send new message: " + error);
	   });
		}
}

export async function attachMessage(){
	let xf = await getValueFor("ace_current_msg"), l = await getValueFor("ace_current_label");
	console.log(`attach file to msg with label ${l}, id ${xf}`);
}

async function saveDraft(){
		let  c = await getValueFor("ace_current_msgg"), t = await getValueFor("ace_current_t"), tt = [], s = await getValueFor("ace_current_s"),
       	u = await getValueFor("ace_u"), tk = await getValueFor("ace_tk");
		tt.push({em: t});
		
		let fd = new FormData();
	fd.append("u",u);
    fd.append("tk",tk);
    fd.append("t",JSON.stringify(tt));
    fd.append("s",s);
    fd.append("c",c);
	
	//create request
	let url = `${API}/save-draft`, dest = "";
		   
	const req = new Request(url,{method: 'POST', body: fd});
	
	//fetch request
	fetch(req)
	   .then(response => {
		   if(response.status === 200){
			   return response.json();
		   }
		   else{
			   return {status: "error", message: "Technical error"};
		   }
	   })
	    .catch(error => {
		    alert("Failed first to save draft: " + error);	
	   })
	   .then(res => {
		   console.log('res: ',res);
			// hideElem(['#rp-loading','#rp-submit']); 
           
		   if(res.status == "ok"){
              let nm = "saved to Drafts!", ntt = "success";
	         showMessage({
               message: nm,
               type: ntt,
             });
              dest = "Inbox";	  
			   resetEmailStorage();
			    RootNavigation.navigate(dest);	  
		   }
		   else if(res.status == "error"){
			   console.log(res.message);
			 if(res.message == "validation" || res.message == "dt-validation"){
				 alert(`Please enter all required fields.`);
			 }
			 else{
			   alert("Got an error while saving draft: " + res.message);			
			 }					 
		   }
		 
		   		     
	   }).catch(error => {
		    alert("Failed to save draft: " + error);
	   });
}

export async function discardMessage(){
	let l = await getValueFor("ace_current_label"), dest = "Inbox";
	console.log(`discard compose msg and return to label ${l}`);
	
	Alert.alert(
      "Discard",
      "Do you want to discard your message?",
      [
        {
          text: "Save as draft",
          onPress: () => {
			  console.log("Cancel Pressed");
			  //saveDraft();
			  },
          style: "cancel"
        },
        { 
		  text: "Yes",
		  onPress: () => {
			  console.log("OK Pressed");
			   RootNavigation.navigate(dest);	  
			  }
		}
      ]
    );
}

 export async function sendMessage(){
	let xf = await getValueFor("ace_current_xf"), l = await getValueFor("ace_current_label"), op = await getValueFor("ace_current_op"),
	     m = await getValueFor("ace_current_msgg"), u = await getValueFor("ace_u"), tk = await getValueFor("ace_tk");
    console.log(`send msg (${op}) with label ${l}, id ${xf}`);
	let fd = new FormData();
	fd.append("u",u);
    fd.append("tk",tk);
	
	if(op == "reply"){
	       fd.append("m",xf);
	       fd.append("xf","reply");
	       fd.append("c",m);
		   replyMessage(l,fd);
	}
	
	else if(op == "forward"){
		let t = await getValueFor("ace_current_t");
	       fd.append("m",xf);
	       fd.append("xf","forward");
	       fd.append("c",m);
	       fd.append("t",t);
		   forwardMessage(l,fd);
	}
	
	else if(op == "new"){
		let t = await getValueFor("ace_current_t"), s = await getValueFor("ace_current_s");
	       fd.append("s",s);
	       fd.append("c",m);
	       fd.append("t",t);
		   sendNewMessage(fd);
	}
	
	
}

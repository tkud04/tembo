import React,{useContext} from 'react';
import {ThemeContext,UserContext} from '../MyContexts';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import GuestNavigator from './GuestNavigator';
import * as helpers from '../Helpers';
import {NavigationEvents} from 'react-navigation';


export default class CustomContainer extends React.Component {
	constructor(props) { 
      super(props);
	  this.state = {
	    uuu: {}
	  };

      this.that = this; 
	
	setTimeout(() => {
		helpers.getLoggedInUser().then((dt) => {
			  this.state.uuu = dt;
			  //up(user); 
			  //console.log('User inside async timeout function',this.state.uuu);
			   
		 });
	},2000);	  
    }
	
	
	_getContainer = (uu,upp,lli) => {
		
		
		//console.log('User from custom container',this.state.uuu);
			  //let mnav = (Object.keys(uu).length === 0) ? GuestNavigator : AppNavigator;
			  let mnav = null;
			  mnav = (lli) ? AppNavigator: GuestNavigator;
		      //console.log(Object.keys(uu).length);
	       	  //let mnav = (uu.name === "Guest") ? GuestNavigator : AppNavigator;
		      const AppContainer = createAppContainer(mnav);
		     return (
		       <AppContainer/>
		     );
		
   }
	
	render(){
		return (
<ThemeContext.Consumer>
 {theme => (
   <UserContext.Consumer>
   {({user,up,loggedIn}) => {
	    //up([user,loggedIn]);
	    console.log('User from custom container',user);
	    console.log('loggedIn from custom container',loggedIn);
	     return this._getContainer(user,up,loggedIn);
   }}
   </UserContext.Consumer>
 )}
</ThemeContext.Consumer>		             				         
);
	}
}


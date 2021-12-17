import React,{useContext} from 'react';
import { View } from 'react-native';
import {ThemeContext,UserContext} from '../MyContexts';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import GuestNavigator from './GuestNavigator';
import * as helpers from '../Helpers';
import {NavigationEvents} from 'react-navigation';
import NavigationService from '../NavigationService';


export default class CustomContainer extends React.Component {
	constructor(props) { 
      super(props);
	  this.state = {
	    uuu: {},
		lli: false,
		isLoadingComplete: false,
	  };
		
	  helpers.getLoggedInUser().then((dt) => {
			  this.state.uuu = dt;
			  this.state.lli = (Object.keys(dt).length === 0);
			  this.state.isLoadingComplete = true;
			  console.log('User in customcontainer ctor: ',this.state.uuu);
			  console.log("loading complete ctor: ",this.state.isLoadingComplete);
		 });
		 
    }
	
	
	_getContainer = (uu,upp,lli) => {
		      let kl = Object.keys(uu).length;
			  console.log("keys length: ",kl);
		       this.state.lli = (kl > 4);
			    console.log('User and lli from  _getContainer: ',[uu,this.state.lli]);
			  let mnav = null;
			  mnav = (this.state.lli) ? AppNavigator: GuestNavigator;
		      //console.log(Object.keys(uu).length);
	       	  //let mnav = (uu.name === "Guest") ? GuestNavigator : AppNavigator;
		      const AppContainer = createAppContainer(mnav);
		     return (
		       <AppContainer
			   ref={navigatorRef => {
                      NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
			   />
		     );	 
		
		}
	
	render(){
			return (
                <ThemeContext.Consumer>
                  {theme => (
                    <UserContext.Consumer>
                      {({user,up,loggedIn}) => {
	                     return this._getContainer(user,up,loggedIn);
                        }}
                    </UserContext.Consumer>
                  )}
                </ThemeContext.Consumer>		             				         
            );
	}
}


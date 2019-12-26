import React from 'react';
import {ThemeContext,UserContext} from '../MyContexts';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import GuestNavigator from './GuestNavigator';
import * as helpers from '../Helpers';


export default class CustomContainer extends React.Component {
	constructor(props) {
      super(props);
      this.state = {};		 
    }
	
	_getContainer = (uu,upp) => {
        console.log('User from custom container',uu);
		let mnav = (Object.keys(uu).length === 0) ? GuestNavigator : AppNavigator;
		//let mnav = (uu.name === "Guest") ? GuestNavigator : AppNavigator;
		const AppContainer = createAppContainer(mnav);
		return <AppContainer/>
   }
	
	render(){
		return (
<ThemeContext.Consumer>
 {theme => (
   <UserContext.Consumer>
   {({user,up}) => (this._getContainer(user,up))}
   </UserContext.Consumer>
 )}
</ThemeContext.Consumer>		             				         
);
	}
}


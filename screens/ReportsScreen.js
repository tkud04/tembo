import React from 'react';
import styled from 'styled-components';
import AppImageHeader from '../components/AppImageHeader';
import ReportsCard from '../components/ReportsCard';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import { WebView } from 'react-native-webview';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ReportsScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({goToCharts: this.goToCharts});
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
    this.state = { text: '', loading: false,sales: []};	
    this.navv = null;
    
	this.dt = {
		title: "Business Report",
		type: "doughnut",
		dp: `
				{ label: "apple",  y: 10  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }	
		`
	};
  }

  goToCharts = () => {
	showMessage({
			 message: `Takes you the the Charts screen.. coming soon`,
			 type: 'info'
		 });
	
	this.navv.navigate('Charts',{
		dt: this.dt,
	});  
  }

  static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppImageHeader xml={AppStyles.svg.headerClipboard}  leftParam = "goBack" rightParam = "goToCharts" navv = {navigation} title="Products" subtitle="Manage your products"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
	   }
   
    };

 render() {
	  let items = [];
	  let navv = this.props.navigation;
	  this.navv = navv;
		 //console.log(items);
		 
    return (
	        <Container>
			    <ScrollView>
					<ItemsLayout>
						    <Column key={365}>
					          <ReportsCard dt={this.dt} title="Business Reports" navv={navv}/>
					          <ReportsCard dt={this.dt} title="Stock Reports" navv={navv}/>
					        </Column>  		
					</ItemsLayout>
			    </ScrollView>
			</Container>
    );
  }
  
      handleNavStateChange = newNavState => {
	 const { url } = newNavState;
	 	 if (!url) return;
	// console.log("url: " + url);
	 if(url.includes("admin/assignment")){
		 this.webview.stopLoading();
		 console.log("url: " + url);
	 }

  };
}


const Container = styled.View`
                     flex: 1;
					 background-color: white;	
                     border-radius: 20px;					 
`;
const MenuButton = styled.TouchableOpacity`

`;

const ItemsLayout = styled.View`
                     flex-direction: row;
					 flex: 1;					 
`;

const Column = styled.View`
                   width: 50%;
				   align-items: center;
`;
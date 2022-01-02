import React from 'react';
import {Platform, StyleSheet, View, Text, TextInput, Dimensions, ScrollView, Button} from 'react-native';
import Card from '../components/Card';
import SvgIcon from '../components/SvgIcon';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';

function HomeScreen({navigation}){
 
	  let items = [];
	  let navv = navigation;
		 //console.log(items);
		 
    return (
	        <View style={styles.container}>
			    <ScrollView>
			        <View style={styles.itemsLayout}>
					   <View style={styles.column}>
					       <Card w="50%" h="40%" ml="20px" mt="30px" cmt="-35px" xml={AppStyles.svg.cardStore} title="Products" navv={navv}/>
					   </View>
					   <View style={styles.column}>
					       <Card w="50%" h="40%" ml="20px" mt="30px" cmt="-35px" xml={AppStyles.svg.cardUsers} title="Customers" navv={navv}/>
					   </View>
					</View>
					<View style={[styles.itemsLayout,{marginTop: -30}]}>
					   <View style={styles.column}>
					       <Card w="50%" h="50%" ml="30px" mt="20px" cmt="-30px" xml={AppStyles.svg.cardWallet} title="Sales" navv={navv}/>
					   </View>
					   <View style={styles.column}>
					       <Card w="50%" h="50%" ml="30px" mt="30px" cmt="-35px" xml={AppStyles.svg.cardFile} title="Reports" navv={navv}/>
					   </View>
					</View>
			    </ScrollView>
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
  titleBar: {
    width: 100,
	marginTop: 40,
    paddingLeft: 80,
	flexDirection: 'row',
  },
  itemsLayout: {
    flexDirection: 'row',
	flex: 1
  },
  column: {
	  width: 50,
	  alignItems: 'center'
  },
  formGroup: {
	  marginTop: 30,
	 // padding: 10
  },
  loginButton: {
	 alignItems: 'center',
	 
	 marginTop: 30,
  }
});

export default HomeScreen;


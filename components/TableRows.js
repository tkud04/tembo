import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';


let rc = 0;
let rowCount = 0;
 
const TableRows = props => {
	rowCount = props.data.length;
	console.log(props.data);
	           return (
							<RowsView>
							{
							 props.data.map((i) => {
						       ++rc;
						      return <RowItem key={"row_item_" + rc}>{i}</RowItem>
					          })
							}
				           </RowsView> 
					    );
};

export default TableRows;




const RowsView = styled.View`
   marginVertical: 10px;
   width: 100%;
   flex-direction: row;
   border-bottom-color: #ddd;
   border-bottom-width: 1px;
  justify-content: space-between;
`;



const RowItem = styled.Text`
  font-size: 14;
  margin: 6px;
  color: black;
`;

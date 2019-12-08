import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';
import TableRows from './TableRows';


let hc = 0, rc = 0;
let headerCount = 0;
 
const Table = props => {
	//console.log(props.data);
	headerCount = props.data.headers.length;
	           return (
			               <TableView>
                            <TableHeader>
							{
					          props.data.headers.map((h) => {
						       //console.log(p);
                               ++hc;							   
						      return  <HeaderItem key={"header_" + hc}>{h}</HeaderItem>
					          })
				            }
							</TableHeader>
							<TableRowsView>
							{
							 props.data.rows.map((r) => {
						      // console.log(r);
							   ++rc;
						      return <TableRows key={"row_" + rc} data={r}/>
					          })
							}
				           </TableRowsView> 
				           </TableView> 
					    );
};

export default Table;



const TableView = styled.View`

`;

const TableRowsView = styled.View`

`;

const TableHeader = styled.View`
   marginVertical: 20px;
   width: 100%;
   background-color: green;
   flex-direction: row;
   justify-content: space-between;
`;



const HeaderItem = styled.Text`
  font-size: 16;
  font-weight: 300;
  margin: 6px;
  color: #fff;
`;


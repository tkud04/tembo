import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import {SvgXml} from 'react-native-svg';

const SvgIcon = props => (
  <SvgXml xml={props.xml} fill="white" width="100%" height="90%" />  
);

export default SvgIcon;
/**
 * @format
 */

 import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import BasicFlatListData from './components/BasicFlatListData';

AppRegistry.registerComponent(appName, () => BasicFlatListData);

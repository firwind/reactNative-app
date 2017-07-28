/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { PureComponent } from 'react'
 import { AppRegistry } from 'react-native'

 import RootScene from './component/RootScene';

 export default class Compare_ReactNative extends PureComponent {
     render() {
         return (
             <RootScene />
         );
     }
 }

AppRegistry.registerComponent('Compare_ReactNative', () => Compare_ReactNative);

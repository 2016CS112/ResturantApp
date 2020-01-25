import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SearchScreen from './App/screen/searchscreen';
import ShowResultScreen from './App/screen/ShowResultScreen';

const App = createStackNavigator({
  Search : SearchScreen,
  ShowResult : ShowResultScreen
} ,
{
  initialRouteName:'Search',
  defaultNavigationOptions:
  {
      title:'Food App'
  }
}
)

export default createAppContainer(App);


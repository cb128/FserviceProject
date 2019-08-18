/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import Login from './src/Login';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailScreen';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? 0 : 0,
};

const RootStack = createStackNavigator(
  {
    LoginScreen: {
      screen: Login,
      navigationOptions: {
        headerStyle,
        header: null,
      },
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'HomeScreen',
        headerStyle,
        headerLeft: null,
      },
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        title: 'DetailScreen',
        headerStyle,
      },
    },
  },
  {
    initialRouteName: 'LoginScreen',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <AppContainer />;
  }
}

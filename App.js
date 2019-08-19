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
import ListCampaign from './src/ListCampaign';
import DetailCampaign from './src/DetailCampaign';
import AddingCustomer from './src/AddingCustomer';
import ListCustomer from './src/ListCustomer';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? 0 : 0,
  backgroundColor: '#ffb900',
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
    ListCampaign: {
      screen: ListCampaign,
      navigationOptions: {
        title: 'Danh Sách Chiến Dịch',
        headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: null,
      },
    },
    DetailCampaign: {
      screen: DetailCampaign,
      navigationOptions: {
        title: 'Thông Tin Chiến Dịch',
        headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    ListCustomer: {
      screen: ListCustomer,
      navigationOptions: {
        title: 'Danh Sách Khách Hàng',
        headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    AddingCustomer: {
      screen: AddingCustomer,
      navigationOptions: {
        title: 'Thêm Khách Hàng',
        headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },
  {
    headerLayoutPreset: 'center',
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

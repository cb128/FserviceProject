/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import Login from './src/screens/Login';
import ListCampaign from './src/screens/ListCampaign';
import DetailCampaign from './src/screens/DetailCampaign';
import AddingCustomer from './src/screens/AddingCustomer';
import ListCustomer from './src/screens/ListCustomer';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? 0 : 0,
  backgroundColor: '#ffb900',
};

const AppStack = createStackNavigator(
  {
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
        headerStyle: {
          marginTop: Platform.OS === 'android' ? 0 : 0,
          backgroundColor: '#ffb900',
          elevation: 0,
          shadowColor: 'transparent',
        },
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
);

const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: Login,
    navigationOptions: {
      headerStyle,
      header: null,
    },
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <AppContainer />;
  }
}

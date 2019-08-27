/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import Login from './src/screens/Login';
import CategoryCampaign from './src/screens/CategoryCampaign';
import ListCampaign from './src/screens/ListCampaign';
import DetailCampaign from './src/screens/DetailCampaign';
import AddingCustomer from './src/screens/AddingCustomer';
import ListCustomer from './src/screens/ListCustomer';
import SelectionScreen from './src/screens/SelectionScreen';
import SideMenu from './src/screens/SideMenu';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? 0 : 0,
  backgroundColor: '#ffb900',
};

const AppStack = createStackNavigator(
  {
    CategoryCampaign: {
      screen: CategoryCampaign,
      navigationOptions: {
        title: 'Loại Dự Án',
        headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    ListCampaign: {
      screen: ListCampaign,
      navigationOptions: {
        title: 'Danh Sách Dự Án',
        headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
        headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    SelectionScreen: {
      screen: SelectionScreen,
      navigationOptions: {
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

const DrawerNavigator = createDrawerNavigator(
  {
    AppStack,
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
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
      AuthLoading: AuthLoadingScreen,
      App: DrawerNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
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

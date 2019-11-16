/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SplashScreen from 'react-native-splash-screen';

import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import Login from './src/screens/Login';
import CategoryCampaign from './src/screens/CategoryCampaign';
import ListCampaign from './src/screens/ListCampaign';
import DetailCampaign from './src/screens/DetailCampaign';
import AddingCustomer from './src/screens/AddingCustomer';
import ListCustomer from './src/screens/ListCustomer';
import SelectionScreen from './src/screens/SelectionScreen';
import ChangePassword from './src/screens/ChangePassword';
import FeedBack from './src/screens/FeedBack';
import Profile from './src/screens/Profile';
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
        title: 'DỰ ÁN',
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
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        title: 'Đổi Mật Khẩu',
        headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    FeedBack: {
      screen: FeedBack,
      navigationOptions: {
        title: 'Góp Ý Sản Phẩm',
        headerStyle,
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
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
    console.disableYellowBox = true;
  }

  render() {
    return <AppContainer />;
  }
}

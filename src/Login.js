import React from 'react';
import {Platform} from 'react-native';
import {View, Image, StyleSheet} from 'react-native';
import Form from './Form';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? 0 : 0,
};

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle,
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{marginTop: 100}}
          source={require('../src/assets/images/logo_services.png')}
        />
        <View style={styles.container}>
          <Form type="Login" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Login;

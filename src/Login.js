import React from 'react';
import {Platform} from 'react-native';
import {View, StyleSheet} from 'react-native';
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
        <Form type="ĐĂNG NHẬP" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Login;

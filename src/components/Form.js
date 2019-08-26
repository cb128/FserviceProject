import React from 'react';
import {withNavigation} from 'react-navigation';
import {loginApp} from '../api/ApiHelpers';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = async () => {
    const {email, password} = this.state;

    try {
      loginApp(email, password)
        .then(responseData => {
          if (responseData && responseData.MaNguoiDung) {
            // Save local data
            let loginDetails = {
              email: email,
              password: password,
              userID: responseData.MaNguoiDung,
            };
            AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
            // Navigate App stack
            this.props.navigation.navigate('App');
          } else {
            // eslint-disable-next-line no-alert
            alert('Tài khoản không hợp lệ!');
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={email => this.setState({email})}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Tên đăng nhập"
          placeholderTextColor="#000000"
          selectionColor="#fff"
          keyboardType="email-address"
          // onSubmitEditing={() => this.password.focus()}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={password => this.setState({password})}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Mật khẩu"
          secureTextEntry={true}
          placeholderTextColor="#000000"
          ref={input => (this.password = input)}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={this.handleLogin}>
            {this.props.type === 'Login' ? 'Đăng Nhập' : 'Đăng Ký'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#ffb900',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});

export default withNavigation(Form);

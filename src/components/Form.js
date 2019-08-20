import React from 'react';
import {withNavigation} from 'react-navigation';
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

  saveData = async () => {
    const {email, password} = this.state;

    //save data with async storage
    let loginDetails = {
      email: email,
      password: password,
    };

    if (this.props.type !== 'Login') {
      try {
        await AsyncStorage.setItem(
          'loginDetails',
          JSON.stringify(loginDetails),
        );
      } catch (e) {
        // saving error
      }

      Keyboard.dismiss();
      // eslint-disable-next-line no-alert
      alert(
        'You successfully registered. Email: ' +
          email +
          ' password: ' +
          password,
      );
      this.login();
    } else if (this.props.type === 'Login') {
      try {
        // let loginValue = await AsyncStorage.getItem('loginDetails');
        // let ld = JSON.parse(loginValue);
        let ld = {
          email: 'abc',
          password: '123',
        };
        if (ld.email != null && ld.password != null) {
          if (ld.email === email && ld.password === password) {
            this.props.navigation.navigate('App');
          } else {
            // eslint-disable-next-line no-alert
            alert('Email and Password does not exist!');
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error);
      }
    }
  };

  showData = async () => {
    let loginDetails = await AsyncStorage.getItem('loginDetails');
    let ld = JSON.parse(loginDetails);

    // eslint-disable-next-line no-alert
    alert('email:' + ld.email + ' ' + 'password:' + ld.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={email => this.setState({email})}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="#000000"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focus()}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={password => this.setState({password})}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#000000"
          ref={input => (this.password = input)}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={this.saveData}>
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

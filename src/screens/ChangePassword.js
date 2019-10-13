import React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import InputView from '../components/InputView';
import {changePassword} from '../api/ApiHelpers';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    // other constructor related code
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  handleOldPassword = password => {
    if (password) {
      this.setState({
        oldPassword: password,
      });
    }
  };

  handlePassword = password => {
    if (password) {
      this.setState({
        newPassword: password,
      });
    }
  };

  handleConfirmPassword = password => {
    if (password) {
      this.setState({
        confirmPassword: password,
      });
    }
  };

  changePassword = async () => {
    // get local data
    let userData = await AsyncStorage.getItem('loginDetails');
    let data = JSON.parse(userData);
    if (
      this.state.oldPassword.length === 0 ||
      this.state.newPassword.length === 0 ||
      this.state.confirmPassword.length === 0
    ) {
      alert('Vui lòng nhập đầy đủ thông tin.');
    } else if (data['password'] !== this.state.oldPassword) {
      alert('Mật khẩu cũ không đúng.');
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      alert('Xác nhận mật khẩu không đúng.');
    } else {
      // Call api
      let response = await changePassword(this.state.newPassword);
      let responseData = await response.json();
      if (responseData) {
        // Success so force logout
        this.removeUserData();
        this.showAlert();
      } else {
        alert('Thay đổi mật khẩu không thành công');
      }
    }
  };

  showAlert = () => {
    Alert.alert(
      'Thay đổi mật khẩu thành công',
      'Tự động đăng xuất.',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.navigate('Auth');
          },
        },
      ],
      {cancelable: false},
    );
  };

  removeUserData = () => {
    try {
      AsyncStorage.removeItem('loginDetails');
    } catch (exception) {}
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <InputView
          ref={passwordView => {
            this.passwordView = passwordView;
          }}
          callback={this.handleOldPassword}
          label={'Mật khẩu cũ'}
          isUserName={false}
        />

        <InputView
          ref={passwordView => {
            this.passwordView = passwordView;
          }}
          callback={this.handlePassword}
          label={'Mật khẩu mới'}
          isUserName={false}
        />

        <InputView
          ref={passwordView => {
            this.passwordView = passwordView;
          }}
          callback={this.handleConfirmPassword}
          label={'Nhập lại mật khẩu mới'}
          isUserName={false}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.changePassword()}>
          <Text style={styles.buttonText}>CẬP NHẬT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ffb900',
    width: Dimensions.get('window').width - 30,
    marginTop: 30,
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default ChangePassword;

import React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import InputView from '../components/InputView';

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

        <TouchableOpacity style={styles.button}>
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

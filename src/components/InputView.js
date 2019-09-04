import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  TextInput,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get(
  'window',
);

export default class InputView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icEye: 'visibility-off', // default icon to show that password is currently hidden
      password: '', // actual value of password entered by the user
      showPassword: this.props.isUserName ? false : true, // boolean to show/hide the password
    };
  }

  changePwdType = () => {
    let newState;
    if (this.state.showPassword) {
      newState = {
        icEye: 'visibility',
        showPassword: false,
        password: this.state.password,
      };
    } else {
      newState = {
        icEye: 'visibility-off',
        showPassword: true,
        password: this.state.password,
      };
    }
    // set new state value
    this.setState(newState);
  };

  handlePassword = password => {
    let newState = {
      icEye: this.state.icEye,
      showPassword: this.state.showPassword,
      password: password,
    };
    this.setState(newState);
    this.props.callback(password); // used to return the value of the password to the caller class, skip this if you are creating this view in the caller class itself
  };

  _renderEyeIcon = () => {
    if (!this.props.isUserName) {
      return (
        <Icon
          containerStyle={styles.eyeIcon}
          name={this.state.icEye}
          type="material"
          size={20}
          color={componentColors.password_icon_color}
          onPress={this.changePwdType}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    let nameIcon = this.props.isUserName ? 'md-person' : 'md-key';
    return (
      <View style={styles.passwordViewContainer}>
        <Icon
          containerStyle={styles.typeIcon}
          name={nameIcon}
          type="ionicon"
          size={22}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={this.props.label}
          label={this.props.label}
          value={this.state.password}
          onChangeText={this.handlePassword}
          secureTextEntry={this.state.showPassword}
          height={48}
          labelActiveColor={componentColors.password_icon_color}
          labelColor={componentColors.password_icon_color}
          placeholderColor={componentColors.password_icon_color}
          underlineColor={componentColors.password_icon_color}
          underlineActiveColor={componentColors.password_icon_color}
          underlineActiveHeight={2}
          underlineHeight={1}
        />
        {this._renderEyeIcon()}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  passwordViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b8b8b8',
    backgroundColor: '#fafafa',
    borderRadius: 4,
    width: Dimensions.get('screen').width - 60,
    height: 48,
    marginVertical: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 3,
  },
  inputBox: {
    flex: 1,
    fontSize: 16,
  },
  typeIcon: {
    width: 50,
    alignItems: 'center',
  },
  eyeIcon: {
    alignItems: 'center',
    width: 50,
  },
});
export const componentColors = {
  password_icon_color: '#9E9E9E',
};

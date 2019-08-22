import React from 'react';
import {Platform} from 'react-native';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Form from '../components/Form';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? 0 : 0,
};

const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export const SLOGAN_HEIGHT = 150;
export const SLOGAN_HEIGHT_SMALL = 0;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.sloganHeight = new Animated.Value(SLOGAN_HEIGHT);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_SMALL,
      }),
      Animated.timing(this.sloganHeight, {
        duration: event.duration,
        toValue: SLOGAN_HEIGHT_SMALL,
      }),
    ]).start();
  };

  keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT,
      }),
      Animated.timing(this.sloganHeight, {
        duration: event.duration,
        toValue: SLOGAN_HEIGHT,
      }),
    ]).start();
  };

  static navigationOptions = {
    title: 'Login',
    headerStyle,
  };

  render() {
    return (
      <Animated.View
        style={[styles.container, {paddingBottom: this.keyboardHeight}]}>
        <Animated.Image
          source={require('../assets/images/logo_services.png')}
          style={[styles.logo, {height: this.imageHeight}]}
        />
        {/* <Image
          source={require('../assets/images/logo_services.png')}
          style={styles.logo}
        /> */}
        <Form type="Login" />
        <Animated.Image
          source={require('../assets/images/img_slogan.png')}
          style={[
            {
              height: 150,
              marginTop: 50,
              marginBottom: 0,
              width: Dimensions.get('window').width,
            },
            {height: this.imageHeight},
          ]}
        />
        {/* <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 150,
            marginTop: 50,
            marginBottom: 0,
            width: Dimensions.get('window').width,
          }}
          resizeMode="stretch"
          source={require('../assets/images/img_slogan.png')}
        /> */}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
  },
});

export default Login;

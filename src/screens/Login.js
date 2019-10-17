import React from 'react';
import {Platform} from 'react-native';
import {
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Keyboard,
  TextInput,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Form from '../components/Form';
import logo from '../assets/images/logo_services.png';
import slogan from '../assets/images/landing_page.jpg';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? 0 : 0,
};

const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export const SLOGAN_HEIGHT = 200;
export const SLOGAN_HEIGHT_SMALL = 0;

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.sloganHeight = new Animated.Value(SLOGAN_HEIGHT);
  }

  componentDidMount() {
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

  _scrollToInput(reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{flex: 1}}>
        <ScrollView>
          <Animated.Image
            source={logo}
            style={[styles.logo, {height: this.imageHeight}]}
          />
          <Form type="Login" />
          <Animated.Image
            source={slogan}
            style={[styles.slogan, {height: this.imageHeight}]}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  slogan: {
    width: Dimensions.get('window').width,
    height: SLOGAN_HEIGHT,
    resizeMode: 'stretch',
    marginTop: 100,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
  },
  register: {
    marginBottom: 20,
    width: window.width - 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#ffae',
  },
});

export default Login;

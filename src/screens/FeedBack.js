import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import email from 'react-native-email';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get(
  'window',
);

class FeedBack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedBackString: '',
    };
  }

  handleChangeFeedBack = feedBack => {
    let newState = {
      feedBackString: feedBack,
    };
    this.setState(newState);
  };

  submitFeedBack = () => {
    const to = ['sales_support@fservices.com.vn']; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: [], // string or array of email addresses
      bcc: '', // string or array of email addresses
      subject: 'Góp Ý Ứng Dụng FServices',
      body: this.state.feedBackString,
    })
      .then(_res => {
        Alert.alert(
          'Gửi góp ý thành công',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      })
      .catch(_err => {
        Alert.alert(
          'Error',
          console.error,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View>
          <Text style={styles.titleText}>Chào bạn!</Text>
          <Text style={styles.subText}>
            Bạn muốn nói với chúng tôi điều gì?
          </Text>
          <View style={styles.feedBackView}>
            <TextInput
              style={styles.inputBox}
              height={100}
              multiline={true}
              numberOfLines={4}
              value={this.state.feedBackString}
              onChangeText={this.handleChangeFeedBack}
            />
          </View>
          <Text style={styles.subText}>
            Chúng tôi sẽ thông báo khi có thay đổi dựa trên góp ý của bạn
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={this.submitFeedBack}>
              Gửi Góp Ý
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    marginLeft: 20,
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 13,
    fontWeight: 'bold',
  },
  feedBackView: {
    height: 100,
    width: SCREEN_WIDTH - 40,
    marginLeft: 20,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 5,
  },
  inputBox: {
    flex: 1,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#ffb900',
    width: SCREEN_WIDTH - 60,
    marginTop: 30,
    marginLeft: 30,
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});

export default FeedBack;

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Dimensions,
  StyleSheet,
} from 'react-native';
import qs from 'qs';

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
    this.props.callback(feedBack); // used to return the value of the password to the caller class, skip this if you are creating this view in the caller class itself
  };

  submitFeedBack = async () => {
    if (this.state.feedBackString.trim().length > 0) {
      let url = 'mailto:nguyencaothang8993@gmail.com';

      // Create email link query
      const query = qs.stringify({
        subject: 'Góp ý',
        body: this.state.feedBackString,
      });

      if (query.length) {
        url += '?${query}';
      }

      // check if we can use this link
      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) {
        throw new Error('Provided URL can not be handled');
      }

      return Linking.openURL(url);
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.titleText}>Chào bạn!</Text>
        <Text style={styles.subText}>Bạn muốn nói với chúng tôi điều gì?</Text>
        <View style={styles.feedBackView}>
          <TextInput
            style={styles.inputBox}
            placeholder=""
            editable={true}
            height={100}
            value={this.state.feedBackString}
            onChangeText={this.handleChangeFeedBack}
          />
        </View>
        <Text style={styles.subText}>
          Chúng tôi sẽ thông báo khi có thay đổi dựa trên góp ý của bạn
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={this.handleLogin}>
            Gửi Góp Ý
          </Text>
        </TouchableOpacity>
        ;
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

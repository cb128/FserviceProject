import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigate('Details')}>
            Go to Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => goBack()}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#4f83cc',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default HomeScreen;

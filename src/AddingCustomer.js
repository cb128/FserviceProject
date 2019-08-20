/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

class AddingCustomer extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'My Profile!',
    headerRight: (
      <TouchableOpacity
        style={{backgroundColor: '#ffb900', marginRight: 15}}
        onPress={() => navigation.goBack()}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
          Lưu
        </Text>
      </TouchableOpacity>
    ),
  });

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Adding Customer Screen</Text>
      </View>
    );
  }
}

export default AddingCustomer;

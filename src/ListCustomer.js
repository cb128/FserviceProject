import React from 'react';
import {View, Button, FlatList} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

class ListCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'My Profile!',
    headerRight: (
      <Icon
        name="person-add"
        color="black"
        onPress={() => {
          navigation.navigate('AddingCustomer');
        }}
      />
    ),
  });

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      leftAvatar={{source: {uri: item.avatar_url}}}
      containerStyle={{borderBottomWidth: 1}}
    />
  );

  render() {
    let list = [
      {
        name: 'Amy Farha',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
      },
      {
        name: 'Chris Jackson',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
    ];
    return (
      <View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default ListCustomer;

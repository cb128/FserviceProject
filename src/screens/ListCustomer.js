import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';

class ListCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      search: '',
      error: null,
      refreshing: false,
    };
    this.arrayUser = [];
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerRight: (
      <Icon
        name="person-add"
        color="black"
        underlayColor="#ffb900"
        // eslint-disable-next-line react-native/no-inline-styles
        iconStyle={{marginRight: 15}}
        onPress={() => {
          navigation.navigate('AddingCustomer');
        }}
      />
    ),
  });

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {
            this.arrayUser = responseJson;
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.title}
      leftAvatar={{
        source: {
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        },
      }}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.ratingText}>Ma khach hang</Text>
          <Text style={styles.ratingText}>So dien thoai</Text>
          <Text style={styles.ratingText}>DOB day</Text>
        </View>
      }
      containerStyle={{borderBottomWidth: 1}}
    />
  );

  searchFilterFunction(text) {
    //passing the inserted text in text input
    const newData = this.arrayUser.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }
  ListViewItemSeparator = () => {
    //Item separator view
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  render() {
    return (
      <View>
        <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={text => this.searchFilterFunction(text)}
          onClear={text => this.searchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'column',
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

export default ListCustomer;

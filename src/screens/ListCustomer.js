import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomerItem from '../components/CustomerItem';
import ProjectListItem from '../components/ProjectListItem';

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
          navigation.navigate('AddingCustomer', {title: 'Thêm Khách Hàng'});
        }}
      />
    ),
  });

  componentDidMount() {
    this.getListCustomer();
  }

  getListCustomer = () => {
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
  };

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  _goToUpdateCustomer = item => {
    this.props.navigation.navigate('AddingCustomer', {
      title: 'Chỉnh Sửa Thông Tin',
      data: item,
    });
  };

  _goToCustomerProfile = item => {
    alert('Go To Profile');
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <CustomerItem
      key={item.id}
      customer={item}
      goToProfile={this._goToCustomerProfile}
      editCustomer={this._goToUpdateCustomer}
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

  render() {
    return (
      <View>
        <View style={styles.headerView}>
          <View style={{justifyContent: 'center', marginRight: 15, flex: 1}}>
            <Text style={{textAlign: 'right'}}>Chiến dịch</Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'right',
              }}>
              FU-OFFLINE
            </Text>
          </View>
          <View style={{justifyContent: 'center', marginLeft: 15, flex: 1}}>
            <Text style={{textAlign: 'left'}}>Số Khách hàng</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left'}}>
              100
            </Text>
          </View>
        </View>
        <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={text => this.searchFilterFunction(text)}
          onClear={text => this.searchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
          containerStyle={{backgroundColor: '#ffffff'}}
          // eslint-disable-next-line react-native/no-inline-styles
          inputContainerStyle={{backgroundColor: '#e6e6e6'}}
          lightTheme
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
  headerView: {
    backgroundColor: '#ffb900',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20,
  },
  subtitleView: {
    flexDirection: 'column',
    paddingTop: 5,
  },
});

export default ListCustomer;

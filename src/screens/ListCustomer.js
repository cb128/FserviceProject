import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomerItem from '../components/CustomerItem';
import ProjectListItem from '../components/ProjectListItem';
import { getListCustomerData } from '../api/ApiHelpers';

class ListCustomer extends React.Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;

    this.state = {
      data: [],
      isLoading: false,
      search: '',
      error: null,
      refreshing: false,
      projectCode: navigation.getParam('projectCode', ''),
      projectName: navigation.getParam('projectName', ''),
      allCustomer: navigation.getParam('allCustomer', ''),
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
    console.log("================= componentDidMount ==============");
    this._fetchCustomer();
  }

  _fetchCustomer = async () => {
    console.log("================= _fetchCustomer ==============");
    let response = await getListCustomerData(this.state.projectCode, 0, 50);
    console.log("================= getListCustomer ==============");
    console.log(response);
    let responseData = await response.json();
    console.log(responseData);
    
    if (responseData && responseData.Data && responseData.Data.List) {
      const data = [];
      responseData.Data.List.forEach(e => {
        const cus = {
          id: e.SupplierID,
          name: e.SupplierName,
          status: e.TrangThaiID,
          phone: e.Phone,
          lastmodifieddate: e.NgayGio
        }
        data.push(cus);
      });

      this.setState({
        data: data,
        isLoading: false,
      });
      console.log("================= state ==============");
      console.log(this.state.data);
    }
    else{
      this.setState({
        isLoading: false,
      });
    }

    // const data = [];
    //   fakeCustomer.forEach(e => {
    //     const cus = {
    //       id: e.SupplierID,
    //       name: e.SupplierName,
    //       status: e.TrangThaiID,
    //       phone: e.Phone,
    //       lastmodifieddate: e.NgayGio
    //     }
    //     data.push(cus);
    //   });

    //   this.setState({
    //     data: data,
    //     isLoading: false,
    //   });
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
      data: newData,
      search: text,
    });
  }

  render() {
    console.log("====================render===============");
    return (
      <View>
        <View style={styles.headerView}>
          <View style={{justifyContent: 'center', marginRight: 15, flex: 1}}>
            <Text style={{textAlign: 'right'}}>Dự án</Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'right',
              }}>
              {this.state.projectName}
            </Text>
          </View>
          <View style={{justifyContent: 'center', marginLeft: 15, flex: 1}}>
            <Text style={{textAlign: 'left'}}>Số Khách hàng</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left'}}>
              {this.state.allCustomer}
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
          data={this.state.data}
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

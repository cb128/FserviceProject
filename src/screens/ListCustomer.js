import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Spinner,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomerItem from '../components/CustomerItem';
import ProjectListItem from '../components/ProjectListItem';
import {getListCustomerData} from '../api/ApiHelpers';

class ListCustomer extends React.Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;

    this.state = {
      data: [],
      searchData: [],
      isLoading: true,
      showLoadMore: true,
      loadingMore: false,
      search: '',
      error: null,
      refreshing: false,
      begin: 0,
      projectCode: navigation.getParam('projectCode', ''),
      projectName: navigation.getParam('projectName', ''),
      allCustomer: navigation.getParam('allCustomer', ''),
    };
    this.arrayUser = [];
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: `${navigation.state.params.projectName.toUpperCase()}`,
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
    console.log('================= componentDidMount ==============');
    this._fetchCustomer();
  }

  _loadMore = () => {
    console.log(this.state);
    if (this.state.search) {
      return;
    }
    if (this.state.isLoading || this.state.loadingMore) return false;
    let begin = this.state.begin + 21;
    this.setState({begin: begin, loadingMore: true}, () => {
      this._fetchCustomer();
    });
  };

  _fetchCustomer = async () => {
    let response = await getListCustomerData(
      this.state.projectCode,
      this.state.begin,
      this.state.begin + 20,
    );
    let responseData = await response.json();
    console.log(responseData);

    if (responseData && responseData.Data && responseData.Data.List) {
      const data = [];
      responseData.Data.List.forEach(e => {
        const cus = {
          id: e.SupplierID,
          name: e.SupplierName,
          gender: e.GioiTinh,
          status: e.TrangThaiID,
          childStatus: e.TrangThaiChildID,
          phone: e.Phone,
          lastmodifieddate: e.NgayGioGoi,
          note: e.GhiChu,
          data: e,
        };
        data.push(cus);
      });

      this.setState(state => ({
        data: !state.loadingMore ? data : [...state.data, ...data],
        searchData: !state.loadingMore ? data : [...state.data, ...data],
        isLoading: false,
        loadingMore: false,
      }));
    } else {
      this.setState({
        isLoading: false,
        loadingMore: false,
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
      title: item.name,
      data: item.data,
      projectCode: this.state.projectCode,
    });
  };

  _callCustomer = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
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
      callCustomer={this._callCustomer}
    />
  );

  searchFilterFunction(text) {
    let newData = [];
    if (text === '') {
      newData = this.state.searchData;
    } else {
      //passing the inserted text in text input
      newData = this.state.searchData.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    }
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      data: newData,
      search: text,
    });
  }
  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loadingMore) return null;
    return <ActivityIndicator style={{color: '#000', height: 20}} />;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <View style={styles.headerView}>
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
        </View> */}
        <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={text => this.searchFilterFunction(text)}
          onClear={text => {
            this.searchFilterFunction('');
            // this.setState({
            //   begin: 0,
            // });
            // this._fetchCustomer();
          }}
          placeholder="Tìm kiếm..."
          value={this.state.search}
          containerStyle={{backgroundColor: '#ffffff'}}
          // eslint-disable-next-line react-native/no-inline-styles
          inputContainerStyle={{backgroundColor: '#e6e6e6'}}
          lightTheme
        />
        <ActivityIndicator
          size="large"
          color="black"
          animating={this.state.isLoading}
          style={styles.activityIndicator}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
          style={styles.content}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.4}
          onEndReached={this._loadMore}
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
  activityIndicator: {
    position: 'absolute',
    marginLeft: Dimensions.get('window').width / 2 - 10,
    marginTop: Dimensions.get('window').height / 2 - 10,
  },
  content: {},
  loadMore: {
    color: '#fff',
    backgroundColor: '#ffb900',
    textAlign: 'center',
    paddingTop: 7,
    paddingBottom: 7,
  },
});

export default ListCustomer;

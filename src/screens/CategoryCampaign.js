import React from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import CategoryListItem from '../components/CategoryListItem';
import {getListGroup} from '../api/ApiHelpers';

class CategoryCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
            type="material"
            color="black"
            // eslint-disable-next-line react-native/no-inline-styles
            iconStyle={{marginLeft: 15}}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <Icon
          name="person-add"
          color="black"
          underlayColor="#ffb900"
          // eslint-disable-next-line react-native/no-inline-styles
          iconStyle={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('AddingCustomer', {
              title: 'Thêm Khách Hàng',
              refreshPage: () => {},
            });
          }}
        />
      ),
    };
  };

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = async () => {
    let response = await getListGroup();
    let responseData = await response.json();
    if (responseData) {
      const data = responseData.filter(
        x => x.NhomNganhID !== 3 && x.NhomNganhID !== 5,
      );
      this.setState({
        dataSource: data,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  keyExtractor = (item, index) => index.toString();

  _goToListCampaign = item => {
    this.props.navigation.navigate('ListCampaign', {
      nhomNganhID: item.NhomNganhID,
      title: item.TenNhomNganh,
    });
  };

  renderItem = ({item}) => (
    <CategoryListItem
      key={item.NhomNganhID}
      category={item}
      onClick={this._goToListCampaign}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="black"
          animating={this.state.loading}
          style={styles.activityIndicator}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 10}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e8ee',
  },
  activityIndicator: {
    position: 'absolute',
    marginLeft: Dimensions.get('window').width / 2 - 10,
    marginTop: Dimensions.get('window').height / 2 - 10,
  },
  itemStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 70,
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 3,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});

export default CategoryCampaign;

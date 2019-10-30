import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {getStatusProject} from '../api/ApiHelpers';
import {getObjectFromArrayById} from '../ulti/index';
import detailCampaign from '../constants/detailCampaign';

class DetailCampaign extends React.Component {
  key = 'TrangThaiID';

  constructor(props) {
    super(props);

    const {navigation} = this.props;

    this.state = {
      loading: true,
      data: [],
      error: null,
      refreshing: false,
      projectCode: navigation.getParam('projectCode', ''),
      projectName: navigation.getParam('projectName', ''),
      allCustomer: 0,
    };
  }

  // Set up navigation bar
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.projectName.toUpperCase()}`,
  });

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      leftIcon={{name: item.icon}}
      badge={{
        value: item.badgeValue,
        textStyle: {color: 'black'},
        status: 'warning',
        containerStyle: {alignItems: 'center'},
      }}
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{
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
      }}
      onPress={this._goToListCustomer}
    />
  );

  _goToListCustomer = () => {
    this.props.navigation.navigate('ListCustomer', {
      projectCode: this.state.projectCode,
      projectName: this.state.projectName,
      allCustomer: this.state.allCustomer,
    });
  };

  componentDidMount() {
    this.getDetailCampaign();
  }

  getDetailCampaign = async () => {
    let response = await getStatusProject(this.state.projectCode);
    let responseData = await response.json();

    if (responseData) {
      const data = [];

      const filter = responseData.filter(x => x.Tong !== 0);

      filter.forEach(e => {
        data.push({
          name: e.TenTrangThai,
          icon: 'people',
          badgeValue: e.Tong,
          key: 1,
        });
      });
      // All Customer
      const allCustomer = getObjectFromArrayById(
        filter,
        this.key,
        detailCampaign.ALL_CUSTOMER,
      );

      this.setState({
        data: data,
        loading: false,
        allCustomer: allCustomer['Tong'],
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, backgroundColor: '#e6e8ee'}}>
        <ActivityIndicator
          size="large"
          color="black"
          animating={this.state.loading}
          style={styles.activityIndicator}
        />
        <FlatList
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 10}}
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    marginLeft: Dimensions.get('window').width / 2 - 10,
    marginTop: Dimensions.get('window').height / 2 - 10,
  },
});

export default DetailCampaign;

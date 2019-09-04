import React from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {getDetailProject} from '../api/ApiHelpers';

class DetailCampaign extends React.Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      projectID: navigation.getParam('nhomNganhID', ''),
    };
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      leftIcon={{name: item.icon}}
      badge={{
        value: 100,
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
    this.props.navigation.navigate('ListCustomer');
  };

  componentDidMount() {
    // this.getDetailCampaign();
  }

  getDetailCampaign = async () => {
    let response = await getDetailProject(this.state.projectID);
    let responseData = await response.json();
    if (responseData) {
    }
  };

  render() {
    let list = [
      {
        name: 'Danh Sách Khách Hàng',
        icon: 'people',
        badgeValue: 100,
        key: 1,
      },
      {
        name: 'Cuộc Hẹn',
        icon: 'event-note',
        badgeValue: 100,
        key: 2,
      },
      {
        name: 'Đang Xử Lý',
        icon: 'loop',
        badgeValue: 100,
        key: 3,
      },
      {
        name: 'Đã Phê Duyệt',
        icon: 'assignment',
        badgeValue: 100,
        key: 4,
      },
      {
        name: 'Giải Ngân',
        icon: 'monetization-on',
        badgeValue: 100,
        key: 5,
      },
    ];
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, backgroundColor: '#e6e8ee'}}>
        <FlatList
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 10}}
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default DetailCampaign;

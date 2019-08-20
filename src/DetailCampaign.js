import React from 'react';
import {View, FlatList} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

class DetailCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
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
      }}
      onPress={() => this.props.navigation.navigate('ListCustomer')}
    />
  );
  componentDidMount() {
    this.getDetailCampaign();
  }

  getDetailCampaign = () => {};

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
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default DetailCampaign;

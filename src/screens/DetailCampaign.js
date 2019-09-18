import React from 'react';
import {View, FlatList} from 'react-native';
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
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      projectCode: navigation.getParam('projectCode', ''),
      projectName: navigation.getParam('projectName', ''),
      allCustomer: 0,
    };
  }
  
  static navigationOptions = () => ({
    title: this.state.projectName
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
      // All Customer 
      const allCustomer = getObjectFromArrayById(responseData, this.key, detailCampaign.ALL_CUSTOMER);
      if (allCustomer) {
        data.push({
          name: 'Danh Sách Khách Hàng',
          icon: 'people',
          badgeValue: allCustomer['Tong'],
          key: 1,
        });
      }
      
      // Appointment
      const appointment = getObjectFromArrayById(responseData, this.key, detailCampaign.APPOINTMENT);
      if (appointment) {
        data.push({
          name: 'Cuộc Hẹn',
          icon: 'event-note',
          badgeValue: appointment['Tong'],
          key: 1,
        });
      }
      
      // Inprogress
      const inprogress = getObjectFromArrayById(responseData, this.key, detailCampaign.INPROGRESS);
      if (inprogress) {
        data.push({
          name: 'Đang Xử Lý',
          icon: 'loop',
          badgeValue: inprogress['Tong'],
          key: 1,
        });
      }
      
      // Approval
      const approval = getObjectFromArrayById(responseData, this.key, detailCampaign.APPROVAL);
      if (approval) {
        data.push({
          name: 'Đã Phê Duyệt',
          icon: 'assignment',
          badgeValue: approval['Tong'],
          key: 1,
        });
      }

      // Disbursement
      const disbursement = getObjectFromArrayById(responseData, this.key, detailCampaign.DISBURSEMENT);
      if (disbursement) {
        data.push({
          name: 'Giải Ngân',
          icon: 'monetization-on',
          badgeValue: disbursement['Tong'],
          key: 1,
        });
      }
      this.setState({
        data: data,
        loading: false,
        allCustomer: allCustomer['Tong'],
      });
    }
    else{
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, backgroundColor: '#e6e8ee'}}>
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

export default DetailCampaign;

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import { getObjectFromArrayById } from '../ulti';
import contractStatus from '../constants/contractStatus';
import moment from "moment";

export default class CustomerItem extends React.Component {
  goToProfile = () => {
    this.props.goToProfile(this.props.customer);
  };

  editCustomer = () => {
    this.props.editCustomer(this.props.customer);
  };

  callCustomer = () => {
    this.props.callCustomer(this.props.customer.phone);
  }

  render() {
    console.log(this.props.customer);
    const currentStatus = getObjectFromArrayById(contractStatus, 'TrangThaiID', this.props.customer.status);
    console.log(currentStatus);
    return (
      <ListItem
        title={this.props.customer.name}
        titleStyle={{fontWeight: 'bold'}}
        leftAvatar={{
          source: {
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          },
        }}
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.phone}>{this.props.customer.phone ? this.props.customer.phone : 'Không có'} </Text> 
            <Text style={styles.ratingText}>{currentStatus ? currentStatus.TenTrangThai : 'Mới tạo'} </Text>  
            <Text style={styles.ratingText}>{'Ngày cập nhập: ' + moment(this.props.customer.lastmodifieddate).format('hh:mm DD/MM/YYYY')} </Text>
          </View>
        }
        rightElement={() => (
          <TouchableOpacity onPress={this.callCustomer}>
            <Icon name="phone" type="material-community" size={30} />
          </TouchableOpacity>
        )}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{borderBottomWidth: 1}}
        onPress={this.editCustomer}
      />
    );
  }
}

CustomerItem.propTypes = {
  customer: PropTypes.object.isRequired,
  goToProfile: PropTypes.func.isRequired,
  editCustomer: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e8ee',
  },
  subtitleView: {},
  ratingText: {},
  phone: {
    color: '#005ba6'
  }
});

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {getObjectFromArrayById} from '../ulti';
import contractStatus from '../constants/contractStatus';
import contractChildStatus from '../constants/contractChildStatus';
import moment from 'moment';
import manImg from '../assets/images/khachnam.png';
import womanImg from '../assets/images/khachnu.png';

export default class CustomerItem extends React.Component {
  goToProfile = () => {
    this.props.goToProfile(this.props.customer);
  };

  editCustomer = () => {
    this.props.editCustomer(this.props.customer);
  };

  callCustomer = () => {
    this.props.callCustomer(this.props.customer.phone);
  };

  render() {
    let currentChildStatus = null;
    const datetime = this.props.customer.lastmodifieddate
      ? moment(this.props.customer.lastmodifieddate).format('hh:mm DD/MM/YYYY')
      : 'null';

    const currentStatus = getObjectFromArrayById(
      contractStatus,
      'TrangThaiID',
      this.props.customer.status,
    );
    const childStatus = getObjectFromArrayById(
      contractChildStatus,
      'parent',
      this.props.customer.status,
    );
    if (childStatus.value.length > 0) {
      currentChildStatus = getObjectFromArrayById(
        childStatus.value,
        'TrangThaiID',
        this.props.customer.childStatus,
      );
    }
    return (
      <ListItem
        title={this.props.customer.name}
        titleStyle={{fontWeight: 'bold'}}
        leftAvatar={{
          source: {
            manImg,
          },
        }}
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.phone}>
              {this.props.customer.phone
                ? this.props.customer.phone
                : 'Không có'}{' '}
            </Text>
            <Text style={styles.ratingText}>
              {currentStatus ? currentStatus.TenTrangThai : ''}{' '}
            </Text>
            {currentChildStatus && (
              <Text style={styles.ratingText}>
                {currentChildStatus.TenTrangThai}
              </Text>
            )}
            {this.props.customer.note && (
              <Text style={styles.ratingText}>{this.props.customer.note}</Text>
            )}
            <Text style={styles.ratingText}>
              {'Ngày cập nhập: '}
              {datetime}
            </Text>
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
    color: '#005ba6',
  },
});

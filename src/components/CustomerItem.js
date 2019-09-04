import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

export default class CustomerItem extends React.Component {
  goToProfile = () => {
    this.props.goToProfile(this.props.customer);
  };

  editCustomer = () => {
    this.props.editCustomer(this.props.customer);
  };

  render() {
    return (
      <ListItem
        title={this.props.customer.title}
        titleStyle={{fontWeight: 'bold'}}
        leftAvatar={{
          source: {
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          },
        }}
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.ratingText}>Mã Khách Hàng</Text>
            <Text style={styles.ratingText}>Số Điện Thoại</Text>
            <Text style={styles.ratingText}>Ngày Tạo HS</Text>
            <Text style={styles.ratingText}>Ngày Cập Nhập HS</Text>
          </View>
        }
        rightElement={() => (
          <TouchableOpacity onPress={this.editCustomer}>
            <Icon name="account-edit" type="material-community" size={30} />
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
});

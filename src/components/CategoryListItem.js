import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Dimensions} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

export default class CategoryListItem extends React.Component {
  onClickItem = () => {
    this.props.onClick(this.props.category);
  };

  render() {
    return (
      <ListItem
        title={this.props.category.TenNhomNganh.toUpperCase()}
        leftIcon={<Icon name={'record-voice-over'} />}
        rightIcon={<Icon name={'chevron-right'} />}
        titleStyle={styles.titleStyle}
        containerStyle={styles.itemStyle}
        onPress={this.onClickItem}
      />
    );
  }
}

CategoryListItem.propTypes = {
  category: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e8ee',
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

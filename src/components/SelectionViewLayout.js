import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class SelectionViewLayout extends React.Component {
  onClickItem = () => {
    this.props.onClick(this.props.value);
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={this.onClickItem}>
          <Text style={styles.inputStyle}>Chưa có thông tin</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  }
}

SelectionViewLayout.propTypes = {
  value: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e8ee',
  },
  touchableStyle: {
    marginRight: 20,
  },
  inputStyle: {
    marginLeft: 23,
    marginTop: 10,
    color: 'gray',
    fontSize: 16,
  },
  separator: {
    marginLeft: 20,
    marginTop: 10,
    height: 1,
    backgroundColor: 'gray',
  },
});

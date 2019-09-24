import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import {Divider} from 'react-native-elements';

class SelectionScreen extends React.Component {
  componentDidMount() {}

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.titleString}`,
  });
  keyExtractor = (item, index) => index.toString();
  renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress={this._goBack(item.id)}>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
        <Divider />
      </View>
    );
  };

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {navigation} = this.props;
    const dataSource = navigation.getParam('dataItem', {});
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={dataSource}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {fontWeight: 'bold', marginLeft: 20, marginVertical: 20},
});

export default SelectionScreen;

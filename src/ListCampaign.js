import React from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

class ListCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      leftIcon={<Icon name={'record-voice-over'} />}
      rightIcon={<Icon name={'chevron-right'} />}
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
      }}
      onPress={() => this.props.navigation.navigate('DetailCampaign')}
    />
  );

  componentDidMount() {
    this.getListCampaign();
  }

  getListCampaign = () => {};

  render() {
    let list = [
      {
        name: 'FUOFFLINE',
        icon: 'campaign',
      },
      {
        name: 'TPBANK',
        icon: 'campaign',
      },
      {
        name: 'OCBBANK',
        icon: 'campaign',
      },
      {
        name: 'ACBBANK',
        icon: 'campaign',
      },
    ];
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e8ee',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#ffb900',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
});

export default ListCampaign;

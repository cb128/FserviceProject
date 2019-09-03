import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {getListGroup} from '../api/ApiHelpers';

class CategoryCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
            type="material"
            color="black"
            // eslint-disable-next-line react-native/no-inline-styles
            iconStyle={{marginLeft: 15}}
          />
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = async () => {
    let response = await getListGroup();
    let responseData = await response.json();
    if (responseData) {
      this.setState({
        dataSource: responseData,
      });
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.TenNhomNganh}
      leftIcon={<Icon name={'record-voice-over'} />}
      rightIcon={<Icon name={'chevron-right'} />}
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
      onPress={() =>
        this.props.navigation.navigate('ListCampaign', {
          nhomNganhID: item.NhomNganhID,
        })
      }
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 10}}
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

export default CategoryCampaign;

import React from 'react';
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {getListProject} from '../api/ApiHelpers';

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
      title={item.TenNhomKhachHang}
      leftIcon={<Icon name="project" type="octicon" />}
      rightIcon={<Icon name="chevron-right" />}
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
      onPress={() => this.props.navigation.navigate('DetailCampaign')}
    />
  );

  async componentDidMount() {
    this.getListCampaign();
  }

  getListCampaign = async () => {
    let nhomNganhID = this.props.navigation.getParam('nhomNganhID', '');
    let response = await getListProject(nhomNganhID);
    let responseData = await response.json();
    if (responseData) {
      this.setState({
        data: responseData,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.data}
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

export default ListCampaign;

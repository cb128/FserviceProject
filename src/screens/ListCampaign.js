import React from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {getListProject} from '../api/ApiHelpers';

class ListCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      titleStyle={styles.titleStyle}
      containerStyle={styles.itemStyle}
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
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="black"
          animating={this.state.loading}
          style={styles.activityIndicator}
        />
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
  activityIndicator: {
    position: 'absolute',
    marginLeft: Dimensions.get('window').width / 2 - 10,
    marginTop: Dimensions.get('window').height / 2 - 10,
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

export default ListCampaign;

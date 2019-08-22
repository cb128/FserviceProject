import React from 'react';
import {View, FlatList, Alert, StyleSheet} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

const logoutApp = () => {
  Alert.alert(
    'Bạn có muốn thoát ứng dụng không?',
    '',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.props.navigation.navigate('Auth')},
    ],
    {cancelable: false},
  );
};

let _this = null;

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

  _showalert() {
    Alert.alert(
      'Bạn có muốn thoát ứng dụng không?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.navigate('Auth');
          },
        },
      ],
      {cancelable: false},
    );
  }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      headerTitle: 'New Task',
      headerRight: (
        <Icon
          name="exit-to-app"
          color="black"
          underlayColor="#ffb900"
          iconStyle={{marginRight: 15}}
          onPress={() => state.params.handleLogout()}
        />
      ),
    };
  };

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

  componentDidMount() {
    this.props.navigation.setParams({handleLogout: () => this._showalert()});
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

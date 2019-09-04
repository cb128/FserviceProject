import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
  Linking,
  StyleSheet,
} from 'react-native';
import {Icon, Image, Divider} from 'react-native-elements';
import placeHolderImage from '../assets/images/img_placeholder_user.png';

const arrUserData = [
  {name: 'Nguyen Van A', image: ''},
  {title: 'Phong Ban', value: 'Kinh Doanh'},
  {title: 'Chuc Vu', value: 'Leader'},
  {title: 'Ngay Vao Lam', value: '1/1/2019'},
  {title: 'Line', value: '111'},
  {title: 'Don Vi', value: 'CALL CENTER FSERVICES'},
];

const arrCustomerData = [
  {name: 'Nguyen Thi B', image: '', phone: '0352501670'},
  {title: 'Ma Khach Hang', value: 'KH123456'},
  {title: 'CMND', value: '214234156'},
  {title: 'Gioi Tinh', value: 'Nu'},
  {title: 'Email', value: 'khfservices@gmail.com'},
  {title: 'Dia Chi', value: '10A PHAN NGỮ, P. ĐA KAO, QUẬN 1'},
  {title: 'Ngay Them Vao', value: '01/01/2019'},
  {title: 'Ngay Cap Nhat', value: '01/09/2019'},
];

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    this.state = {
      dataSource: navigation.getParam('arrayData', []),
      isCustomerProfile: navigation.getParam('isCumtomer', 'false'),
    };
  }

  keyExtractor = (item, index) => index.toString();

  renderCamera = ({item}) => {
    if (this.state.isCustomerProfile) {
      return (
        <TouchableOpacity
          style={styles.cameraView}
          onPress={() => {
            Linking.openURL(`tel:${item.phone}`);
          }}>
          <Icon name="phone" type="entypo" size={20} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  renderItem = ({item, index}) => {
    let tmpLayout;
    if (index === 0) {
      // Header layout
      tmpLayout = (
        <View style={styles.headerView}>
          <Image
            source={
              item.image && item.image.includes('http')
                ? {uri: item.image}
                : placeHolderImage
            }
            style={styles.imageView}
          />
          {this.renderCamera({item})}
          <Text style={styles.username}>{item.name}</Text>
        </View>
      );
    } else {
      // Information layout
      tmpLayout = (
        <View>
          <Text style={styles.headerLabel}>{item.title}</Text>
          <Text style={styles.subLabel}>{item.value}</Text>
          <Divider style={styles.separator} />
        </View>
      );
    }

    return <View>{tmpLayout}</View>;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    alignItems: 'center',
    backgroundColor: '#ffb900',
  },
  username: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageView: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  footerContainer: {
    padding: 20,
    height: 50,
    backgroundColor: '#ffb900',
    justifyContent: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerLabel: {
    marginLeft: 20,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subLabel: {
    marginLeft: 20,
    marginVertical: 5,
    color: 'gray',
  },
  separator: {
    marginLeft: 20,
  },
  cameraView: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 55,
    right: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: 'center',
  },
});

export default Profile;

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Icon, Image, Divider} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import placeHolderImage from '../assets/images/img_placeholder_user.png';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarPath: '',
      name: '',
      arrUserData: [],
    };
  }

  componentDidMount() {
    let localData = this.getUserData();
    if (localData) {
      localData.then(data => {
        this.setState({
          name: data.hoTen,
          avatarPath: data.hinh,
          arrUserData: [
            {name: data.hoTen, image: data.hinh},
            {title: 'Phòng Ban', value: data.tenPhongBan},
            {title: 'Chức Vụ', value: data.tenChucVu},
            {title: 'Ngày Vào Làm', value: data.ngayVaoLam},
            {title: 'Line', value: data.line},
            {title: 'Đơn Vị', value: data.tenDonVi},
          ],
        });
      });
    }
  }

  showAlert = () => {
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
            this.removeUserData();
            this.props.navigation.navigate('Auth');
          },
        },
      ],
      {cancelable: false},
    );
  };

  getUserData = async () => {
    let userData;
    try {
      const retrievedItem = await AsyncStorage.getItem('loginDetails');
      userData = JSON.parse(retrievedItem);
    } catch (exception) {
      console.log('Error');
    }

    return userData;
  };

  removeUserData = () => {
    try {
      AsyncStorage.removeItem('loginDetails');
    } catch (exception) {}
  };

  _goToProfile = () => {
    this.props.navigation.navigate('Profile', {
      isCumtomer: false,
      arrayData: this.state.arrUserData,
    });
  };

  _goToChangePasswordScreen = () => {
    this.props.navigation.navigate('ChangePassword');
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerView}>
            <Image
              source={
                this.state.avatarPath.includes('http')
                  ? {uri: this.state.avatarPath}
                  : placeHolderImage
              }
              style={styles.imageView}
            />
            <Text style={styles.username}>{this.state.name}</Text>
          </View>
          <TouchableOpacity style={styles.menuItem} onPress={this._goToProfile}>
            <Icon
              containerStyle={styles.typeIcon}
              name="md-person"
              type="ionicon"
              size={24}
            />
            <Text style={styles.menuText}>Trang Cá Nhân</Text>
          </TouchableOpacity>
          <Divider style={styles.separator} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={this._goToChangePasswordScreen}>
            <Icon
              containerStyle={styles.typeIcon}
              name="md-settings"
              type="ionicon"
              size={24}
            />
            <Text style={styles.menuText}>Đổi Mật Khẩu</Text>
          </TouchableOpacity>
          <Divider style={styles.separator} />
          <TouchableOpacity style={styles.menuItem} onPress={this.showAlert}>
            <Icon
              containerStyle={styles.typeIcon}
              name="logout"
              type="material-community"
              size={24}
            />
            <Text style={styles.menuText}>Đăng xuất</Text>
          </TouchableOpacity>
          <Divider style={styles.separator} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    width: 100,
    height: 100,
    marginLeft: 20,
    marginVertical: 20,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffb900',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingLeft: 15,
    paddingHorizontal: 5,
  },
  typeIcon: {},
  menuText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 2,
  },
  username: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SideMenu;

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
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
            {title: 'Mã Nhân viên', value: data.maNguoiDung},
            {title: 'Số ĐTDĐ', value: data.phone},
            {title: 'Chức vụ', value: data.tenChucVu},
            {title: 'Email', value: data.emailResponse},
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
      title: this.state.name,
    });
  };

  _goToChangePasswordScreen = () => {
    this.props.navigation.navigate('ChangePassword');
  };

  _closeMenu = () => {
    this.props.navigation.closeDrawer();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerView}>
            <TouchableOpacity
              onPress={this._closeMenu}
              style={styles.toggleView}>
              <Icon
                name="menu"
                type="material"
                color="black"
                containerStyle={styles.toggleButton}
              />
            </TouchableOpacity>
            <View style={styles.contentView}>
              <Image
                source={
                  this.state.avatarPath.includes('http')
                    ? {uri: this.state.avatarPath}
                    : placeHolderImage
                }
                style={styles.imageView}
              />
            </View>
            <View style={styles.contentView}>
              <Text style={styles.username}>{this.state.name}</Text>
            </View>
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
    width: 40,
    height: 40,
    marginLeft: 20,
    marginVertical: 20,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  headerView: {
    backgroundColor: '#ffb900',
  },
  toggleView: {
    height: 30,
  },
  toggleButton: {
    marginTop: 10,
    marginRight: 10,
    alignItems: 'flex-end',
  },
  contentView: {
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

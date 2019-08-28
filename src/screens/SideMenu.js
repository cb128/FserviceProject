import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Image} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import placeHolderImage from '../assets/images/img_placeholder_user.png';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarPath: {},
    };
  }

  showAlert() {
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
  }

  removeUserData = () => {
    try {
      AsyncStorage.removeItem('loginDetails');
    } catch (exception) {}
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerView}>
            <Image
              source={
                this.state.avatarPath.uri
                  ? {uri: this.state.avatarPath.uri}
                  : placeHolderImage
              }
              style={styles.imageView}
            />
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
              Nguyen Van A
            </Text>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>Thông tin cá nhân</Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle}>Chức vụ: Leader</Text>
              <Text style={styles.navItemStyle}>Phòng ban: Sale</Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>Cài đặt</Text>
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => navigation.navigate('ChangePassword')}>
                Đổi mật khẩu
              </Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() => this.showAlert()}>
          <Text>Đăng xuất tài khoản</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navItemStyle: {
    padding: 10,
  },
  navSectionStyle: {},
  sectionHeadingStyle: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey',
  },
  imageView: {
    width: 100,
    height: 100,
    marginLeft: 20,
    marginVertical: 20,
    borderRadius: 50,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffb900',
  },
});

export default SideMenu;

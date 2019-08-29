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
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Profile')}>
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
            onPress={() => navigation.navigate('ChangePassword')}>
            <Icon
              containerStyle={styles.typeIcon}
              name="md-settings"
              type="ionicon"
              size={24}
            />
            <Text style={styles.menuText}>Đổi Mật Khẩu</Text>
          </TouchableOpacity>
          <Divider style={styles.separator} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.showAlert()}>
            <Icon
              containerStyle={styles.typeIcon}
              name="logout"
              type="material-community"
              size={24}
            />
            <Text style={styles.menuText}>Đổi Mật Khẩu</Text>
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
});

export default SideMenu;

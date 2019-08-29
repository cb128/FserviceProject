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
import placeHolderImage from '../assets/images/img_placeholder_user.png';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarPath: {},
    };
  }

  render() {
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
            <Text style={styles.username}>Nguyen Van A</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.footerContainer}>
          <Text style={styles.footerText}>GỌI KH</Text>
        </TouchableOpacity>
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
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 60,
  },
  footerContainer: {
    padding: 20,
    height: 60,
    backgroundColor: '#ffb900',
    justifyContent: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Profile;

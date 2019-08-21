/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';

class AddingCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerRight: (
      <TouchableOpacity
        style={{backgroundColor: '#ffb900', marginRight: 15}}
        onPress={() => navigation.goBack()}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
          Lưu
        </Text>
      </TouchableOpacity>
    ),
  });

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mã hiện thị khách hàng</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
        <Text style={styles.title}>Tên khách hàng</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
        <Text style={styles.title}>Số điện thoại</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
        <Text style={styles.title}>Số hợp đồng</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
        <Text style={styles.title}>Danh xưng</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
        <Text style={styles.title}>Địa chỉ</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
        <Text style={styles.title}>Nhóm khách hàng</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
        <Text style={styles.title}>Email</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
        <Text style={styles.title}>Ngày sinh</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
        <Text style={styles.title}>Giới tính</Text>
        <SegmentedControlTab
          values={['Nam', 'Nữ', 'Khác']}
          tabsContainerStyle={styles.segment}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
        <Text style={styles.title}>Nhân viên nhập liệu</Text>
        <Input
          style={styles.input}
          placeholder="Chưa có thông tin"
          onPress={null}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {marginLeft: 20, marginTop: 20, fontWeight: 'bold', fontSize: 16},
  input: {marginLeft: 20},
  segment: {marginLeft: 15, marginRight: 15, marginTop: 15},
});

export default AddingCustomer;

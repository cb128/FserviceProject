/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Input, Image} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import placeHolderImage from '../assets/images/img_placeholder_user.png';

class AddingCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenderIndex: 0,
      selectedCategoryIndex: 0,
    };
    this.phoneInfos = [
      {id: '1', title: 'TT cuộc gọi', value: ''},
      {id: '2', title: 'TT cuộc gọi con', value: ''},
      {id: '3', title: 'TT hợp đồng', value: ''},
      {id: '4', title: 'TT hợp đồng con', value: ''},
      {id: '5', title: 'Người lấy HS', value: ''},
    ];

    this.personalInfos = [
      {id: '1', title: 'Mã Khách hàng(*)', value: ''},
      {id: '2', title: 'Họ và tên(*)', value: ''},
      {id: '3', title: 'Ngày sinh', value: ''},
      {id: '4', title: 'Xưng hô', value: ''},
      {id: '5', title: 'Giới tính', value: ''},
      {id: '6', title: 'TT hôn nhân', value: ''},
      {id: '7', title: 'Điện thoại(*)', value: ''},
      {id: '8', title: 'Email', value: ''},
      {id: '9', title: 'CMND', value: ''},
      {id: '10', title: 'Ngày cấp', value: ''},
      {id: '11', title: 'Nơi cấp', value: ''},
      {id: '12', title: 'Sản phẩm', value: ''},
      {id: '13', title: 'Địa chỉ', value: ''},
      {id: '14', title: 'Tỉnh thảnh', value: ''},
      {id: '15', title: 'Quận/Huyện', value: ''},
      {id: '16', title: 'Đ/C liên hệ', value: ''},
      {id: '17', title: 'Gọi lại', value: ''},
      {id: '18', title: 'T/gian hẹn', value: ''},
      {id: '19', title: 'Địa chỉ hẹn', value: ''},
      {id: '20', title: 'Hạn mức', value: ''},
      {id: '11', title: 'Thu nhập', value: ''},
      {id: '22', title: 'Nguồn', value: ''},
      {id: '23', title: 'Đối tác', value: ''},
      {id: '24', title: 'Nghề nghiệp', value: ''},
      {id: '25', title: 'Công ty', value: ''},
      {id: '26', title: 'Số hợp đồng', value: ''},
      {id: '27', title: 'Ảnh chân dung', value: ''},
      {id: '28', title: 'Ảnh trước CMND', value: ''},
      {id: '29', title: 'Ảnh sau CMND', value: ''},
    ];

    this.categoryInfos = [{id: '1', title: 'Phân loại', value: ''}];
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

  updateGenderIndex(selectedGenderIndex) {
    this.setState({selectedGenderIndex});
  }

  updateCatergoryIndex(selectedCategoryIndex) {
    this.setState({selectedCategoryIndex});
  }

  renderItem = ({item, index, section}) => {
    const inputLayout = (
      <Input
        style={styles.input}
        placeholder="Chưa có thông tin"
        onPress={null}
      />
    );

    const imageLayout = (
      <Image source={placeHolderImage} style={styles.imageView} />
    );

    const {selectedGenderIndex} = this.state;
    const {selectedCategoryIndex} = this.state;

    const genderGroupLayout = (
      <SegmentedControlTab
        values={['Nam', 'Nữ']}
        tabsContainerStyle={styles.segment}
        selectedIndex={this.state.selectedGenderIndex}
        onTabPress={this.updateGenderIndex}
      />
    );

    const categoryGroupLayout = (
      <SegmentedControlTab
        values={['TSA', 'DSA']}
        tabsContainerStyle={styles.segment}
        selectedIndex={this.state.selectedCategoryIndex}
        onTabPress={this.pdateCatergoryIndex}
      />
    );

    let subView;
    if (section.index === 1 && item.id === '5') {
      subView = genderGroupLayout;
    } else if (
      section.index === 1 &&
      (item.id === '27' || item.id === '28' || item.id === '29')
    ) {
      subView = imageLayout;
    } else if (section.index === 2 && item.id === '1') {
      subView = categoryGroupLayout;
    } else {
      subView = inputLayout;
    }

    return (
      <View style={{marginTop: 5, marginBottom: 10}}>
        <Text style={styles.title}>{item.title}</Text>
        {subView}
      </View>
    );
  };

  render() {
    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={({section: {title}}) => (
          <View
            style={{
              height: 50,
              backgroundColor: '#e5e8ed',
              justifyContent: 'center',
            }}>
            <Text style={styles.SectionHeaderStyle}>{title}</Text>
          </View>
        )}
        sections={[
          {title: 'Thông tin cuộc gọi', data: this.phoneInfos, index: 0},
          {title: 'Thông tin cá nhân', data: this.personalInfos, index: 1},
          {title: 'Thông tin khác', data: this.categoryInfos, index: 2},
        ]}
        keyExtractor={(item, index) => item + index}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {marginLeft: 20, marginTop: 20, fontWeight: 'bold', fontSize: 16},
  input: {marginLeft: 20},
  segment: {marginLeft: 15, marginRight: 15, marginTop: 15},
  SectionHeaderStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: 5,
    color: 'black',
  },
  imageView: {
    width: 100,
    height: 100,
    marginLeft: 20,
    marginTop: 10,
  },
});

export default AddingCustomer;

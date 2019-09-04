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
import ImagePicker from 'react-native-image-picker';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import placeHolderImage from '../assets/images/img_placeholder_user.png';
import cameraImage from '../assets/images/ico_camera.png';

const arrayOption = [
  {id: '1', title: 'Option 1'},
  {id: '2', title: 'Option 2'},
  {id: '3', title: 'Option 3'},
  {id: '4', title: 'Option 4'},
  {id: '5', title: 'Option 5'},
  {id: '6', title: 'Option 6'},
];

class AddingCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenderIndex: 0,
      selectedCategoryIndex: 0,
      avatarSource: null,
      avatarPath: {},
      frontIDPath: {},
      bottomIDPath: {},
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

  // Set up navigation bar
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
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

  // Change state of the button group (segment control in ios)
  updateGenderIndex = index => {
    this.setState({
      ...this.state,
      selectedGenderIndex: index,
    });
  };

  updateCatergoryIndex = index => {
    this.setState({
      ...this.state,
      selectedCategoryIndex: index,
    });
  };

  // Get image from gallery
  chooseFile = ({item}) => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // eslint-disable-next-line no-alert
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        if (item.id === '27') {
          this.setState({
            avatarPath: source,
          });
        } else if (item.id === '28') {
          this.setState({
            frontIDPath: source,
          });
        } else if (item.id === '29') {
          this.setState({
            bottomIDPath: source,
          });
        }
      }
    });
  };

  _goToSelectionScreen = ({item}) => {
    this.props.navigation.navigate('SelectionScreen', {
      titleString: item.title,
      dataItem: arrayOption,
    });
  };

  // Render item for section list
  renderItem = ({item, section}) => {
    // input style
    const inputLayout = (
      <Input
        containerStyle={styles.input}
        inputStyle={{fontSize: 16}}
        placeholder="Chưa có thông tin"
      />
    );

    // selection style
    const selectionLayout = (
      <View>
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={this._goToSelectionScreen.bind(this, {item})}>
          <Text
            style={{
              marginLeft: 23,
              marginTop: 10,
              color: 'gray',
              fontSize: 16,
            }}>
            Chưa có thông tin
          </Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );

    // image style
    let imagePath = {};
    if (item.id === '27') {
      imagePath = this.state.avatarPath;
    } else if (item.id === '28') {
      imagePath = this.state.frontIDPath;
    } else if (item.id === '29') {
      imagePath = this.state.bottomIDPath;
    }

    const imageLayout = (
      <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
        <Image
          source={imagePath.uri ? {uri: imagePath.uri} : placeHolderImage}
          style={styles.imageView}
        />
        <TouchableOpacity onPress={this.chooseFile.bind(this, {item})}>
          <Image
            source={cameraImage}
            style={{width: 25, height: 25, marginLeft: 20}}
          />
        </TouchableOpacity>
      </View>
    );

    // button group type
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
        onTabPress={this.updateCatergoryIndex}
      />
    );

    let subView;
    if (section.index === 0) {
      subView = selectionLayout;
    } else if (section.index === 1 && item.id === '5') {
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
  input: {marginLeft: 10},
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
  separator: {
    marginLeft: 20,
    marginTop: 10,
    height: 1,
    backgroundColor: 'gray',
  },
});

export default AddingCustomer;

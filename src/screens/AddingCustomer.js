/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker
} from 'react-native';
import {Input, Image} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import placeHolderImage from '../assets/images/img_placeholder_user.png';
import cameraImage from '../assets/images/ico_camera.png';
import {initCustomerData, getListGroup, getListProject} from '../api/ApiHelpers';


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
      listOriginProject: [],

      // list init data
      listCategory: [],
      listProject: [],
      listCallStatus: [],
      listContractStatus: [],

      // project
      category: '',
      project: '',

      callStatus: '',
    };

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
      {id: '27', title: 'Ảnh', value: ''},
      {id: '28', title: 'File khác', value: ''},
    ];

    this.categoryInfos = [{id: '1', title: 'Phân loại', value: ''}];
  }

  componentDidMount() {
    this.getInitData();
    this.getInitCategory();
    this.getInitProject();
  }

  getInitData = async () => {
    let response = await initCustomerData();
    let responseData = await response.json();
    console.log('============================= add cus >> get init data >> response ==============');
    console.log(responseData);
    
    if (responseData) {

      this.setState({
        listCallStatus: responseData.listTrangThaiCuocGoi,
        listContractStatus: responseData.listTrangThaiHopDong,
        loading: false,
      });
    }
    else{
      this.setState({
        loading: false,
      });
    }
  };

  getInitCategory = async () => {
    let response = await getListGroup();
    let responseData = await response.json();
    if (responseData) {
      this.setState({
        listCategory: responseData,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };
  getInitProject = async () => {
    let response = await getListProject(1);
    let responseData = await response.json();
    if (responseData) {
      this.setState({
        listOriginProject: [...this.state.listOriginProject, ...responseData],
        listProject: responseData,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
    let response3 = await getListProject(3);
    let responseData3 = await response3.json();
    if (responseData3) {
      this.setState({
        listOriginProject: [...this.state.listOriginProject, ...responseData3],
      });
    } else {
      this.setState({
        loading: false,
      });
    }
    let response4 = await getListProject(4);
    let responseData4 = await response4.json();
    if (responseData4) {
      this.setState({
        listOriginProject: [...this.state.listOriginProject, ...responseData4],
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

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

  // render project
  renderProject = () =>{
    
    let categoryItems = this.state.listCategory.map( (i) => {
      return <Picker.Item key={i.NhomNganhID} value={i.NhomNganhID} label={i.TenNhomNganh} />
    });

    let projectItems = this.state.listOriginProject.map( (i) => {
      return <Picker.Item key={i.MaNhomKhachHang} value={i.MaNhomKhachHang} label={i.TenNhomKhachHang} />
    });

    return (
      <View>
        <View
            style={styles.sectionTitle}>
            <Text style={styles.SectionHeaderStyle}>Thông tin dự án</Text>
        </View>

        <View style={{marginTop: 5, marginBottom: 10}}>
          <Text style={styles.title}>Loại dự án</Text>
          <Picker
                selectedValue={this.state.category}
                onValueChange={ (value) => {
                  this.setState({ 
                    category: value,
                  });
                  } } >
                {categoryItems}
            </Picker>
        </View>

        <View style={{marginTop: 5, marginBottom: 10}}>
          <Text style={styles.title}>Dự án</Text>
          <Picker
                selectedValue={this.state.project}
                onValueChange={ (value) => { this.setState({ project: value}) } } >
                {projectItems}
            </Picker>
        </View>
      </View>
    );
  }

  // Render item for section list
  renderItem = ({item, section}) => {
    let subView;
    let selectItems;
    if (section.index === 0) {
      // Selection layout
      if(item.id === '1' || item.id === '2'){
        console.log(this.state.listCallStatus);
        selectItems = this.state.listCallStatus.map( (i) => {
          return <Picker.Item key={i.CICID} value={i.CICID} label={i.TenCIC} />
        });
      }
      if(item.id === '3' || item.id === '4'){
        item.data = this.state.listContractStatus;
      }
      subView = (
        <Picker
            selectedValue={item.value}
            onValueChange={ (value) => this.setState({phoneInfos: value}) } >

            {selectItems}

        </Picker>
      );
    } else if (section.index === 1 && item.id === '5') {
      // Gender segment
      subView = (
        <SegmentedControlTab
          values={['Nam', 'Nữ']}
          tabsContainerStyle={styles.segment}
          selectedIndex={this.state.selectedGenderIndex}
          onTabPress={this.updateGenderIndex}
        />
      );
    } else if ( section.index === 1 &&
      (item.id === '27' || item.id === '28' || item.id === '29')
    ) {
      // Case Select file or image
      let imagePath = {};
      if (item.id === '27') {
        imagePath = this.state.avatarPath;
      } else if (item.id === '28') {
        imagePath = this.state.frontIDPath;
      } else if (item.id === '29') {
        imagePath = this.state.bottomIDPath;
      }

      subView = (
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Image
            source={imagePath.uri ? {uri: imagePath.uri} : placeHolderImage}
            style={styles.imageView}
          />
          <TouchableOpacity onPress={this.chooseFile}>
            <Image
              source={cameraImage}
              style={{width: 25, height: 25, marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (section.index === 2 && item.id === '1') {
      // Category segment
      subView = (
        <SegmentedControlTab
          values={['TSA', 'DSA']}
          tabsContainerStyle={styles.segment}
          selectedIndex={this.state.selectedCategoryIndex}
          onTabPress={this.updateCatergoryIndex}
        />
      );
    } else {
      // Input layout
      subView = (
        <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
        />
      );
    }

    return (
      <View style={{marginTop: 5, marginBottom: 10}}>
        <Text style={styles.title}>{item.title}</Text>
        {subView}
      </View>
    );
  };

  render() {
    
    let selectItems;

    selectItems = this.state.listCallStatus.map( (i) => {
      return <Picker.Item key={i.CICID} value={i.CICID} label={i.TenCIC} />
    });

    return (
    <View>
      {this.renderProject()}

      <View
          style={{
            height: 50,
            backgroundColor: '#e5e8ed',
            justifyContent: 'center',
          }}>
          <Text style={styles.SectionHeaderStyle}>Thông tin cuộc gọi</Text>
      </View>

      <View style={{marginTop: 5, marginBottom: 10}}>
        <Text style={styles.title}>TT cuộc gọi</Text>
        <Picker
              selectedValue={this.state.callStatus}
              onValueChange={ (value) => { this.setState({ callStatus: value}) } } >

              {selectItems}

          </Picker>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    height: 50,
    backgroundColor: '#e5e8ed',
    justifyContent: 'center',
  },
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

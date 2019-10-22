/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import {Input, Image} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import documentImage from '../assets/images/ico_document.png';
import cameraImage from '../assets/images/ico_camera.png';
import DocumentPicker from 'react-native-document-picker';
import Autocomplete from 'react-native-autocomplete-input';
import {getObjectFromArrayById2, getObjectFromArrayById} from '../ulti/index';
import {
  initCustomerData,
  getListGroup,
  getListProject,
  postCustomer,
} from '../api/ApiHelpers';
import contractStatus from '../constants/contractStatus';
import contractChildStatus from '../constants/contractChildStatus';

class AddingCustomer extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      data: navigation.getParam('data', ''),
      projectCode: navigation.getParam('projectCode', ''),
      selectedGenderIndex: 0,
      selectedCategoryIndex: 0,
      imgPath: {},
      urlFile: '',
      listOriginProject: [],

      // list init data
      listCategory: [],
      listProject: [],
      listCallStatus: [],
      listContractStatus: [],
      listEmployees: [],
      autocompleteEmployee: [],

      // project
      category: '',
      project: '',

      // Call Status
      callStatus: '',
      callChildStatus: '',
      contractStatus: '',
      contractChildStatus: '',
      employeeGetContract: '',
      employeeGetContractName: '',

      query: '',
      hideAutocomplete: true,

      // Customer Info
      customerID: '',
      customername: '',
      customerDOB: '',
      customerpreName: '',
      customergender: 0,
      customermaritalStatus: '',
      customerphone: '',
      customeremail: '',
      customernationalId: '',
      customernationalDate: '',
      customernationalPlace: '',
      customerproduct: '',
      customeraddress: '',
      customerprovince: '',
      customerdistrict: '',
      customercall: '',
      customermeetTime: '',
      customermeetPlace: '',
      customercashLimit: '',
      customerloan: '',
      customerloanTime: '',
      customersalary: '',
      customersupplier: '',
      customerpartner: '',
      customerjob: '',
      customercompany: '',
      customercontractNumber: '',
      customernote: '',
      customerContractStatus: '',
      customerContractChildStatus: '',
    };
  }

  componentDidMount() {
    this.getInitData();
    // this.getInitCategory();
    this.getInitProject();
    this.loadCustomer();
    this.props.navigation.setParams({
      saveCustomer: this.saveCustomer,
    });
  }

  getInitData = async () => {
    let response = await initCustomerData();
    let responseData = await response.json();
    console.log(
      '============================= add cus >> get init data >> response ==============',
    );
    console.log(responseData);

    if (responseData) {
      this.setState({
        listCallStatus: responseData.listTrangThaiCuocGoi,
        listEmployees: responseData.listNguoiDung,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  // getInitContractStatus = async () => {
  //   let response = await getListGroup();
  //   let responseData = await response.json();
  //   if (responseData) {
  //     this.setState({
  //       listCategory: responseData,
  //     });
  //   } else {
  //     this.setState({
  //       loading: false,
  //     });
  //   }
  // };
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

  loadCustomer = () => {
    const data = this.state.data;
    if (data) {
      this.setState({
        project: this.state.projectCode,

        customerID: data.SupplierID ? data.SupplierID : '',
        customername: data.SupplierName ? data.SupplierName : '',
        customerDOB: data.Ngaysinh ? data.Ngaysinh : '',
        customerpreName: data.DanhXung ? data.DanhXung : '',
        customergender: data.GioiTinh ? 0 : 1,
        // customermaritalStatus: data.SupplierName ? data.SupplierName : '',
        customerphone: data.Phone ? data.Phone : '',
        customeremail: data.Email ? data.Email : '',
        customernationalId: data.CMND ? data.CMND : '',
        customernationalDate: data.NgayCapCMND ? data.NgayCapCMND : '',
        customernationalPlace: data.NoiCap ? data.NoiCap : '',
        // customerproduct: data.SupplierName ? data.SupplierName : '',
        customeraddress: data.So ? data.So : '',
        customerprovince: data.Tinh ? data.Tinh : '',
        customerdistrict: data.Quan ? data.Quan : '',
        // customercall: data.SupplierName ? data.SupplierName : '',
        // customermeetTime: data.SupplierName ? data.SupplierName : '',
        // customermeetPlace: data.SupplierName ? data.SupplierName : '',
        customercashLimit: data.HanMucVay ? data.HanMucVay : '',
        customerloan: data.KhoanVay ? data.KhoanVay : '',
        customerloanTime: data.ThoiGianVay ? data.ThoiGianVay : '',
        customersalary: data.ThuNhapHienTai ? data.ThuNhapHienTai : '',
        customersupplier: data.PTTT ? data.PTTT : '',
        // customerpartner: data.SupplierName ? data.SupplierName : '',
        customerjob: data.NgheNghiep ? data.NgheNghiep : '',
        customercompany: data.CongTyCongViec ? data.CongTyCongViec : '',
        customercontractNumber: data.SoHD ? data.SoHD : '',
        customernote: data.GhiChu ? data.GhiChu : '',
        employeeGetContract: data.NhanVienChamSocID ? data.NhanVienChamSocID : '',
        customerContractStatus: data.TrangThaiID ? data.TrangThaiID : '',
        customerContractChildStatus: data.TrangThaiChildID ? data.TrangThaiChildID : '',
      });
    }
  };

  // Set up navigation bar
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
    headerRight: (
      <TouchableOpacity
        style={{backgroundColor: '#ffb900', marginRight: 15}}
        onPress={() => {
          navigation.getParam('saveCustomer')();
        }}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
          Lưu
        </Text>
      </TouchableOpacity>
    ),
  });

  saveCustomer = async () => {
    if (this.state.customername === '') {
      Alert.alert(
        'Đã có lỗi',
        'Vui lòng nhập Họ và tên',
        [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      return;
    }
    if (this.state.customerphone === '') {
      Alert.alert(
        'Đã có lỗi',
        'Vui lòng nhập Điện thoại',
        [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      return;
    }
    console.log('========statte =============', this.state);
    const item = {
      SupplierID: this.state.customerID,
      SupplierName: this.state.customername,
      Phone: this.state.customerphone,
      So: this.state.customeraddress,
      Quan: this.state.customerdistrict,
      Tinh: this.state.customerprovince,
      NhomKhachHang: this.state.project,
      // Address: '',
      NgaySinh: this.state.customerDOB,
      NgayGioGoi: this.state.customercall,
      GioiTinh: this.state.customergender === 0 ? true : false,
      CMND: this.state.customernationalId,
      CongTyCongViec: this.state.customercompany,
      NgheNghiep: this.state.customerjob,
      // DoiTuongID: 1,
      GhiChu: this.state.customernote,
      // TongGhiChu: 0,
      // DanhGia: 0,
      // NguonID: 3,
      // TrangThaiID: 2,
      // TrangThaiChildID: 18,
      // AnhCaNhan: '',
      // AnhCMND: '',
      ThoiGianVay: this.state.customerloanTime,
      KhoanVay: this.state.customerloan,
      // DiaChiLienHe: '',
      // NhanVienLine: '',
      // ListTenSanPham: 'THE, Hóa Đơn Điện',
      // ListMaSanPham: 'THE, HDD',
      NhanVienChamSocID: this.state.employeeGetContract,
      // AnhMatTruocThe: '',
      DanhXung: this.state.customerpreName,
      Email: this.state.customeremail,
      // NgayGio: null,
      // CICID: null,
      // TenCIC: '',
      // CICChildID: null,
      // TenCICChild: '',
      NgayCapCMND: this.state.customernationalDate ? this.state.customernationalDate : null,
      NoiCap: this.state.customernationalPlace,
      // DiaChiHen: '',
      // ThoiGianHen: '2019-08-09T09:09:04',
      // ThoiGianNhac: '2019-09-19T20:08:04',
      // TinhTrangHonNhan: 0,
      HanMucVay: this.state.customercashLimit,
      ThuNhapHienTai: this.state.customersalary,
      Loai: 3,
      SoHD: this.state.customercontractNumber,
      NhanVienTaoID: 90,
    };

    if(this.state.imgPath.uri){
      item.AnhCMND = this.state.customername + '.png';
    }
    if(this.state.urlFile){
      item.AnhCaNhan = this.state.customername + '.pdf';
    }

    console.log('============item================', JSON.stringify(item));

    try {
      let funcName = 'insertCustomer';
      if (this.state.customerID) {
        funcName = 'updateCustomer';
      }
      let res = await postCustomer(funcName, JSON.stringify(item));
      let data = await res.json();
      console.log('res', data);
      if (!data.HasErrors) {
        Alert.alert(
          'Thành công',
          'Lưu thành công',
          [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.goBack();
              },
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Đã có lỗi',
          data.Errors[0],
          [
            {
              text: 'Ok',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      Alert.alert(
        'Đã có lỗi',
        error,
        [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      console.log(error);
    }

    // this.props.navigation.goBack();
  };

  // Change state of the button group (segment control in ios)
  updateGenderIndex = index => {
    this.setState({
      ...this.state,
      customergender: index,
    });
  };

  updateCatergoryIndex = index => {
    this.setState({
      ...this.state,
      selectedCategoryIndex: index,
    });
  };

  // Get image from gallery
  chooseImg = () => {
    var options = {
      title: 'Select Image',
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
      } else {
        // let source = response;
        // You can also display the image using data:
        let source = {uri: 'data:image/jpeg;base64,' + response.data};
        this.setState({
          imgPath: source,
        });
      }
    });
  };

  // chosse file
  chooseFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({
        urlFile: res.uri,
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  _filterData = query => {
    const newData = this.state.listEmployees.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.HoTen ? item.HoTen.toUpperCase() : ''.toUpperCase();
      const textData = query.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    return newData;
  };

  // render project
  renderProject = () => {
    // let categoryItems = this.state.listCategory.map( (i) => {
    //   return <Picker.Item key={i.NhomNganhID} value={i.NhomNganhID} label={i.TenNhomNganh} />
    // });

    let projectItems = this.state.listOriginProject.map(i => {
      return (
        <Picker.Item
          key={i.MaNhomKhachHang}
          value={i.MaNhomKhachHang}
          label={i.TenNhomKhachHang}
        />
      );
    });

    return (
      <View>
        <View style={styles.sectionTitle}>
          <Text style={styles.SectionHeaderStyle}>Thông tin dự án</Text>
        </View>

        {/* <View style={styles.wrapTitle}>
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
        </View> */}

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Dự án</Text>
          <Picker
            selectedValue={this.state.project}
            onValueChange={value => {
              this.setState({project: value});
            }}>
            {projectItems}
          </Picker>
        </View>
      </View>
    );
  };
  // render call status
  renderCallInfo = () => {
    // let callItems;
    // let contractItems;
    // let employeeItems;
    // const {query} = this.state;
    // const data = this._filterData(query);
    let childContractStatus = null;
    const name = getObjectFromArrayById2(
      this.state.listEmployees,
      'NguoiDungID',
      this.state.employeeGetContract,
    );
    const contract = getObjectFromArrayById(
      contractStatus,
      'TrangThaiID',
      this.state.customerContractStatus,
    );
    const childStatus = getObjectFromArrayById(
      contractChildStatus,
      'parent',
      this.state.customerContractStatus,
    );
    if (childStatus && childStatus.value.length > 0) {
      childContractStatus = getObjectFromArrayById(
        childStatus.value,
        'TrangThaiID',
        this.state.customerContractChildStatus,
      );
    }

    // callItems = this.state.listCallStatus.map( (i) => {
    //   return <Picker.Item key={i.CICID} value={i.CICID} label={i.TenCIC} />
    // });

    // contractItems = this.state.listContractStatus.map(i => {
    //   return (
    //     <Picker.Item
    //       key={i.TrangThaiID}
    //       value={i.TrangThaiID}
    //       label={i.TenTrangThai}
    //     />
    //   );
    // });

    // employeeItems = this.state.listEmployees.map(i => {
    //   return (
    //     <Picker.Item
    //       key={i.NguoiDungID}
    //       value={i.NguoiDungID}
    //       label={i.HoTen}
    //     />
    //   );
    // });

    return (
      <View>
        <View style={styles.sectionTitle}>
          <Text style={styles.SectionHeaderStyle}>Thông tin hồ sơ</Text>
        </View>
        {/*        
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>TT cuộc gọi</Text>
        <Picker
              selectedValue={this.state.callStatus}
              onValueChange={ (value) => { this.setState({ callStatus: value}) } } >
              <Picker.Item label='Chưa có thông tin' value='' />
              {callItems}

          </Picker>
      </View>

      <View style={styles.wrapTitle}>
        <Text style={styles.title}>TT cuộc gọi con</Text>
        <Picker
              selectedValue={this.state.callChildStatus}
              onValueChange={ (value) => { this.setState({ callChildStatus: value}) } } >
              <Picker.Item label='Chưa có thông tin' value='' />
              {callItems}

          </Picker>
      </View>  */}

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Trạng thái hồ sơ</Text>
          <Text style={styles.inputReadonly}>
            {contract ? contract.TenTrangThai : ''}
          </Text>
          {/* <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            value={this.state.customerContractStatus}
            editable={false}
          /> */}
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Trạng thái hồ sơ con</Text>
          <Text style={styles.inputReadonly}>
            {childContractStatus ? childContractStatus.TenTrangThai : ''}
          </Text>
          {/* <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            value={this.state.customerContractChildStatus}
            editable={false}
          /> */}
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Người lấy hồ sơ</Text>
          <Text style={styles.inputReadonly}>{name ? name.HoTen : ''}</Text>
          {/* <Autocomplete
            data={data}
            containerStyle={styles.input}
            hideResults={this.state.hideAutocomplete}
            defaultValue={name ? name.HoTen : ''}
            onChangeText={text =>
              this.setState({
                query: text,
                hideAutocomplete: false,
              })
            }
            renderItem={({item, i}) => (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    employeeGetContract: item.NguoiDungID,
                    employeeGetContractName: item.HoTen,
                    query: item.HoTen,
                    hideAutocomplete: true,
                  })
                }>
                <Text>{item.HoTen}</Text>
              </TouchableOpacity>
            )}
          /> */}
        </View>
      </View>
    );
  };
  // render customer status
  renderCustomerInfo = () => {
    let imagePath = this.state.imgPath;
    return (
      <View>
        <View style={styles.sectionTitle}>
          <Text style={styles.SectionHeaderStyle}>Thông tin khách hàng</Text>
        </View>

        <View>
          <Input
            containerStyle={{display: 'none'}}
            inputStyle={{fontSize: 16}}
            value={this.state.customerID}
            onChangeText={text => this.setState({customerID: text})}
            disabled={true}
          />
        </View>

        {/* <View style={styles.wrapTitle}>
      <Text style={styles.title}>Xưng hô</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customerpreName}
          onChangeText= { text  => this.setState({ customerpreName: text}) } 
        />
    </View> */}

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>
            Họ và tên <Text style={styles.isRequired}> (*)</Text>
          </Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customername}
            onChangeText={text => this.setState({customername: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Giới tính</Text>
          <SegmentedControlTab
            values={['Nam', 'Nữ']}
            tabsContainerStyle={styles.segment}
            selectedIndex={this.state.customergender}
            onTabPress={this.updateGenderIndex}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>
            Số điện thoại <Text style={styles.isRequired}> (*)</Text>
          </Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customerphone}
            onChangeText={text => this.setState({customerphone: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Ngày sinh</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customerDOB}
            onChangeText={text => this.setState({customerDOB: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>CMND</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customernationalId}
            onChangeText={text => this.setState({customernationalId: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Ngày cấp</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customernationalDate}
            onChangeText={text => this.setState({customernationalDate: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Nơi cấp</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customernationalPlace}
            onChangeText={text => this.setState({customernationalPlace: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Địa chỉ</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customeraddress}
            onChangeText={text => this.setState({customeraddress: text})}
            multiline={true}
            numberOfLines = {4}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Tỉnh thành</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customerprovince}
            onChangeText={text => this.setState({customerprovince: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Quận/Huyện</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customerdistrict}
            onChangeText={text => this.setState({customerdistrict: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Email</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customeremail}
            onChangeText={text => this.setState({customeremail: text})}
          />
        </View>

        {/* <View style={styles.wrapTitle}>
      <Text style={styles.title}>Sản phẩm</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customerproduct}
          onChangeText= { text  => this.setState({ customerproduct: text}) } 
        />
    </View> */}

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Hạn mức</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customercashLimit}
            onChangeText={text => this.setState({customercashLimit: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Khoản vay</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customerloan}
            onChangeText={text => this.setState({customerloan: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Thời gian vay</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customerloanTime}
            onChangeText={text => this.setState({customerloanTime: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Nghề nghiệp</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customerjob}
            onChangeText={text => this.setState({customerjob: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Công ty</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customercompany}
            onChangeText={text => this.setState({customercompany: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Thu nhập</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customersalary}
            onChangeText={text => this.setState({customersalary: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Nhà cung cấp</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customersupplier}
            onChangeText={text => this.setState({customersupplier: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Số hợp đồng</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customercontractNumber}
            onChangeText={text => this.setState({customercontractNumber: text})}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Ghi chú</Text>
          <Input
            containerStyle={styles.input}
            inputStyle={{fontSize: 16}}
            placeholder="Chưa có thông tin"
            value={this.state.customernote}
            onChangeText={text => this.setState({customernote: text})}
            multiline={true}
            numberOfLines = {4}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Chọn ảnh</Text>
          <TouchableOpacity onPress={this.chooseImg}>
            <Image
              source={cameraImage}
              style={{width: 50, height: 50, marginLeft: 20}}
            />
          </TouchableOpacity>
          <Image
            source={imagePath.uri ? {uri: imagePath.uri} : null}
            style={styles.imageView}
          />
        </View>

        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Chọn file</Text>

          <TouchableOpacity onPress={this.chooseFile}>
            <Image
              source={documentImage}
              style={{width: 50, height: 50, marginLeft: 20}}
            />
          </TouchableOpacity>
          <Text>{this.state.urlFile}</Text>
        </View>

        {/* <View style={styles.wrapTitle}>
      <Text style={styles.title}>Loại</Text>
      
      <SegmentedControlTab
            values={['TSA', 'DSA']}
            tabsContainerStyle={styles.segment}
            selectedIndex={this.state.selectedCategoryIndex}
            onTabPress={this.updateCatergoryIndex}
      />
    </View> */}
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        {!this.state.data && this.renderProject()}
        {this.state.customerID !== '' && this.renderCallInfo()}
        {this.renderCustomerInfo()}

        <View style={{height: 20}} />
      </ScrollView>
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
  wrapTitle: {marginTop: 5, marginBottom: 10},
  title: {marginLeft: 20, marginTop: 20, fontWeight: 'bold', fontSize: 16},
  inputReadonly: {marginLeft: 20, marginTop: 20, fontSize: 16},
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
  isRequired: {
    color: 'red',
  },
  button: {
    backgroundColor: '#ffb900',
    width: Dimensions.get('window').width,
    marginTop: 30,
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});

export default AddingCustomer;

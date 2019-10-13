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
} from 'react-native';
import {Input, Image} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import documentImage from '../assets/images/ico_document.png';
import cameraImage from '../assets/images/ico_camera.png';
import {initCustomerData, getListGroup, getListProject, postCustomer} from '../api/ApiHelpers';


class AddingCustomer extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      data: navigation.getParam('data', ''),
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
      listEmployees: [],

      // project
      category: '',
      project: '',

      // Call Status
      callStatus: '',
      callChildStatus: '',
      contractStatus: '',
      contractChildStatus: '',
      employeeGetContract: '',

      name: '',

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
        customernote: ''
    };
  }

  componentDidMount() {
    this.getInitData();
    // this.getInitCategory();
    this.getInitProject();
    this.getcustomerById();
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
        listEmployees: responseData.listNguoiDung,
        loading: false,
      });
    }
    else{
      this.setState({
        loading: false,
      });
    }
  };

  // getInitCategory = async () => {
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

  getcustomerById = () => {
    const data = this.state.data;
    console.log(data);
    if(data){
      this.setState({
        customerID: data.SupplierID ? data.SupplierID : '',
        customername: data.SupplierName ? data.SupplierName : '',
        customerDOB: data.Ngaysinh ? data.Ngaysinh : '',
        customerpreName: data.DanhXung ? data.DanhXung : '',
        customergender: data.GioiTinh ? data.GioiTinh : 0,
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
        customernote: data.GhiChu ? data.GhiChu : ''
      });
    }
  }

  // Set up navigation bar
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
    // headerRight: (
      // <TouchableOpacity
      //   style={{backgroundColor: '#ffb900', marginRight: 15}}
      //   onPress={this.saveCustomer(navigation)}>
      //   <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
      //     Lưu
      //   </Text>
      // </TouchableOpacity>
    // ),
  });

  saveCustomer = async () => {
    // if(this.state.customername === ''){
    //   alert('Vui lòng nhập Họ và tên');
    //   return;
    // }
    // if(this.state.customerphone === ''){
    //   alert('Vui lòng nhập Điện thoại');
    //   return;
    // }
    console.log("========statte =============",this.state);
    const item = {
        "SupplierID": this.state.customerID,
        "SupplierName": this.state.customername,
        "Phone": this.state.customerphone,
        "So": this.state.customeraddress,
        "Quan": this.state.customerdistrict,
        "Tinh": this.state.customerprovince,
        "NhomKhachHang": this.state.project,
        "Address": "",
        "NgaySinh": this.state.customerDOB,
        "NgayGioGoi": this.state.customercall,
        "GioiTinh": true,
        "CMND": this.state.customernationalId,
        "CongTyCongViec": this.state.customercompany,
        "NgheNghiep": this.state.customerjob,
        "DoiTuongID": 1,
        "GhiChu": this.state.customernote,
        "TongGhiChu": 0,
        "DanhGia": 0,
        "NguonID": 3,
        "TrangThaiID": 2,
        "TrangThaiChildID": 18,
        "AnhCaNhan": "",
        "AnhCMND": "",
        "ThoiGianVay": this.state.customerloanTime,
        "KhoanVay": this.state.customerloan,
        "DiaChiLienHe": "",
        "NhanVienLine": "",
        "ListTenSanPham": "THE, Hóa Đơn Điện",
        "ListMaSanPham": "THE, HDD",
        "NhanVienChamSocID": 90,
        "AnhMatTruocThe": "",
        "DanhXung": this.state.customerpreName,
        "Email": this.state.customeremail,
        "NgayGio": '2019-09-13T18:05:56.7881953+07:00',
        "CICID": 0,
        "TenCIC": "",
        "CICChildID": 0,
        "TenCICChild": "",
        "NgayCapCMND": "2018-01-18T06:42:04",
        "NoiCap": this.state.customernationalPlace,
        "DiaChiHen": "Tp HCM",
        "ThoiGianHen": "2019-08-09T09:09:04",
        "ThoiGianNhac": "2019-09-19T20:08:04",
        "TinhTrangHonNhan": 0,
        "HanMucVay": this.state.customercashLimit,
        "ThuNhapHienTai": this.state.customersalary,
        "Loai": 3,
        "SoHD": this.state.customercontractNumber
    }

    console.log("============item================", JSON.stringify(item));

    try {
      let res = await postCustomer('insertCustomer', item);
      let data = await res.json();
      console.log('res', data);
    } catch (error) {
      console.log(error);
    }

    // this.props.navigation.goBack();
  }

  // Change state of the button group (segment control in ios)
  updateGenderIndex = index => {
    this.setState({
      ...this.state,
      customergender: index ,
    });
  };

  updateCatergoryIndex = index => {
    this.setState({
      ...this.state,
      selectedCategoryIndex: index,
    });
  };

  // Get image from gallery
  chooseFile = () => {
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
        // let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // if (item.id === '27') {
        //   this.setState({
        //     avatarPath: source,
        //   });
        // } else if (item.id === '28') {
        //   this.setState({
        //     frontIDPath: source,
        //   });
        // } else if (item.id === '29') {
        //   this.setState({
        //     bottomIDPath: source,
        //   });
        // }
      }
    });
  };

  // render project
  renderProject = () =>{
    
    // let categoryItems = this.state.listCategory.map( (i) => {
    //   return <Picker.Item key={i.NhomNganhID} value={i.NhomNganhID} label={i.TenNhomNganh} />
    // });

    let projectItems = this.state.listOriginProject.map( (i) => {
      return <Picker.Item key={i.MaNhomKhachHang} value={i.MaNhomKhachHang} label={i.TenNhomKhachHang} />
    });

    return (
      <View>
        <View
            style={styles.sectionTitle}>
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
                onValueChange={ (value) => { this.setState({ project: value}) } } >
                {projectItems}
            </Picker>
        </View>
      </View>
    );
  }
  // render call status
  renderCallInfo = () =>{
    // let callItems;
    let contractItems;
    let employeeItems;

    // callItems = this.state.listCallStatus.map( (i) => {
    //   return <Picker.Item key={i.CICID} value={i.CICID} label={i.TenCIC} />
    // });

    contractItems = this.state.listContractStatus.map( (i) => {
      return <Picker.Item key={i.TrangThaiID} value={i.TrangThaiID} label={i.TenTrangThai} />
    });

    employeeItems = this.state.listEmployees.map( (i) => {
      return <Picker.Item key={i.NguoiDungID} value={i.NguoiDungID} label={i.HoTen} />
    });

    return (
      <View>
      <View
          style={styles.sectionTitle}>
          <Text style={styles.SectionHeaderStyle}>Thông tin cuộc gọi</Text>
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
        <Text style={styles.title}>TT hợp đồng</Text>
        <Picker
              selectedValue={this.state.contractStatus}
              onValueChange={ (value) => { this.setState({ contractStatus: value}) } } >
              <Picker.Item label='Chưa có thông tin' value='' />
              {contractItems}

          </Picker>
      </View>

      <View style={styles.wrapTitle}>
        <Text style={styles.title}>TT hợp đồng con</Text>
        <Picker
              selectedValue={this.state.contractChildStatus}
              onValueChange={ (value) => { this.setState({ contractChildStatus: value}) } } >
              <Picker.Item label='Chưa có thông tin' value='' />
              {contractItems}

          </Picker>
      </View>

      <View style={styles.wrapTitle}>
        <Text style={styles.title}>Người lấy HS</Text>
        <Picker
              selectedValue={this.state.employeeGetContract}
              onValueChange={ (value) => { this.setState({ employeeGetContract: value}) } } >
              <Picker.Item label='Chưa có thông tin' value='' />
              {employeeItems}

          </Picker>
      </View>

      </View>
    );
  }
// render customer status
  renderCustomerInfo = () =>{
  return (
    <View>
    <View
        style={styles.sectionTitle}>
        <Text style={styles.SectionHeaderStyle}>Thông tin cá nhân</Text>
    </View>
    
    <View>
      <Input
          containerStyle={{display: 'none'}}
          inputStyle={{fontSize: 16}}
          value={this.state.customerID}
          onChangeText= { text  => this.setState({ customerID: text}) }
          disabled= {true}
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
      <Text style={styles.title}>Họ và tên <Text style={styles.isRequired}> (*)</Text></Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customername}
          onChangeText= { text  => this.setState({ customername: text}) } 
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
      <Text style={styles.title}>Số điện thoại <Text style={styles.isRequired}> (*)</Text></Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customerphone}
          onChangeText= { text  => this.setState({ customerphone: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Ngày sinh</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customerDOB}
          onChangeText= { text  => this.setState({ customerDOB: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>CMND</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customernationalId}
          onChangeText= { text  => this.setState({ customernationalId: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Ngày cấp</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customernationalDate}
          onChangeText= { text  => this.setState({ customernationalDate: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Nơi cấp</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customernationalPlace}
          onChangeText= { text  => this.setState({ customernationalPlace: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Địa chỉ</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customeraddress}
          onChangeText= { text  => this.setState({ customeraddress: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Tỉnh thành</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customerprovince}
          onChangeText= { text  => this.setState({ customerprovince: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Quận/Huyện</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customerdistrict}
          onChangeText= { text  => this.setState({ customerdistrict: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Email</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customeremail}
          onChangeText= { text  => this.setState({ customeremail: text}) } 
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
          onChangeText= { text  => this.setState({ customercashLimit: text}) } 
        />
    </View>
    
    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Khoản vay</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customerloan}
          onChangeText= { text  => this.setState({ customerloan: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Thời gian vay</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customerloanTime}
          onChangeText= { text  => this.setState({ customerloanTime: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Nghề nghiệp</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customerjob}
          onChangeText= { text  => this.setState({ customerjob: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Công ty</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customercompany}
          onChangeText= { text  => this.setState({ customercompany: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Thu nhập</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customersalary}
          onChangeText= { text  => this.setState({ customersalary: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Nhà cung cấp</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customersupplier}
          onChangeText= { text  => this.setState({ customersupplier: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Số hợp đồng</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customercontractNumber}
          onChangeText= { text  => this.setState({ customercontractNumber: text}) } 
        />
    </View>
    
    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Ghi chú</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          placeholder="Chưa có thông tin"
          value={this.state.customernote}
          onChangeText= { text  => this.setState({ customernote: text}) } 
        />
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Chọn ảnh</Text>
      
      <TouchableOpacity onPress={this.chooseFile}>
        <Image
          source={cameraImage}
          style={{width: 50, height: 50, marginLeft: 20}}
        />
      </TouchableOpacity>
    </View>

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Chọn file</Text>
      
      <TouchableOpacity onPress={this.chooseFile}>
        <Image
          source={documentImage}
          style={{width: 50, height: 50, marginLeft: 20}}
        />
      </TouchableOpacity>
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

    <View style={styles.wrapTitle}>
      <Text style={styles.title}>Ngày cập nhật</Text>
      <Input
          containerStyle={styles.input}
          inputStyle={{fontSize: 16}}
          disabled = {true}
        />
    </View>
    </View>
  );
}

  render() {
    
    return (
    <ScrollView>
      
      {!this.state.data && this.renderProject()}
      {this.renderCallInfo()}
      {this.renderCustomerInfo()}
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={this.saveCustomer}>Lưu</Text>
      </TouchableOpacity>

      <View style={{height: 20}}>
        
      </View>

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
    color: 'red'
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

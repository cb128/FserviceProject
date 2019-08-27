import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

class CategoryCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
            type="material"
            color="black"
            // eslint-disable-next-line react-native/no-inline-styles
            iconStyle={{marginLeft: 15}}
          />
        </TouchableOpacity>
      ),
    };
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.TenSanPham}
      leftIcon={<Icon name={'record-voice-over'} />}
      rightIcon={<Icon name={'chevron-right'} />}
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 70,
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 10,
        shadowOpacity: 0.5,
        elevation: 3,
      }}
      onPress={() => this.props.navigation.navigate('ListCampaign')}
    />
  );

  async componentDidMount() {
    this.getListCampaign();
  }

  getListCampaign = () => {};

  render() {
    let list = [
      {
        ID: 6,
        MaSanPham: 'VAY',
        TenSanPham: 'VAY',
      },
      {
        ID: 7,
        MaSanPham: 'THE',
        TenSanPham: 'THE',
      },
      {
        ID: 8,
        MaSanPham: 'HDD',
        TenSanPham: 'Hóa Đơn Điện',
      },
      {
        ID: 9,
        MaSanPham: 'TM',
        TenSanPham: 'Tiền Mặt',
      },
      {
        ID: 11,
        MaSanPham: 'BH',
        TenSanPham: 'Bảo Hiểm',
      },
      {
        ID: 12,
        MaSanPham: 'TD',
        TenSanPham: 'Tự Doanh',
      },
      {
        ID: 13,
        MaSanPham: 'HK&CMND',
        TenSanPham: 'Hộ Khẩu Và CMND',
      },
      {
        ID: 14,
        MaSanPham: 'SLM2',
        TenSanPham: 'SLM2',
      },
      {
        ID: 15,
        MaSanPham: 'BCH03',
        TenSanPham: 'BCH03',
      },
      {
        ID: 16,
        MaSanPham: 'BCH02',
        TenSanPham: 'BCH02',
      },
      {
        ID: 17,
        MaSanPham: 'BCBF01',
        TenSanPham: 'BCBF01',
      },
      {
        ID: 18,
        MaSanPham: 'BCLI1',
        TenSanPham: 'BCLI1',
      },
      {
        ID: 19,
        MaSanPham: 'BCBF02',
        TenSanPham: 'BCBF02',
      },
      {
        ID: 20,
        MaSanPham: 'BCL01',
        TenSanPham: 'BCL01',
      },
      {
        ID: 10,
        MaSanPham: 'CK',
        TenSanPham: 'Chuyển Khoản',
      },
      {
        ID: 21,
        MaSanPham: 'SLLI1',
        TenSanPham: 'SLLI1',
      },
      {
        ID: 22,
        MaSanPham: 'SLL1',
        TenSanPham: 'SLL1',
      },
      {
        ID: 23,
        MaSanPham: 'SLL2',
        TenSanPham: 'SLL2',
      },
      {
        ID: 24,
        MaSanPham: 'SLL3',
        TenSanPham: 'SLL3',
      },
      {
        ID: 25,
        MaSanPham: 'BCM01',
        TenSanPham: 'BCM01',
      },
      {
        ID: 26,
        MaSanPham: 'BCM02',
        TenSanPham: 'BCM02',
      },
      {
        ID: 27,
        MaSanPham: 'SLBF02',
        TenSanPham: 'SLBF02',
      },
      {
        ID: 28,
        MaSanPham: 'BCL02',
        TenSanPham: 'BCL02',
      },
      {
        ID: 29,
        MaSanPham: 'SCA',
        TenSanPham: 'SCA',
      },
      {
        ID: 30,
        MaSanPham: 'SCB',
        TenSanPham: 'SCB',
      },
      {
        ID: 31,
        MaSanPham: 'SCHI',
        TenSanPham: 'SCHI',
      },
      {
        ID: 32,
        MaSanPham: 'BKAC01',
        TenSanPham: 'BKAC01',
      },
      {
        ID: 33,
        MaSanPham: 'BKAC02',
        TenSanPham: 'BKAC02',
      },
      {
        ID: 34,
        MaSanPham: 'HCL01',
        TenSanPham: 'HCL01',
      },
      {
        ID: 35,
        MaSanPham: 'HCL02',
        TenSanPham: 'HCL02',
      },
      {
        ID: 36,
        MaSanPham: 'HCM01',
        TenSanPham: 'HCM01',
      },
      {
        ID: 37,
        MaSanPham: 'HCM02',
        TenSanPham: 'HCM02',
      },
      {
        ID: 38,
        MaSanPham: 'BF01',
        TenSanPham: 'BF01',
      },
      {
        ID: 39,
        MaSanPham: 'BF02',
        TenSanPham: 'BF02',
      },
      {
        ID: 40,
        MaSanPham: 'BF03',
        TenSanPham: 'BF03',
      },
      {
        ID: 41,
        MaSanPham: 'BF04',
        TenSanPham: 'BF04',
      },
      {
        ID: 42,
        MaSanPham: 'LIC01',
        TenSanPham: 'LIC01',
      },
      {
        ID: 43,
        MaSanPham: 'LIC02',
        TenSanPham: 'LIC02',
      },
      {
        ID: 44,
        MaSanPham: 'LIC03',
        TenSanPham: 'LIC03',
      },
      {
        ID: 45,
        MaSanPham: 'MBIL',
        TenSanPham: 'MBIL',
      },
      {
        ID: 46,
        MaSanPham: 'THETM',
        TenSanPham: 'THẺ TIỀN MẶT VIETCREDIT',
      },
      {
        ID: 47,
        MaSanPham: 'HKDCGP',
        TenSanPham: 'THE VAY HKD CO GIAY PHEP DKKD',
      },
      {
        ID: 48,
        MaSanPham: 'KCTTN',
        TenSanPham: 'THE VAY KHONG CHUNG TU THU NHAP',
      },
      {
        ID: 49,
        MaSanPham: 'TCTDK',
        TenSanPham: 'THE VAY KH TCTD KHAC',
      },
      {
        ID: 50,
        MaSanPham: 'HKDKGP',
        TenSanPham: 'THE VAY HKD KHONG CO GIAY PHEP DKKD',
      },
    ];
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 10}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e8ee',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#ffb900',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
});

export default CategoryCampaign;

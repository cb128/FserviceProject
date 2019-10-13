import AsyncStorage from '@react-native-community/async-storage';

const getUserID = async () => {
  let userID;
  try {
    const retrievedItem = await AsyncStorage.getItem('loginDetails');
    let userData = JSON.parse(retrievedItem);
    if (userData) {
      userID = userData.nguoiDungID;
    }
  } catch (exception) {
    console.log('Error');
  }

  return userID;
};

export const loginApp = (email, password) => {
  let formdata = new FormData();
  formdata.append('function', 'login');
  formdata.append('username', email);
  formdata.append('password', password);

  return fetch('http://crm.fservices.com.vn/APIs/APIMobileHandler.ashx', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic RG9pVGFjOmZkc2FvZmlkNDM1Zjg4ZGlvZ21ucjY1OTA5OGZzMDMyYWE4OGFnZmc4ODhmODhmZ2Zkcw==',
    },
    body: formdata,
  });
};

export const getListGroup = () => {
  let formdata = new FormData();
  formdata.append('function', 'getListGroup');

  return fetch('http://crm.fservices.com.vn/APIs/APIMobileHandler.ashx', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic RG9pVGFjOmZkc2FvZmlkNDM1Zjg4ZGlvZ21ucjY1OTA5OGZzMDMyYWE4OGFnZmc4ODhmODhmZ2Zkcw==',
    },
    body: formdata,
  });
};

export const getListProject = async nhomNganhID => {
  let userID;

  await getUserID().then(value => {
    userID = value;
  });
  let formdata = new FormData();
  formdata.append('function', 'getListCampaign');
  formdata.append('nguoiDungID', userID);
  formdata.append('nhomNganhID', nhomNganhID);

  return fetch('http://crm.fservices.com.vn/APIs/APIMobileHandler.ashx', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic RG9pVGFjOmZkc2FvZmlkNDM1Zjg4ZGlvZ21ucjY1OTA5OGZzMDMyYWE4OGFnZmc4ODhmODhmZ2Zkcw==',
    },
    body: formdata,
  });
};

export const getDetailProject = projectID => {
  let userID = getUserID().then(value => value.maNguoiDung);
  let formdata = new FormData();
  formdata.append('function', 'getDetailCampaign');
  formdata.append('nguoiDungID', userID);
  formdata.append('projectID', projectID);

  return fetch('http://crm.fservices.com.vn/APIs/APIMobileHandler.ashx', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic RG9pVGFjOmZkc2FvZmlkNDM1Zjg4ZGlvZ21ucjY1OTA5OGZzMDMyYWE4OGFnZmc4ODhmODhmZ2Zkcw==',
    },
    body: formdata,
  });
};

export const getStatusProject = async projectCode => {
  let userID;

  await getUserID().then(value => {
    userID = value;
  });
  let formdata = new FormData();
  formdata.append('function', 'getStatisticTrangThaiHopDong');
  formdata.append('nguoiDungID', userID);
  formdata.append('nhomKhachHang', projectCode);

  return fetch('http://crm.fservices.com.vn/APIs/APIMobileHandler.ashx', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic RG9pVGFjOmZkc2FvZmlkNDM1Zjg4ZGlvZ21ucjY1OTA5OGZzMDMyYWE4OGFnZmc4ODhmODhmZ2Zkcw==',
    },
    body: formdata,
  });
};

export const getListCustomerData = async (projectCode, begin, end) => {
  let userID;
  await getUserID().then(value => {
    userID = value;
  });

  let formdata = new FormData();
  formdata.append('function', 'getListCustomer');
  formdata.append('Begin', begin);
  formdata.append('End', end);
  formdata.append('NhanVienChamSocID', userID);
  formdata.append('ListNhomKhachHang', "N'" + projectCode + "'");

  console.log(formdata);
  return fetch('http://crm.fservices.com.vn/APIs/APIMobileHandler.ashx', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic RG9pVGFjOmZkc2FvZmlkNDM1Zjg4ZGlvZ21ucjY1OTA5OGZzMDMyYWE4OGFnZmc4ODhmODhmZ2Zkcw==',
    },
    body: formdata,
  });
};

export const initCustomerData = async () => {
  let userID;

  await getUserID().then(value => {
    userID = value;
  });
  let formdata = new FormData();
  formdata.append('function', 'getInitDataCustomer');
  formdata.append('nguoiDungID', userID);

  return fetch('http://crm.fservices.com.vn/APIs/APIMobileHandler.ashx', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic RG9pVGFjOmZkc2FvZmlkNDM1Zjg4ZGlvZ21ucjY1OTA5OGZzMDMyYWE4OGFnZmc4ODhmODhmZ2Zkcw==',
    },
    body: formdata,
  });
};

export const postCustomer = (funcName, item) => {
  let formdata = new FormData();
  formdata.append('function', funcName);
  formdata.append('item', item);
  console.log(formdata);

  return fetch('http://crm.fservices.com.vn/APIs/APIMobileHandler.ashx', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic RG9pVGFjOmZkc2FvZmlkNDM1Zjg4ZGlvZ21ucjY1OTA5OGZzMDMyYWE4OGFnZmc4ODhmODhmZ2Zkcw==',
    },
    body: formdata,
  });
};

export const changePassword = async newPassword => {
  let userID;

  await getUserID().then(value => {
    userID = value;
  });

  let formdata = new FormData();
  formdata.append('function', 'changePassword');
  formdata.append('nguoiDungID', userID);
  formdata.append('passwordNew', newPassword);
  console.log(formdata);

  return fetch('http://crm.fservices.com.vn/APIs/APIMobileHandler.ashx', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic RG9pVGFjOmZkc2FvZmlkNDM1Zjg4ZGlvZ21ucjY1OTA5OGZzMDMyYWE4OGFnZmc4ODhmODhmZ2Zkcw==',
    },
    body: formdata,
  });
};

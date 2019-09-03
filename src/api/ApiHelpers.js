import AsyncStorage from '@react-native-community/async-storage';

const getUserID = async () => {
  let retrievedItem = await AsyncStorage.getItem('loginDetails');
  return JSON.parse(retrievedItem);
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

export const getListProject = nhomNganhID => {
  let userID = getUserID.then(value => value.maNguoiDung);
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

export const initCustomerData = () => {
  let userID = getUserID.then(value => value.maNguoiDung);
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

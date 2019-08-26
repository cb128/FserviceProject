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
  }).then(response => response.json());
};

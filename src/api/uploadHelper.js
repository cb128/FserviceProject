import FTP from 'react-native-ftp';


export const uploadMulti = (files, fileName) => {
  let formdata = new FormData();
  formdata.append('files', files);
  formdata.append('fileName', fileName);
  console.log(formdata);

  return fetch('https://localhost:44325/api/v1/upload', {
    method: 'POST',
    headers: {
      client_id: 'eac5d782-3a48-4a23-ae97-002681dc4dfd',
      client_secret: '182548a4d4b34e9aaee83380730f4152',
    },
    body: formdata,
  });
};



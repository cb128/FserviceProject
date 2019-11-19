import FTP from 'react-native-ftp';
import {zip} from 'react-native-zip-archive';

export const uploadFile = async (uriFile, taget) => {
  FTP.setup('103.92.30.151', 21); //Setup host
  zip(uriFile, uriFile + '.zip')
    .then(path => {
      console.log(`zip completed at ${path}`);
      FTP.login('doiTac', 'dt.123$').then(
        result => {
          if (path) {
            FTP.uploadFile(path, './' + taget)
              .then(result => console.log(result))
              .catch(error => alert(error));
          }
        },
        error => {
          alert(error);
        },
      );
    })
    .catch(error => {
      console.log(error);
    });
};

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



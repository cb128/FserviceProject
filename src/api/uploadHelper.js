import FTP from 'react-native-ftp';

export const uploadFile = async (uri, taget) => {
  FTP.setup('103.92.30.151', 21); //Setup host
  FTP.login('doiTac', 'dt.123$').then(
    result => {
      FTP.uploadFile(uri, './' + taget)
        .then(result => console.log(result))
        .catch(error => alert(error));
      //   FTP.list('.').then(result => {
      //     console.log(result);
      //   });
    },
    error => {
      alert(error);
    },
  );
};

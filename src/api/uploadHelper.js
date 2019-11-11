import FTP from 'react-native-ftp';

export const uploadFile = async (uriFile, taget) => {
  FTP.setup('103.92.30.151', 21); //Setup host

  FTP.login('doiTac', 'dt.123$').then(
    result => {
      if (uriFile) {
        FTP.uploadFile(uriFile, './' + taget)
          .then(result => console.log(result))
          .catch(error => alert(error));
      }
    },
    error => {
      alert(error);
    },
  );
};

export const loginApp = (email, password) => {
  email = email.toLowerCase().trim();
  password = password.toLowerCase().trim();
  const URL = `https://cinqsmilevn.homelog.jp/api/mobile_v2/api1?email=${email}&password=${password}`;
  return fetch(URL, {
    method: 'POST',
    dataType: 'jsonp',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
};

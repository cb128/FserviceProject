// get object from array by id
export function getObjectFromArrayById(arr, key, value) {
  const result = arr.filter(x => x[key] === value);
  if (result && result.length > 0) {
    return result[0];
  }
  return '';
}
export function getObjectFromArrayById2(arr, key, value) {
  const result = arr.filter(x => x[key].toString() === value);
  if (result && result.length > 0) {
    return result[0];
  }
  return '';
}

/**
 * Recursive function that reads a JSON looking for a given property. Return true if the property is found.
 * @param {*} keyToSearch
 * @param {*} obj
 */
const isPropertyInObject = function (keyToSearch, obj) {
  const currentProperty = keyToSearch.split('.')[0];
  const restOfProperties = keyToSearch.split('.').splice(1).join('.');
  if (obj[currentProperty] === undefined) {
    return false;
  } if (restOfProperties) {
    const objectToSearch = obj[currentProperty];
    return isPropertyInObject(restOfProperties, objectToSearch);
  }
  return true;
};

module.exports = {
  isPropertyInObject
};

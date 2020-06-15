const {
  isPropertyInObject
} = require('../utils/jsonUtils');
const log = require('../api/logger/logger.js');


// Throws an error if configuration is not valid and stop bootstrapping
const checkConfigurationValidity = function (config) {
  checkMandatoryProperty('propertyOne', config);
  checkMandatoryProperty('nested.property.on.file', config);
};


/**
 * Check if a property exists in a json object; otherwise, throw an exception
 * @param {*} propertyName
 * @param {*} jsonObject
 */
const checkMandatoryProperty = function (propertyName, jsonObject) {
  if (!isPropertyInObject(propertyName, jsonObject)) {
    throw Error(`${propertyName} parameter is required to start the application. Check the configuration file.`);
  } else {
    log.debug(`\t\t* [OK] ${propertyName}`);
  }
};


module.exports = {
  checkConfigurationValidity
};

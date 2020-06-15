const log = require('../api/logger/logger.js');
const {
  SpringCloudLoader
} = require('./loaders/springCloudLoader');
const {
  FileLoader
} = require('./loaders/fileLoader');
const {
  checkConfigurationValidity
} = require('./configChecker');

// Configuration must run as singleton
let configInstance;


/**
 * Read the configuration by using the proper environment variables
 */
const getConfiguration = async function () {
  if (!configInstance) {
    configInstance = await _readConfiguration();
  }
  return configInstance;
};


/**
 * Return the configuration synchronously (undefined if configuration is not ready)
 */
const getSyncConfiguration = function () {
  return configInstance;
};


async function _readConfiguration() {
  const configLoader = _getLoader();
  const configuration = await configLoader.loadConfig();
  try {
    checkConfigurationValidity(configuration);
    return configuration;
  } catch (err) {
    throw err;
  }
}


function _getLoader() {
  const {
    CLOUD_CONFIG_URL,
    FILE,
  } = process.env;

  if (FILE) {
    console.log(`[CONFIG] Load configuration from file: ${FILE}`);
    return new FileLoader(FILE);
  }

  else if (CLOUD_CONFIG_URL){
    log.info(`[CONFIG] Load configuration from service: ${CLOUD_CONFIG_URL}`);
    return new SpringCloudLoader();
  }

  else {
    throw Error('CLOUD_CONFIG_URL or FILE environment variable must be provided');
  }

}


/**
 * Removes the previously read configuration
 */
function removeReadConfiguration() {
  configInstance = undefined;
}


module.exports = {
  getConfiguration,
  getSyncConfiguration,
  removeReadConfiguration
};

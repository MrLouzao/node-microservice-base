const fetch = require('node-fetch');
const { ConfigLoader } = require('./configLoader');
const log = require('../../api/logger/logger.js');


/**
 * Load configuration from a Spring cloud config server
 */
class SpringCloudLoader extends ConfigLoader {
  constructor() {
    super();
    log.info('Load from Spring cloud configuration');
  }


  /**
     * Obtain the configuration file from remote server. Must specify the server URL.
     * Optionally, the source profile can be provided.
     */
  async loadConfig() {
    const envVariables = this._checkEnvironmentVariables();
    const configuration = await this._getConfigurationFromConfigService(envVariables);
    return configuration;
  }


  /**
     * Check required environment variables. If ok, return an object with environment variables; otherwise throw an error
     */
  _checkEnvironmentVariables() {
    if (!process.env.CLOUD_CONFIG_URL) {
      throw Error('CLOUD_CONFIG_URL environment variable must be provided');
    }
    if (!process.env.ARTIFACT_ID) {
      throw Error('ARTIFACT_ID environment variable must be provided');
    }

    return {
      serverUrl: process.env.CLOUD_CONFIG_URL,
      artifactId: process.env.ARTIFACT_ID,
      profile: process.env.APP_PROFILE || 'development'
    };
  }


  async _getConfigurationFromConfigService(envVariables) {
    const { serverUrl, artifactId, profile } = envVariables;
    const urlToQuery = `${serverUrl}/${artifactId}-${profile}.json`;

    const configuration = await fetch(urlToQuery)
      .then((response) => response.json())
      .then((configFile) => configFile)
      .catch((err) => {
        throw err;
      });

    return configuration;
  }
}


module.exports = {
  SpringCloudLoader
};

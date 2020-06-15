class ConfigLoader {
  async loadConfig() {
    throw Error('ConfigLoader is an abstract class, cant perform this operation');
  }
}


module.exports = {
  ConfigLoader
};

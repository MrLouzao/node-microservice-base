const fs = require('fs');
const { ConfigLoader } = require('./configLoader');

class FileLoader extends ConfigLoader {
  constructor(filepath) {
    super();
    this.filepath = filepath;
  }


  async loadConfig() {
    if (!this.filepath) {
      throw Error('File not provided');
    }

    if (!fs.existsSync(this.filepath)) {
      throw Error(`File ${this.filepath} does not exist`);
    }

    const configFileReaded = fs.readFileSync(this.filepath, 'utf8');
    const config = JSON.parse(configFileReaded);
    return config;
  }
}

module.exports = {
  FileLoader
};

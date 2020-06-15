const {
    getObjectPool
  } = require('./config/singletonPool');
const log = require('./api/logger/logger.js');
var express = require('express');
var {
    healthCheck
} = require('./api/controllers/health');

  
class AppBuilder {
    constructor(config) {
        this.app = {};
        this.config = config;
    }


    buildApiControllers() {
        log.info('... building express controllers');
        var app = express();
        // Add here the controllers
        app.get("/health", healthCheck);

        this.app.express = app;
        return this;
    }


    buildDatabase() {
        log.info('... building repositories');
        return this;
    }


    buildServices() {
        log.info('... building services');
        //this.app.services.myService = new MyService();
        return this;
    }



    getAppObjects() {
        getObjectPool().app = this.app;
        return this.app;
    }
}


module.exports = {
    AppBuilder
};
  
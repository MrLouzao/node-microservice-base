const {
    AppBuilder
  } = require('./appBuild');
const {
    getConfiguration
  } = require('./config/configurationReader');
const log = require('./api/logger/logger.js');



function printLogo() {
    console.log(`
    ╔╗╔┌─┐┌┬┐┌─┐  ╔╦╗┬┌─┐┬─┐┌─┐  ╔═╗┌─┐┌─┐┌─┐
    ║║║│ │ ││├┤   ║║║││  ├┬┘│ │  ╚═╗│  ├─┤├┤ 
    ╝╚╝└─┘─┴┘└─┘  ╩ ╩┴└─┘┴└─└─┘  ╚═╝└─┘┴ ┴└  
    
    `);
}



function initializeExpress(appBuilder) {
    const serverPort = process.env.PORT || 6001;
    appBuilder
        .getAppObjects()
        .express.listen(serverPort, () => {
            console.log(`=== Running Express on port ${serverPort} ===`);
            printLogo();
        })
}


getConfiguration()
    .then((config) => {
        log.info('Initializing application ...');
        const appBuilder = new AppBuilder(config)
            .buildApiControllers();

        initializeExpress(appBuilder);
    })
    .catch((err) => {
        log.error(err);
    });
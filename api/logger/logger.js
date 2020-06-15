const log4js = require('log4js');

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh.mm.ss}] [%5.5p] [%X{reqId}]%] - %m'
      }
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: process.env.LOG || 'trace'
    }
  }
});

const logger = log4js.getLogger();
logger.level = process.env.LOG || 'trace';

function setRequestIdContext(reqId) {
  logger.addContext('reqId', reqId);
}

function trace(message) {
  logger.trace(message);
}

function debug(message) {
  logger.debug(message);
}

function info(message) {
  logger.info(message);
}

function warn(message) {
  logger.warn(message);
}

function error(message) {
  logger.error(message);
}

function fatal(message) {
  logger.fatal(message);
}

function traceHeader(method, params, file) {
  const obj = {};
  let i = 0;
  params.forEach((element) => {
    obj[i] = element;
    i += 1;
  });
  try {
    if (file !== undefined) {
      logger.trace(`[[ENTERING ${method} ${file} WITH PARAMS ${JSON.stringify(obj)}]]`);
    } else {
      logger.trace(`[[ENTERING ${method} WITH PARAMS ${JSON.stringify(obj)}]]`);
    }
  } catch (e) {
    logger.error(`ERROR LOGGING: ${e}`);
  }
}

module.exports = {
  setRequestIdContext,
  trace,
  debug,
  info,
  warn,
  error,
  fatal,
  traceHeader
};

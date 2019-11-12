'use strict'

const { logToFile, dir } = require('../config');
const Logger = require('@zhangfuxing/logger');

const option = {
  rotate: false  // cut by day
};

if (logToFile) option.dir = dir;

const logger = new Logger(option);

module.exports = logger
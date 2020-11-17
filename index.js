'use strict';

exports.printMsg = function() {
  console.log('Installing GMG-JS package ...');
}

const Logger = require('./dist/Logger');
const Message = require('./dist/Message');
const AjaxRequest = require('./dist/AjaxRequest');
const Loader = require('./dist/Loader');

module.exports = {
  Logger: Logger,
  Message: Message,
  AjaxRequest: AjaxRequest,
  Loader: Loader
};


"use strict";

var AbstractIndexedBag = require('./abstractIndexed.js');

var ConfigsBag = function ConfigsBag() {
  AbstractIndexedBag.call(this);
};

ConfigsBag.prototype = Object.create(AbstractIndexedBag.prototype);
ConfigsBag.prototype.constructor = ConfigsBag;

module.exports = ConfigsBag;
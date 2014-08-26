"use strict";

// Prototyping ServicesMapper from AbstractMapper
var AbstractMapper = require('./abstract.js');
var ServicesBag = require('../bags/services.js');

var ServicesMapper = function ServicesMapper(modules) {
  AbstractMapper.call(this, modules);
};

ServicesMapper.prototype = Object.create(AbstractMapper.prototype);
ServicesMapper.prototype.constructor = ServicesMapper;
ServicesMapper.prototype.bag = new ServicesBag();
ServicesMapper.prototype.entityKey = 'services';

module.exports = ServicesMapper;
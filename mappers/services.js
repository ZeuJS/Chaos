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

//ServicesMapper.prototype.bag =

/*function (modules) {

  var servicesBag = require('../services/servicesBag.js')();
  modules.forEach(function(module) {
    if (typeof module.services !== 'undefined') {
      module.services.forEach(function(service) {
        var serviceRegistered = servicesBag.find(service.name);
        if (
          serviceRegistered === false
          || serviceRegistered.priority < service.priority
        ) {
          servicesBag.save(service.name, service);
        }
      });
    }
  });
  return servicesBag;
};

*/

module.exports = ServicesMapper;
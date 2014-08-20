"use strict";

var AbstractBag = require('./abstract.js');

var ServicesBag = function ServicesBag() {
  AbstractBag.call(this);
};

ServicesBag.prototype = Object.create(AbstractBag.prototype);
ServicesBag.prototype.constructor = ServicesBag;

// Check if the service follow some rules.
// Sample :
// {
//  id: 'MyService',
//  object: new MyService(),
//  alias : {
//    id: 'MyServiceAlias',
//    priority: 1000, (Lower is easier overridable, 0 by default)
//  }
//}
ServicesBag.prototype.normalize = function normalizeAService(service) {
  AbstractBag.prototype.normalize.call(this, service);
  if (typeof service.alias === 'object') {
    if (typeof service.alias.priority === 'undefined') {
      service.alias.priority = 0;
    }
    if (typeof service.alias.id === 'undefined') {
      throw 'id must be defined for a service alias';
    }
  }
  if (typeof service.service === 'undefined') {
    throw 'service must be defined';
  }
};

ServicesBag.prototype.findById = function findById(search) {
  return AbstractBag.prototype.findById.call(this, search).service;
}
module.exports = ServicesBag;
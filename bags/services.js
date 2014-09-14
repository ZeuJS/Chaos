"use strict";

var AbstractBag = require('./abstract.js');
var util = require('util');

var ServicesBag = function ServicesBag() {
  AbstractBag.call(this);
};

ServicesBag.prototype = Object.create(AbstractBag.prototype);
ServicesBag.prototype.constructor = ServicesBag;
ServicesBag.prototype.normalize = function normalizeAService(item) {
  AbstractBag.prototype.normalize.call(this, item);
  if (typeof item.alias === 'object') {
    if (typeof item.alias.priority === 'undefined') {
      item.alias.priority = 0;
    }
    if (typeof item.alias.id === 'undefined') {
      throw 'id must be defined for a service alias';
    }
  }
  if (typeof item.service === 'undefined' && typeof item.factory === 'undefined') {
    throw 'service must be defined';
  }
  if (typeof item.servicesNeeded !== 'undefined' && item.servicesNeeded === true) {
    item.service.services = this;
  }
};

ServicesBag.prototype.findById = function findById(search) {
  var found = AbstractBag.prototype.findById.call(this, search);
  if (typeof found === 'undefined') {
    throw util.format('Service "%s" not found', search);
  }
  if (typeof found.factory === 'undefined')
    return found.service;
  else
    return found.factory(this);
}
module.exports = ServicesBag;
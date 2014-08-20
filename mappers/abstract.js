"use strict";

var AbstractBag = require('../bags/abstract.js');
var modules;
var AbstractMapper = function AbstractMapper(myModules) {
  modules = myModules;
  this.walker();
};

AbstractMapper.prototype.entityKey = 'wantToBeReplaced';
AbstractMapper.prototype.bag = new AbstractBag();

AbstractMapper.prototype.getBag = function getBag() {
  return this.bag;
}

AbstractMapper.prototype.walker = function foreachModule() {
  var currentThis = this;
  var scopedProcess = this.process.bind(this);
  modules.forEach(function(module) {
    if (typeof module[currentThis.entityKey] !== 'undefined') {
      module[currentThis.entityKey].forEach(scopedProcess)
    }
  });
};

AbstractMapper.prototype.process = function (entity) {
    this.bag.push(entity);
};

module.exports = AbstractMapper;
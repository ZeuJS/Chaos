"use strict";

// Prototyping EventsMapper from AbstractMapper
var AbstractMapper = require('./abstract.js');

var EventsMapper = function EventsMapper(modules, bag) {
  this.bag = bag;
  AbstractMapper.call(this, modules);
  this.bag.startListen();
};

EventsMapper.prototype = Object.create(AbstractMapper.prototype);
EventsMapper.prototype.constructor = EventsMapper;
EventsMapper.prototype.entityKey = 'events';
EventsMapper.prototype.process = function (entity) {
  this.bag.push(entity);
};
module.exports = EventsMapper;
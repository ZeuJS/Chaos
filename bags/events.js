"use strict";

var events = require('events');
var AbstractBag = require('./abstract.js');

var EventsBag = function EventsBag() {
  AbstractBag.call(this);
  //Global Event Emitter
  this.eventEmitter = new events.EventEmitter();
  this.eventEmitter.setMaxListeners(0);
  this.eventEmitter.count = function (eventName) {
    return events.EventEmitter.listenerCount(eventEmitter, eventName);
  };
};

EventsBag.prototype = Object.create(AbstractBag.prototype);
EventsBag.prototype.constructor = EventsBag;

EventsBag.prototype.normalize = function normalizeAService(listener) {
  AbstractBag.prototype.normalize.call(this, listener);
  if (typeof listener.on == 'undefined') {
    throw 'Event to listen is not defined';
  }
  if (typeof listener.call != 'function') {
    throw 'service call is not a function';
  }
  if (typeof listener.priority != 'number') {
    listener.priority = 0;
  }
  if (typeof listener.layer != 'number') {
    listener.layer = 1;
  }
};
EventsBag.prototype.order = function orderListeners() {
  this.data = this
    .data
    .sort(function byOn(a, b) {
      if ( a.on < b.on )
        return -1;
      if ( a.on > b.on )
        return 1;
      return 0;
    })
    .sort(function byLayer(a, b) {
      return a.layer - b.layer;
    })
}
EventsBag.prototype.startListen = function startListen () {
  this.order();
  var lateThis = this;
  this.data.forEach(function(listener) {
    lateThis.eventEmitter.on(listener.on, listener.call);
  });
  this.eventEmitter.emit('zeujs_chaos_listen')
}

EventsBag.prototype.emit = function emit() {
  this.eventEmitter.emit.apply(this.eventEmitter, arguments);
}
module.exports = EventsBag;
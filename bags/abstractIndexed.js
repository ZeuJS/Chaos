"use strict";

var AbstractIndexedBag = function AbstractIndexedBag() {
  this.data = {};
};

AbstractIndexedBag.prototype.push = function push(key, datum) {
  this.normalize(datum);
  this.data[key] = datum;
};

AbstractIndexedBag.prototype.fill = function fill(data) {
  this.data = data;
};

AbstractIndexedBag.prototype.find = function find(key) {
  return this.data[key];
};

AbstractIndexedBag.prototype.has = function has(key) {
  return typeof this.data[key] !== 'undefined';
};

AbstractIndexedBag.prototype.normalize = function (entity) {};
module.exports = AbstractIndexedBag;
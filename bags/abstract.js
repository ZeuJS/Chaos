"use strict";

var AbstractBag = function AbstractBag() {
  this.data = [];
};

AbstractBag.prototype.push = function push(datum) {
  this.normalize(datum);
  this.data.push(datum);
};

AbstractBag.prototype.fill = function fill(data) {
  data.forEach(function (datum) {
    this.push(datum);
  })
};

AbstractBag.prototype.find = function find(key, value) {
  var foundDatum;
  try {
    this.data.forEach(function findInEachDatum(datum) {
      if (datum[key] === value) {
        foundDatum = datum;
        throw 'found';
      }
    });
  } catch (e) {
    if (e !== 'found') { throw e; }
  }
  return foundDatum;
};

AbstractBag.prototype.findById = function findById(search) {
  return AbstractBag.prototype.find.call(this, 'id', search);
};

AbstractBag.prototype.has = function has(key, value) {
  var hasDatum;
  try {
    this.data.forEach(function findInEachDatum(datum) {
      if (datum[key] === value) {
        throw 'found';
      }
    });
  } catch (e) {
    if (e !== 'found') { throw e; }
    return true
  }
  return false;
};

AbstractBag.prototype.hasId = function hasId(search) {
  return AbstractBag.prototype.has.call(this, 'id', search);
};

AbstractBag.prototype.normalize = function (entity) {
  if (typeof entity.id === 'undefined') {
    throw 'id must be defined for a bag entity';
  }
  //No nothing by default
};
module.exports = AbstractBag;
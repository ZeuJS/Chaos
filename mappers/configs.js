"use strict";

var path = require('path');
var fs = require('fs');
var jf = require('jsonfile');
var util = require('util');

// Prototyping ConfigsMapper from AbstractMapper
var AbstractMapper = require('./abstract.js');
var ConfigsBag = require('../bags/configs.js');
var modules;

var ConfigsMapper = function ConfigsMapper(modulesToInject, bag) {
  this.bag = bag;
  modules = modulesToInject;
  AbstractMapper.call(this, modules);
  var configDir = this.retrieveFromConfigDir(global.originDir);
  var currentThis = this;
  Object.keys(configDir).forEach(function(key){
    currentThis.process(key, configDir[key]);
  })
};

ConfigsMapper.prototype = Object.create(AbstractMapper.prototype);
ConfigsMapper.prototype.constructor = ConfigsMapper;
ConfigsMapper.prototype.entityKey = 'configs';
ConfigsMapper.prototype.walker = function foreachModule() {
  var currentThis = this;
  modules.forEach(function(module) {
    if (typeof module[currentThis.entityKey] !== 'undefined') {
      Object.keys(module[currentThis.entityKey]).forEach(function(key){
        currentThis.process(key, module[currentThis.entityKey][key]);
      })
    }
  });
};

ConfigsMapper.prototype.process = function (key, entity) {
  this.bag.push(key, entity);
};

//todo refactor for correct recursive merge and async
ConfigsMapper.prototype.retrieveFromConfigDir = function (baseDir, cb) {
  var configsDirPath = path.join(baseDir, 'configs')
  var configs = {};
  var files = fs.readdirSync(configsDirPath);
  files.forEach(function(file) {
    var configPath = path.join(configsDirPath, file);
    var stats = fs.lstatSync(configPath);
    if (stats.isDirectory()) {
      configs[file] = this.retrieveFromConfigDir(configPath);
    } else if(path.extname(file) === '.json') {
      var obj = jf.readFileSync(configPath);
      configs[path.basename(file, '.json')] = obj;
    }
  });
  return configs;
};

module.exports = ConfigsMapper;
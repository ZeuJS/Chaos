"use strict";

var fs = require('fs');
var path = require('path');
var modules = [];
var modulesDirPath;
var ZEUJS_ENTRY_POINT = 'zeujsDoor.js';
var ServicesMapper = require('../mappers/services.js');

// Iterate on base modules to find all zeujs doors
module.exports = function exploreModules(baseDir) {
  modulesDirPath = path.join(baseDir, 'node_modules')
  fs.readdir(
    modulesDirPath,
    function scanDir(err, files) {

      // When iterator is ended, call low level mappers (services, events) and emit events.
      IterateDirectoryWithDoor(files, function onScanFinish() {
        var services = new ServicesMapper(modules);
        var serviceBag = services.getBag();
        var eventsBag = serviceBag.findById('events');//.listen(modules);
        var EventsMapper = serviceBag.findById('eventsMapper');
        var eventsMapper = new EventsMapper(modules, eventsBag);
        eventsBag.emit('zeujs_chaos_map', modules, serviceBag);
        eventsBag.emit('zeujs_chaos_ready', serviceBag);
      });
    }
  );
};

// Shift files array to null;
// For each iteration, push informations to modules var
// Only if is a directory and has ZEUJS_ENTRY_POINT
function IterateDirectoryWithDoor (files, cb) {
  if (files.length === 0) {
    cb();
    return;
  }
  var modulePath = path.join(modulesDirPath, files.shift());
  fs.lstat(modulePath, function ifIsDirectory(err, stats) {
    if (err) { throw err; }
    if (!stats.isDirectory()) {
      IterateDirectoryWithDoor(files, cb);
      return;
    }
    var zeujsEntryPoint = path.join(modulePath, ZEUJS_ENTRY_POINT);
    fs.exists(zeujsEntryPoint, function ifEntryPointExist(exists) {
      if (exists) {
        var newModule = require(zeujsEntryPoint);
        if (Object.keys(newModule).length > 0) {
          modules.push(newModule);
        }
      }
      IterateDirectoryWithDoor(files, cb);
    })
  });
};
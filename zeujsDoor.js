"use strict";
var EventsBag = require('./bags/events.js');
var ConfigsBag = require('./bags/configs.js');
var ConfigsMapper = require('./mappers/configs.js');

module.exports =
{
  uninstallable: false,
  services: [
    {
      id: 'events',
      service: new EventsBag(),
    },
    {
      id: 'configs',
      service: new ConfigsBag(),
    },
    {
      id: 'eventsMapper',
      service: require('./mappers/events.js'),
    }
  ],
  events: [
    {
      on: 'zeujs_chaos_map',
      id: 'mapRoutesBagEngine',
      call: function (modules, services) {
        var ConfigsBag = services.findById('configs');
        new ConfigsMapper(modules, ConfigsBag);
      },
    },
  ],
};
"use strict";
var EventsBag = require('./bags/events.js');

module.exports =
{
  uninstallable: false,
  services: [
    {
      id: 'events',
      service: new EventsBag(),
    },
    {
      id: 'eventsMapper',
      service: require('./mappers/events.js'),
    }
  ],
  events: [

  ],
};
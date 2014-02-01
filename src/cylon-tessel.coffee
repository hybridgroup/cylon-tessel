###
 * cylon-tessel
 * http://cylonjs.com
 *
 * Copyright (c) 2013 Your Name Here
 * Your License Here
###

'use strict'

namespace = require 'node-namespace'

require 'cylon'
require './tessel'

GPIO = require "cylon-gpio"

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptors.Tessel(args...)

  driver: (args...) ->
    GPIO.driver(args...)

  register: (robot) ->
    robot.registerAdaptor 'cylon-tessel', 'tessel'

    GPIO.register robot

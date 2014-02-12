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
I2C = require "cylon-i2c"

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptors.Tessel(args...)

  driver: (args...) ->
    GPIO.driver(args...) or I2C.driver(args...)

  register: (robot) ->
    robot.registerAdaptor 'cylon-tessel', 'tessel'

    I2C.register robot
    GPIO.register robot

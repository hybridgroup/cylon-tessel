###
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require './cylon-tessel'

tessel = require 'tessel'
namespace = require 'node-namespace'

namespace 'Cylon.Adaptors', ->
  class @Tessel extends Cylon.Adaptor
    constructor: (opts = {}) ->
      super
      @i2cDevices = {}
      @myself = this

    commands: ->
#      ['digitalWrite', 'analogRead', 'analogWrite', 'i2cRead', 'i2cWrite']
      ['digitalWrite', 'digitalRead', 'i2cRead', 'i2cWrite']

    connect: (callback) ->
      Logger.debug "Connecting to Tessel '#{@name}'..."
      (callback)(null)
      @connection.emit 'connect'

    disconnect: ->
      Logger.debug "Disconnecting from Tessel '#{@name}'..."

    isLed: ->
      if @connection.port.port.toUpperCase() == "LED" then true else false

    tesselPort: ->
      tessel.port(@connection.port.port)

    digitalWrite: (pin, value) ->
      p = do =>
        if @isLed()
          tessel.led(pin).output()
          tessel.led(pin)
        else
          @tesselPort().gpio(pin).output()
          @tesselPort().gpio(pin)

      if value == 1
        p.high()
      else
        p.low()

    digitalRead: (pin, callback) ->
      data = null
      prev_data = null
      p = do =>
        if @isLed()
          tessel.led(pin).input()
          tessel.led(pin)
        else
          @tesselPort().gpio(pin).input()
          @tesselPort().gpio(pin)

      every 0, =>
        data = p.read()
        if data != prev_data
          prev_data = data
          (callback)(data)

    i2cWrite: (address, cmd, buff, callback = null) ->
      buff = buff ? []
      cmd = if cmd instanceof Array then cmd else [cmd]
      @i2cDevice(address).send(cmd.concat(buff), callback)

    i2cRead: (address, cmd, length, callback = null) ->
      cmd = if cmd instanceof Array then cmd else [cmd]
      @i2cDevice(address).transfer cmd, length, (err, data) ->
        (callback)(data)

    i2cDevice: (address) ->
      if @i2cDevices[address] == null 
        @i2cDevices[address] = @tesselPort().I2C(address)
        @i2cDevices[address].initialize()
      @i2cDevices[address]
###
    analogRead: (pin, callback) ->
      (callback)(tesselPort().analog[pin].read())

    analogWrite: (pin, value) ->
      @tesselPort().analog[pin].write(value)
###

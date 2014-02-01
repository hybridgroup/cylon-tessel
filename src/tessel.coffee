###
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

tessel = require 'tessel'
require './cylon-tessel'
namespace = require 'node-namespace'

namespace 'Cylon.Adaptors', ->
  class @Tessel extends Cylon.Adaptor
    constructor: (opts = {}) ->
      super
      @tessel= ""
      @myself = this

    commands: ->
      ['digitalWrite']

    connect: (callback) ->
      Logger.debug "Connecting to Tessel '#{@name}'..."
      (callback)(null)
      @connection.emit 'connect'
    disconnect: ->
      Logger.debug "Disconnecting from Tessel '#{@name}'..."

    digitalWrite: (pin, value) ->
      p = tessel.led(pin).output()
      if value == 1
        p.high()
      else
        p.low()

###
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

tessel = require 'tessel'
namespace = require 'node-namespace'

namespace "Cylon.Adaptor", ->
  class @Tessel extends Cylon.Basestar
    constructor: (opts) ->
      super
      @connection = opts.connection
      @name = opts.name
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
				
module.exports = Cylon.Adaptor.Tessel

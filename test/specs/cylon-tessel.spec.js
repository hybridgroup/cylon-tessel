"use strict";

var module = source("cylon-tessel");

describe("Cylon.Tessel", function() {
  it("should be able to register", function() {
    expect(module.register).to.be.a('function');
  });

  it("should be able to create adaptor", function() {
    expect(module.adaptor()).to.be.a('object');
  });
});

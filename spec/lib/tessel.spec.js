"use strict";

var Tessel = source("tessel");

describe("Cylon.Adaptors.Tessel", function() {
  var adaptor = new Tessel();

  it("needs tests", function() {
    expect(adaptor).to.be.an.instanceOf(Tessel);
  });
});

"use strict";

var tessel = lib("cylon-tessel");

var drivers = [
  "accel-mma84",
  "ambient-attx4",
  "camera-vc0706",
  "climate-si7005",
  "climate-si7020",
  "gps-a2235h",
  "servo-pca9685",
  "audio-vs1053b",
  "relay-mono",
  "ir-attx4",
  "ble-ble113a"
];

describe("Cylon.Tessel", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(tessel.adaptors).to.be.eql(["tessel"]);
    });
  });

  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      expect(tessel.drivers).to.be.eql(drivers);
    });
  });

  describe("#dependencies", function() {
    it("is an array of dependencies", function() {
      expect(tessel.dependencies).to.be.eql(["cylon-gpio", "cylon-i2c"]);
    });
  });

  it("should be able to create adaptor instances", function() {
    expect(tessel.adaptor()).to.be.a("object");
  });

  describe("#driver", function() {
    drivers.forEach(function(driver) {
      it("should be able to create an instance of " + driver, function() {
        var opts = { connection: { port: "3000" }, driver: driver };
        tessel.driver(opts);
      });
    });
  });
});

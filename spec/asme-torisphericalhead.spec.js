var Quantity = require('@neutrium/Quantity').Quantity;
var Head = require('../dist/Heads/ASME_TorisphericalHead').ASME_TorisphericalHead;

describe("Neutrium Vessel - ASME Torispherical Head Tests - ", function() {
	describe("Top Head - ", function() {
		var rotation = 0;

		it("Total Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation);

			expect(+head.volume().scalar.toFixed(10)).toEqual(0.2617045327);
		});

		it("Partial Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("0.2m");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.2476073556);
		});

		it("Partial Volume Mixed Units", function() {
			var head = new Head("1.5m", "10mm", rotation),
				level = new Quantity("200mm");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.2476073556);
		});

		it("Partial Volume - Excessive Level", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("1m");

			expect(head.volume(level).eq(head.volume())).toEqual(true);
		});
	});

	describe("Bottom Head Tests - ", function() {
		var rotation = 180;

		it("Total Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation);

			expect(+head.volume().scalar.toFixed(10)).toEqual(0.2617045327);
		});

		it("Partial Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("0.2m");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.1857432943);
		});

		it("Partial Volume Mixed Units", function() {
			var head = new Head("1.5m", "10mm", rotation),
				level = new Quantity("200mm");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.1857432943);
		});

		it("Partial Volume - Excessive Level", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("1m");

			expect(head.volume(level).eq(head.volume())).toEqual(true);
		});
	});

	describe("Horizontal Head Tests - ", function() {
		var rotation = 90;

		it("Total Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation);

			expect(+head.volume().scalar.toFixed(10)).toEqual(0.2617045327);
		});

		it("Partial Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("1m");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.1969771841);
		});

		it("Partial Volume Mixed Units", function() {
			var head = new Head("1.5m", "10mm", rotation),
				level = new Quantity("1000mm");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.1969771841);
		});

		it("Partial Volume - Excessive Level", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("10m");

			expect(head.volume(level).eq(head.volume())).toEqual(true);
		});
	});
});
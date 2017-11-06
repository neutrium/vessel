var Quantity = require('@neutrium/Quantity').Quantity;
var Head = require('../dist/Heads/HemisphericalHead').HemisphericalHead;

describe("Neutrium Vessel - DIN Hemispherical Head Tests - ", function() {
	describe("Top - ", function() {
		var rotation = 0;

		it("Total Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation);

			expect(+head.volume().scalar.toFixed(10)).toEqual(0.8486991610);
		});

		it("Partial Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("0.2m");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.3356896470);
		});

		it("Partial Volume Mixed Units", function() {
			var head = new Head("1.5m", "10mm", rotation),
				level = new Quantity("200mm");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.3356896470);
		});

		it("Partial Volume - Excessive Level", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("1m");

			expect(head.volume(level).eq(head.volume())).toEqual(true);
		});

	});

	describe("Bottom - ", function() {
		var rotation = 180;

		it("Total Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation);

			expect(+head.volume().scalar.toFixed(10)).toEqual(0.8486991610);
		});

		it("Partial Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("0.2m");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.0846135621);
		});

		it("Partial Volume Mixed Units", function() {
			var head = new Head("1.5m", "10mm", rotation),
				level = new Quantity("200mm");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.0846135621);
		});

		it("Partial Volume - Excessive Level", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("1m");

			expect(head.volume(level).eq(head.volume())).toEqual(true);
		});
	});

	describe("Horizontal - ", function() {
		var rotation = 90;

		it("Total Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation);

			expect(+head.volume().scalar.toFixed(10)).toEqual(0.8486991610);
		});

		it("Partial Volume", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("1m");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.6387905062);
		});

		it("Partial Volume Mixed Units", function() {
			var head = new Head("1.5m", "10mm", rotation),
				level = new Quantity("1000mm");

			expect(+head.volume(level).scalar.toFixed(10)).toEqual(0.6387905062);
		});

		it("Partial Volume - Excessive Level", function() {
			var head = new Head("1.5m", "0.01m", rotation),
				level = new Quantity("10m");

			expect(head.volume(level).eq(head.volume())).toEqual(true);
		});
	});
});
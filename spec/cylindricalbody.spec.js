var Quantity = require('@neutrium/Quantity').Quantity;
var Body = require('../dist/Bodies/CylindricalBody').CylindricalBody;

describe("Neutrium Vessel - Cylindrical Body Tests - ", function() {
	describe("Vertical - ", function() {
		var rotation = 0;

		it("Total Volume", function() {
			var body = new Body("10m", "0.01m", "8m", rotation);

			expect(+body.volume().scalar.toFixed(10)).toEqual(625.8077698692);
		});

		it("Partial Volume", function() {
			var body = new Body("10m", "0.01m", "8m", rotation)
				level = new Quantity("5m");

			expect(+body.volume(level).scalar.toFixed(10)).toEqual(391.1298561683);
		});

		it("Partial Volume Mixed Units", function() {
			var body = new Body("10m", "10mm", "8m", rotation),
				level = new Quantity("5000mm");

			expect(+body.volume(level).scalar.toFixed(10)).toEqual(391.1298561683);
		});

		it("Partial Volume - Excessive Level", function() {
			var body = new Body("10m", "0.01m", "8m", rotation),
				level = new Quantity("10m");

			expect(body.volume(level).eq(body.volume())).toEqual(true);
		});
	});

	describe("Horizontal - ", function() {
		var rotation = 90;

		it("Total Volume", function() {
			var body = new Body("4m", "0.01m", "8m", rotation);

			expect(+body.volume().scalar.toFixed(10)).toEqual(99.5281685398);
		});

		it("Partial Volume", function() {
			var body = new Body("4m", "0.01m", "8m", rotation),
				level = new Quantity("2.5m");

			expect(+body.volume(level).scalar.toFixed(10)).toEqual(65.8229337791);
		});

		it("Partial Volume Mixed Units", function() {
			var body = new Body("4m", "10mm", "8m", rotation),
				level = new Quantity("2500mm");

			expect(+body.volume(level).scalar.toFixed(10)).toEqual(65.8229337791);
		});

		it("Partial Volume - Excessive Level", function() {
			var body = new Body("4m", "0.01m", "8m", rotation),
				level = new Quantity("10m");

			expect(body.volume(level).eq(body.volume())).toEqual(true);
		});
	});
});
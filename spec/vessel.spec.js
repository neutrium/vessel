var Quantity = require('@neutrium/Quantity').Quantity;
var Head = require('../dist/Heads/ASME_EllipticalHead').ASME_EllipticalHead;
var Body = require('../dist/Bodies/CylindricalBody').CylindricalBody;
var Vessel = require('../dist/Vessel').Vessel;

describe("Neutrium Vessel - Vessel Test - ", function() {
	describe("Vertical - ", function() {
		let rotation = 0,
			od = "1.5m",
			wt = "0.01m"
			topHead = new Head(od, wt, 0),
			bottomHead = new Head(od, wt, 180),
			body = new Body(od, wt, "8m", 0),
			vessel = new Vessel(body, topHead, bottomHead);

		it("Total Volume", function() {
			expect(+vessel.volume().scalar.toFixed(10)).toEqual(14.6113882578);
		});

		it("Partial Volume", function() {
			expect(+vessel.volume("5.37m").scalar.toFixed(10)).toEqual(9.0260302660);
		});

		it("Partial Volume Mixed Units", function() {
			let od = "1.5m", wt = "10mm"
				topHead = new Head(od, wt, 0),
				bottomHead = new Head(od, wt, 180),
				body = new Body(od, wt, "8m", 0),
				vessel = new Vessel(body, topHead, bottomHead);

			expect(+vessel.volume("5370mm").scalar.toFixed(10)).toEqual(9.0260302660);
		});

		it("Partial Volume - Excessive Level", function() {
			expect(+vessel.volume("100m").scalar.toFixed(10)).toEqual(14.6113882578);
		});
	});

	describe("Horizontal - ", function() {
		let rotation = 0,
			od = "1.5m",
			wt = "0.01m"
			topHead = new Head(od, wt, 90),
			bottomHead = new Head(od, wt, 270),
			body = new Body(od, wt, "8m", 90),
			vesselH = new Vessel(body, topHead, bottomHead);

		it("Total Volume", function() {
			expect(+vesselH.volume().scalar.toFixed(10)).toEqual(14.6113882578);
		});

		it("Partial Volume", function() {
			expect(+vesselH.volume("0.2m").scalar.toFixed(10)).toEqual(1.1547122382);
		});

		it("Partial Volume Mixed Units", function() {
			expect(+vesselH.volume("200mm").scalar.toFixed(10)).toEqual(1.1547122382);
		});

		it("Partial Volume - Excessive Level", function() {
			expect(+vesselH.volume("100m").scalar.toFixed(10)).toEqual(14.6113882578);
		});
	});
});
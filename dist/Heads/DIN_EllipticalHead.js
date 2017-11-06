"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("@neutrium/quantity");
var VesselHead_1 = require("./VesselHead");
var DIN_EllipticalHead = /** @class */ (function (_super) {
    __extends(DIN_EllipticalHead, _super);
    function DIN_EllipticalHead(od, wt, rotation, idd) {
        if (rotation === void 0) { rotation = 0; }
        if (idd === void 0) { idd = null; }
        var _this = this;
        od = new quantity_1.Quantity(od);
        wt = new quantity_1.Quantity(wt);
        rotation = new quantity_1.Quantity(rotation);
        var id = od.sub(wt.mul(2));
        // Determine the inside dish depth
        if (idd) {
            idd = new quantity_1.Quantity(idd);
        }
        else {
            // Note : This is the equation for a DIN semi-ellipsoidal head with L = 0.8 OD and rk = 0.154 OD
            var L = od.mul(0.8), rk = od.mul(0.154);
            idd = new quantity_1.Quantity(L.scalar.sub(L.sub(rk).pow(2).sub(od.div(2).sub(wt).sub(rk).pow(2)).scalar.sqrt()), L.units());
        }
        var C = wt.div(od).pow(2).mul(2.3227)
            .add(wt.div(od).mul(0.10462))
            .add(0.49951);
        _this = _super.call(this, od, id, wt, rotation, idd, C) || this;
        return _this;
    }
    return DIN_EllipticalHead;
}(VesselHead_1.VesselHead));
exports.DIN_EllipticalHead = DIN_EllipticalHead;

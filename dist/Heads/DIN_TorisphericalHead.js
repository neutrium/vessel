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
var DIN_TorisphericalHead = /** @class */ (function (_super) {
    __extends(DIN_TorisphericalHead, _super);
    function DIN_TorisphericalHead(od, wt, rotation, rk, idd) {
        if (rotation === void 0) { rotation = 0; }
        if (rk === void 0) { rk = null; }
        if (idd === void 0) { idd = null; }
        var _this = this;
        od = new quantity_1.Quantity(od);
        wt = new quantity_1.Quantity(wt);
        rotation = new quantity_1.Quantity(rotation);
        var id = od.sub(wt.mul(2));
        // Calculate C for the Head
        var wtdDo = wt.div(od), C = wtdDo.pow(2).mul(1.3762)
            .add(wtdDo.mul(0.05073))
            .add(0.37802);
        if (idd) {
            idd = new quantity_1.Quantity(idd);
        }
        else {
            var L = od; // The crown radius assumed to be = OD for ASME heads
            rk = rk ? rk : od.mul(0.1); // Knuckle radius
            idd = new quantity_1.Quantity(L.scalar.sub(L.sub(rk).pow(2).sub(od.div(2).sub(wt).sub(rk).pow(2)).scalar.sqrt()), L.units());
        }
        _this = _super.call(this, od, id, wt, rotation, idd, C) || this;
        return _this;
    }
    return DIN_TorisphericalHead;
}(VesselHead_1.VesselHead));
exports.DIN_TorisphericalHead = DIN_TorisphericalHead;

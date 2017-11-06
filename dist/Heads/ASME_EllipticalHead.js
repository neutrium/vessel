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
var ASME_EllipticalHead = /** @class */ (function (_super) {
    __extends(ASME_EllipticalHead, _super);
    function ASME_EllipticalHead(od, wt, rotation, idd) {
        if (rotation === void 0) { rotation = 0; }
        if (idd === void 0) { idd = null; }
        var _this = this;
        od = new quantity_1.Quantity(od);
        wt = new quantity_1.Quantity(wt);
        rotation = new quantity_1.Quantity(rotation);
        var id = od.sub(wt.mul(2));
        // Determine the inside dish depth
        idd = idd ? new quantity_1.Quantity(idd) : id.div(4);
        var C = idd.mul(2).div(id);
        _this = _super.call(this, od, id, wt, rotation, idd, C) || this;
        return _this;
    }
    return ASME_EllipticalHead;
}(VesselHead_1.VesselHead));
exports.ASME_EllipticalHead = ASME_EllipticalHead;

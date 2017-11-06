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
var math_1 = require("@neutrium/math");
var quantity_1 = require("@neutrium/quantity");
var VesselBody_1 = require("./VesselBody");
var CylindricalBody = /** @class */ (function (_super) {
    __extends(CylindricalBody, _super);
    function CylindricalBody(od, wt, length, rotation) {
        if (rotation === void 0) { rotation = 0; }
        var _this = _super.call(this, new quantity_1.Quantity(rotation)) || this;
        _this.od = new quantity_1.Quantity(od);
        _this.wt = new quantity_1.Quantity(wt);
        _this.length = new quantity_1.Quantity(length);
        // Calculate the rest of the properties
        _this.id = _this.od.sub(_this.wt.mul(2));
        return _this;
    }
    CylindricalBody.prototype.volume = function (level) {
        if (level === void 0) { level = null; }
        var area = this.id.pow(2).mul(math_1.Decimal.PI).div(4);
        level = level ? new quantity_1.Quantity(level) : null;
        if (!level || level.gt(this.maxLevel())) {
            // No level specified return full volume of body.
            return area.mul(this.length);
        }
        else {
            level = level.to(this.id);
            // Calculate a partial volume based on the level
            if (this.rotation === 0 || this.rotation === 180) {
                // Vertical body
                return area.mul(level);
            }
            else {
                // Horizontal (for now)
                var R = this.id.div(2), hDi = level.div(this.id);
                return this.length.mul(this.id.pow(2)).mul(hDi.mul(-2).add(1).scalar.acos().mul("0.25").sub(hDi.scalar.mul(-1).add(0.5).mul(hDi.sub(hDi.pow(2)).scalar.sqrt())));
            }
        }
    };
    CylindricalBody.prototype.maxLevel = function () {
        if (this.rotation === 0 || this.rotation === 180) {
            return this.length;
        }
        else if (this.rotation === 90 || this.rotation === 270) {
            return this.id;
        }
    };
    CylindricalBody.LEVEL_Exception = Error("The vessel level must exceed zero and be less than the vessel height");
    return CylindricalBody;
}(VesselBody_1.VesselBody));
exports.CylindricalBody = CylindricalBody;

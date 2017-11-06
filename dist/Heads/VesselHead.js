"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("@neutrium/math");
var quantity_1 = require("@neutrium/quantity");
var VesselHead = /** @class */ (function () {
    function VesselHead(od, id, wt, rotation, idd, C) {
        this.od = od;
        this.id = id;
        this.wt = wt;
        this.idd = idd;
        this.C = C;
        var r = (rotation.isUnitless() ? rotation.scalar : rotation.to("deg").scalar);
        this.rotation = +r.toFixed(1);
    }
    // Calculate the volume based on Neutrium articles:
    // Vertical :	https://neutrium.net/equipment/volume-and-wetted-area-of-partially-filled-vertical-vessels/
    // Horizontal :	https://neutrium.net/equipment/volume-and-wetted-area-of-partially-filled-vessels/
    VesselHead.prototype.volume = function (level) {
        var D3Cpid12 = this.id.pow(3).mul(this.C).mul(math_1.Decimal.PI).div(12);
        level = level ? new quantity_1.Quantity(level) : null;
        if (!level || level.gt(this.maxLevel())) {
            // No level specified return full volume of body.
            return D3Cpid12;
        }
        var h = level, hdz = h.div(this.idd);
        if (this.rotation == 0) {
            // Top head on a Vertical vessel
            return D3Cpid12.mul(0.5).mul(hdz.mul(3).sub(hdz.pow(3)));
        }
        else if (this.rotation == 180) {
            // Bottom head on a Vertical vessel
            return D3Cpid12.mul(0.5).mul(hdz.pow(2).mul(3).sub(hdz.pow(3)));
        }
        else if (this.rotation == 90 || this.rotation == 270) {
            // Side head on a horizontal vessel
            var hDi = h.div(this.id);
            return D3Cpid12.mul(hDi.pow(2).mul(3).sub(hDi.pow(3).mul(2)));
        }
        else {
            throw VesselHead.ORIENTATION_EXCEPTION;
        }
    };
    VesselHead.prototype.maxLevel = function () {
        if (this.rotation === 0 || this.rotation === 180) {
            return this.idd;
        }
        else if (this.rotation === 90 || this.rotation === 270) {
            return this.id;
        }
    };
    VesselHead.ORIENTATION_EXCEPTION = Error("Unsupported vessel head orientation");
    return VesselHead;
}());
exports.VesselHead = VesselHead;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VesselBody = /** @class */ (function () {
    function VesselBody(rotation) {
        var r = (rotation.isUnitless() ? rotation.scalar : rotation.to("deg").scalar);
        this.rotation = +r.toFixed(1);
    }
    VesselBody.ORIENTATION_EXCEPTION = Error("Unsupported vessel head orientation");
    return VesselBody;
}());
exports.VesselBody = VesselBody;

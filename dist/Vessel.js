"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("@neutrium/quantity");
var Vessel = /** @class */ (function () {
    function Vessel(body, topHead, bottomHead) {
        if (topHead === void 0) { topHead = null; }
        if (bottomHead === void 0) { bottomHead = null; }
        this.body = body;
        this.topHead = topHead;
        this.bottomHead = bottomHead;
        this.rotation = body.rotation;
    }
    Vessel.prototype.volume = function (level) {
        var components = this.getComponents(), volume = null;
        level = level ? new quantity_1.Quantity(level) : null;
        for (var i = 0, len = components.length; i < len; i++) {
            var c = components[i];
            if (c) {
                if (!volume) {
                    volume = c.volume(level);
                }
                else {
                    volume = volume.add(c.volume(level));
                }
                if (level && this.rotation !== 90 && this.rotation !== 270) {
                    level = level.sub(c.maxLevel());
                }
            }
            if (level && !level.scalar.gt(0))
                break;
        }
        return volume;
    };
    Vessel.prototype.maxLevel = function () {
        if (this.rotation !== 90 && this.rotation !== 270) {
            var components = this.getComponents(), level = this.iterateComponents(function (c) { return c.maxLevel(); });
        }
        else {
            return this.body.maxLevel();
        }
    };
    Vessel.prototype.getComponents = function () {
        return [
            this.bottomHead,
            this.body,
            this.topHead
        ];
    };
    Vessel.prototype.iterateComponents = function (callback) {
        var components = this.getComponents(), quantity = null;
        for (var i = 0, len = components.length; i < len; i++) {
            var c = components[i];
            if (c) {
                if (!quantity) {
                    quantity = callback(c);
                }
                else {
                    quantity.add(callback(c));
                }
            }
        }
        return quantity;
    };
    return Vessel;
}());
exports.Vessel = Vessel;

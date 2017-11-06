import { Quantity, QuantityInput } from '@neutrium/quantity';
import { VesselBody } from './VesselBody';
export declare class CylindricalBody extends VesselBody {
    readonly id: Quantity;
    readonly od: Quantity;
    readonly wt: Quantity;
    readonly length: Quantity;
    protected static readonly LEVEL_Exception: Error;
    constructor(od: QuantityInput, wt: QuantityInput, length: QuantityInput, rotation?: QuantityInput);
    volume(level?: QuantityInput): Quantity;
    maxLevel(): Quantity;
}

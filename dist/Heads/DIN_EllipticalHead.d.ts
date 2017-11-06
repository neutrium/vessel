import { QuantityInput } from '@neutrium/quantity';
import { VesselHead } from './VesselHead';
export declare class DIN_EllipticalHead extends VesselHead {
    constructor(od: QuantityInput, wt: QuantityInput, rotation?: QuantityInput, idd?: QuantityInput);
}

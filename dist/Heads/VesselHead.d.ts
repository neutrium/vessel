import { Quantity } from '@neutrium/quantity';
import { IVesselComponent } from '../IVesselComponent';
export declare abstract class VesselHead implements IVesselComponent {
    readonly id: Quantity;
    readonly od: Quantity;
    readonly wt: Quantity;
    readonly idd: Quantity;
    readonly C: Quantity;
    readonly rotation: number;
    protected static readonly ORIENTATION_EXCEPTION: Error;
    constructor(od: Quantity, id: Quantity, wt: Quantity, rotation: Quantity, idd: Quantity, C: Quantity);
    volume(level: number | string | Quantity): Quantity;
    maxLevel(): Quantity;
}

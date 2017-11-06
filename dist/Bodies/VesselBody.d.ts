import { Quantity } from '@neutrium/quantity';
import { IVesselComponent } from '../IVesselComponent';
export declare abstract class VesselBody implements IVesselComponent {
    readonly rotation: number;
    protected static readonly ORIENTATION_EXCEPTION: Error;
    constructor(rotation: Quantity);
    abstract volume(level: number | string | Quantity): Quantity;
    abstract maxLevel(): Quantity;
}

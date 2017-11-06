import { Quantity, QuantityInput } from '@neutrium/quantity';
import { VesselBody } from './Bodies';
import { VesselHead } from './Heads';
import { IVesselComponent } from './IVesselComponent';
export declare class Vessel implements IVesselComponent {
    readonly body: VesselBody;
    readonly topHead: VesselHead;
    readonly bottomHead: VesselHead;
    readonly rotation: number;
    constructor(body: VesselBody, topHead?: VesselHead, bottomHead?: VesselHead);
    volume(level: QuantityInput): Quantity;
    maxLevel(): Quantity;
    private getComponents();
    private iterateComponents(callback);
}

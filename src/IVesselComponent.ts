import { Quantity } from '@neutrium/quantity'

export interface IVesselComponent
{
	volume(level : Quantity) : Quantity;
	maxLevel() : Quantity
}
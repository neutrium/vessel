import { Decimal } from '@neutrium/math'
import { Quantity } from '@neutrium/quantity'
import { IVesselComponent } from '../IVesselComponent'

export abstract class VesselBody implements IVesselComponent
{
	public readonly rotation : number;

	protected static readonly ORIENTATION_EXCEPTION = Error("Unsupported vessel head orientation");

	constructor(rotation : Quantity)
	{
		let r : Decimal = (rotation.isUnitless() ? rotation.scalar : rotation.to("deg").scalar);
		this.rotation = +r.toFixed(1);
	}

	public abstract volume(level : number | string | Quantity) : Quantity;

	public abstract maxLevel() : Quantity
}
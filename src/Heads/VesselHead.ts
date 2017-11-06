import { Decimal } from '@neutrium/math'
import { Quantity } from '@neutrium/quantity'
import { IVesselComponent } from '../IVesselComponent'

export abstract class VesselHead implements IVesselComponent
{
	public readonly id : Quantity;
	public readonly od : Quantity;
	public readonly wt : Quantity;
	public readonly idd : Quantity;
	public readonly C : Quantity;
	public readonly rotation : number;

	protected static readonly ORIENTATION_EXCEPTION = Error("Unsupported vessel head orientation");

	constructor(od : Quantity, id : Quantity, wt : Quantity, rotation : Quantity, idd : Quantity, C : Quantity)
	{
		this.od = od;
		this.id = id;
		this.wt = wt;
		this.idd = idd;
		this.C = C;

		let r : Decimal = (rotation.isUnitless() ? rotation.scalar : rotation.to("deg").scalar);
		this.rotation = +r.toFixed(1);
	}

	// Calculate the volume based on Neutrium articles:
	// Vertical :	https://neutrium.net/equipment/volume-and-wetted-area-of-partially-filled-vertical-vessels/
	// Horizontal :	https://neutrium.net/equipment/volume-and-wetted-area-of-partially-filled-vessels/
	public volume(level : number | string | Quantity) : Quantity
	{
		let D3Cpid12 = this.id.pow(3).mul(this.C).mul(Decimal.PI).div(12);

		level = level ? new Quantity(level) : null;

		if(!level || level.gt(this.maxLevel()))
		{
			// No level specified return full volume of body.
			return D3Cpid12;
		}

		let h = level,
			hdz = h.div(this.idd);

		if(this.rotation == 0)
		{
			// Top head on a Vertical vessel
			return D3Cpid12.mul(0.5).mul(
				hdz.mul(3).sub(hdz.pow(3))
			);
		}
		else if(this.rotation == 180)
		{
			// Bottom head on a Vertical vessel
			return D3Cpid12.mul(0.5).mul(
				hdz.pow(2).mul(3).sub(hdz.pow(3))
			);
		}
		else if(this.rotation == 90 || this.rotation == 270)
		{
			// Side head on a horizontal vessel
			let hDi = h.div(this.id);

			return D3Cpid12.mul(
				hDi.pow(2).mul(3).sub(
					hDi.pow(3).mul(2)
				)
			);
		}
		else
		{
			throw VesselHead.ORIENTATION_EXCEPTION;
		}
	}

	public maxLevel() : Quantity
	{
		if(this.rotation === 0 || this.rotation === 180)
		{
			return this.idd;
		}
		else if(this.rotation === 90 || this.rotation === 270)
		{
			return this.id;
		}
	}
}
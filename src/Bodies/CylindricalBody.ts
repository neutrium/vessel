import { Decimal } from '@neutrium/math'
import { Quantity, QuantityInput } from '@neutrium/quantity'
import { VesselBody } from './VesselBody'

export class CylindricalBody extends VesselBody
{
	public readonly id : Quantity;
	public readonly od : Quantity;
	public readonly wt : Quantity;
	public readonly length : Quantity;

	protected static readonly LEVEL_Exception = Error("The vessel level must exceed zero and be less than the vessel height");

	constructor(od: QuantityInput, wt : QuantityInput, length : QuantityInput, rotation : QuantityInput = 0)
    {
		super(new Quantity(rotation));

		this.od = new Quantity(od);
		this.wt = new Quantity(wt);
		this.length = new Quantity(length);

        // Calculate the rest of the properties
		this.id = this.od.sub(this.wt.mul(2));
	}

	public volume(level : QuantityInput = null) : Quantity
	{
		let area = this.id.pow(2).mul(Decimal.PI).div(4);

		level = level ? new Quantity(level) : null;

		if(!level || level.gt(this.maxLevel()))
		{
			// No level specified return full volume of body.
			return area.mul(this.length);
		}
		else
		{
			level = <Quantity>level.to(this.id);

			// Calculate a partial volume based on the level
			if(this.rotation === 0 || this.rotation === 180)
			{
				// Vertical body
				return area.mul(level);
			}
			else
			{
				// Horizontal (for now)
				let R = this.id.div(2),
					hDi = level.div(this.id);

				return this.length.mul(this.id.pow(2)).mul(
					hDi.mul(-2).add(1).scalar.acos().mul("0.25").sub(
						hDi.scalar.mul(-1).add(0.5).mul(
							hDi.sub(hDi.pow(2)).scalar.sqrt()
						)
					)
				)
			}
		}
	}

	public maxLevel() : Quantity
	{
		if(this.rotation === 0 || this.rotation === 180)
		{
			return this.length;
		}
		else if(this.rotation === 90 || this.rotation === 270)
		{
			return this.id;
		}
	}
}
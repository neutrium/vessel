import { Decimal } from '@neutrium/math'
import { Quantity, QuantityInput } from '@neutrium/quantity'
import { VesselHead } from './VesselHead'

export class HemisphericalHead extends VesselHead
{
	constructor(od: QuantityInput, wt : QuantityInput, rotation : QuantityInput = 0)
	{
		od = new Quantity(od);
		wt = new Quantity(wt);
		rotation = new Quantity(rotation);

		let id = od.sub(wt.mul(2)),
			C = new Quantity(1),
			idd = id.mul(0.5);

		super(od, id, wt, rotation, idd, C);
	}
}
import { Decimal } from '@neutrium/math'
import { Quantity, QuantityInput } from '@neutrium/quantity'
import { VesselHead } from './VesselHead'

export class ASME_EllipticalHead extends VesselHead
{
	constructor(od: QuantityInput, wt : QuantityInput, rotation : QuantityInput= 0, idd : QuantityInput = null)
	{
		od = new Quantity(od);
		wt = new Quantity(wt);
		rotation = new Quantity(rotation);

		let id = od.sub(wt.mul(2));

		// Determine the inside dish depth
		idd = idd ? new Quantity(idd) : id.div(4);

		let C = idd.mul(2).div(id);

		super(od, id, wt, rotation, idd, C);
	}
}
import { Decimal } from '@neutrium/math'
import { Quantity, QuantityInput } from '@neutrium/quantity'
import { VesselHead } from './VesselHead'

export class DIN_EllipticalHead extends VesselHead
{
	constructor(od: QuantityInput, wt : QuantityInput, rotation : QuantityInput= 0, idd : QuantityInput = null)
	{
		od = new Quantity(od);
		wt = new Quantity(wt);
		rotation = new Quantity(rotation);
		let id = od.sub(wt.mul(2));

		// Determine the inside dish depth
		if(idd)
		{
			idd = new Quantity(idd)
		}
		else
		{
			// Note : This is the equation for a DIN semi-ellipsoidal head with L = 0.8 OD and rk = 0.154 OD
			let L = od.mul(0.8),
				rk = od.mul(0.154);

			idd = new Quantity(L.scalar.sub(
				L.sub(rk).pow(2).sub(
					od.div(2).sub(wt).sub(rk).pow(2)
				).scalar.sqrt()
			), L.units())
		}

		let C = wt.div(od).pow(2).mul(2.3227)
					.add(wt.div(od).mul(0.10462))
					.add(0.49951);

		super(od, id, wt, rotation, idd, C);
	}
}
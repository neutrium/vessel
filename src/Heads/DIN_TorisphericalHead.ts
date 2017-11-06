import { Quantity, QuantityInput } from '@neutrium/quantity'
import { VesselHead } from './VesselHead'

export class DIN_TorisphericalHead extends VesselHead
{
	constructor(od: QuantityInput, wt : QuantityInput, rotation : QuantityInput = 0, rk : QuantityInput = null, idd : QuantityInput = null)
	{
		od = new Quantity(od);
		wt = new Quantity(wt);
		rotation = new Quantity(rotation);

		let id = od.sub(wt.mul(2));

		// Calculate C for the Head
		let wtdDo = wt.div(od),
			C = wtdDo.pow(2).mul(1.3762)
					.add(wtdDo.mul(0.05073))
					.add(0.37802);

		if(idd)
		{
			idd = new Quantity(idd);
		}
		else
		{
			let L = od;	// The crown radius assumed to be = OD for ASME heads
			rk = rk ? rk : od.mul(0.1);	// Knuckle radius

			idd = new Quantity(L.scalar.sub(
				L.sub(rk).pow(2).sub(
					od.div(2).sub(wt).sub(rk).pow(2)
				).scalar.sqrt()
			), L.units())
		}

		super(od, id, wt, rotation, idd, C);
	}
}
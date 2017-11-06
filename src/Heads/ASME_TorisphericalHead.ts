import { Quantity, QuantityInput } from '@neutrium/quantity'
import { VesselHead } from './VesselHead'

export class ASME_TorisphericalHead extends VesselHead
{
	constructor(od: QuantityInput, wt : QuantityInput, rotation : QuantityInput = 0, rk : QuantityInput = null, idd : QuantityInput = null)
	{
		od = new Quantity(od);
		wt = new Quantity(wt);
		rotation = new Quantity(rotation);

		let id = od.sub(wt.mul(2));

		// Knuckle radius
		if(rk)
		{
			rk = new Quantity(rk);
		}
		else
		{
			// Calculate knuckle radius based on ASME minimum requirements
			let odCriteria = od.mul(0.06),
				wtCriteria = wt.mul(3);

			rk = wtCriteria.gte(odCriteria) ? wtCriteria : odCriteria;
		}

		// Calculate C for the Head
		let wtdDo = wt.div(od),
			C = wtdDo.pow(2).mul(0.98997)
				.add(wtdDo.mul(-0.16116))
				.add(rk.sub(od.mul(0.06)).div(id).mul(1.7197))
				.add(0.30939);

		if(idd)
		{
			idd = new Quantity(idd);
		}
		else
		{
			let L = od;	// The crown radius assumed to be = OD for ASME heads

			idd = new Quantity(L.scalar.sub(
				L.sub(rk).pow(2).sub(
					od.div(2).sub(wt).sub(rk).pow(2)
				).scalar.sqrt()
			), L.units())
		}

		super(od, id, wt, rotation, idd, C);
	}
}
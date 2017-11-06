import { Quantity, QuantityInput } from '@neutrium/quantity'
import { VesselBody } from './Bodies'
import { VesselHead } from './Heads'
import { IVesselComponent } from './IVesselComponent'

export class Vessel implements IVesselComponent
{
	public readonly body : VesselBody;
	public readonly topHead : VesselHead;
	public readonly bottomHead : VesselHead;
	public readonly rotation : number

	constructor(body : VesselBody, topHead : VesselHead = null, bottomHead : VesselHead = null)
	{
		this.body = body;
		this.topHead = topHead;
		this.bottomHead = bottomHead;
		this.rotation = body.rotation;
	}

	public volume(level : QuantityInput) : Quantity
	{
		let components : IVesselComponent[] = this.getComponents(),
			volume = null;

		level = level ? new Quantity(level) : null;

		for(let i = 0, len = components.length; i < len; i++)
		{
			let c = components[i];

			if(c)
			{
				if(!volume)
				{
					volume = c.volume(level);
				}
				else
				{
					volume = volume.add(c.volume(level));
				}

				if(level && this.rotation !== 90 && this.rotation !== 270)
				{
					level = level.sub(c.maxLevel());
				}
			}

			if(level && !level.scalar.gt(0)) break;
		}

		return volume;
	}

	public maxLevel() : Quantity
	{
		if(this.rotation !== 90 && this.rotation !== 270)
		{
			let components = this.getComponents(),
				level = this.iterateComponents((c) => c.maxLevel());
		}
		else
		{
			return this.body.maxLevel();
		}
	}

	private getComponents() : IVesselComponent[]
	{
		return [
			this.bottomHead,
			this.body,
			this.topHead
		];
	}

	private iterateComponents(callback : (c : IVesselComponent) => Quantity) : Quantity
	{
		let components = this.getComponents(),
			quantity = null;

			for(let i = 0, len = components.length; i < len; i++)
			{
				let c = components[i];

				if(c)
				{
					if(!quantity)
					{
						quantity = callback(c);
					}
					else
					{
						quantity.add(callback(c));
					}
				}
			}

		return quantity;
	}
}
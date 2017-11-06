# Neutrium Vessel

Neutrium Vessel is a module of the Neutrium engineering library for calculating the volumes and wetted areas of vessel and tanks.

## Getting Started

### Installing

You can install Neutrium Vessel using npm.

	npm install @neutrium/vessel --save

### Including

#### Typescript

You can include components of the Neutrium Vessel module using an import statement in typescript:

    import { HemisphericalHead } from "@neutrium/vessel"

    let head = new HemisphericalHead("1.5m", "0.01m");

This module is built with the declaration files so type hinting should work once the module has been imported.

#### Node

    var Vessel = require("@neutrium/vessel");

#### Browsers

The Vessel module is a commonjs (node) package, to use it in a browser environment you will need to use a tool like [browserify](http://browserify.org) or [webpack](https://webpack.js.org) to bundle it up.

## Usage

### General

#### Component Attributes

The properties of vessel components (heads and bodies) are converted to [Neutrium Quantities](https://github.com/neutrium/quantity). This means that after a component has been created you can effortlessly perform comarsions and convert between units, for example:

	let component = new ASME_EllipticalHead("1.5m", "7mm"),
		sillyMeasure = component.od.to("ft");

This also means that constructor/function parameters that refer to a quantity (that's pretty much all parameters) must be supplied as a Quantity or suitable quantity initalisation parameter (e.g. "1 m").

Components also have a rotation attribute (defaults to 0 degrees) which is used to determine the orientation of the component when performing orientation sensitive calculations like partial volume. Currently only vertical top (0 degrees), vertical bottom (180 degrees) an horizontal (90 or 270 degrees) orientations are supported.

#### Component Functions

The vessel components in this library implement the `IVesselComponent` interface and can therefore be relied on for calculating some important additonal information:

	// Return the max liquid level of the component at its specified orientation
	component.maxLevel()

	// Return the total volume of the component
	component.volume()

	// Return the partial volume of the component for a given liquid level
	// If the level provided exceeds the maximum level of the component the total volume is returned.
	let partialVolume = head.volume("0.2 m");

### Heads

Neutrium Vessel includes support for several head types including Hemispherical and ASME or DIN 28011 Elliptical and Torispherical heads. The constructor signatures for each head are as follows ([] indicates an optional parameter):

	ASME_EllipticalHead(od, wt, [rotation, idd])
	ASME_TorisphericalHead(od, wt, [rotation, rk, idd])
	DIN_EllipticalHead(od, wt, [rotation, idd])
	DIN_TorisphericalHead(od, wt, [rotation, rk, idd])
	HemisphericalHead(od, wt, [rotation])

Where the input parameters are :

	od 			: string | Quantity 			// The outer diameter
	wt 			: string | Quantity 			// The wall thickness
	rotation	: string | number | Quantity	// The rotation of the head (optional) with 0 indicating a vertical top head. Defaults to 0.
	idd 		: string | Quantity				// The inner dish depth (optional). Defaults to value calculated using the approprate ASME or DIN 28011 method
	rk			: string | Quantity				// The knuckle radius (optional). Defaults to value calculated using the approprate ASME or DIN 28011 method

For example creation of a horizontal ASME elliptical head can be completed as follows:

	let head = new ASME_EllipticalHead("1.5m", "7mm", 90);

Once a head object is created you can access the following attributes:

	id			: Quantity			// Inner diameter
	od			: Quantity			// Outer diameter
	wt			: Quantity			// Wall thickness
	idd			: Quantity			// Inner dish depth
	C			: Quantity			// Ecentrciity volumetric correction factor
	rotation	: number			// Orientation of the head in degrees

### Bodies

The Neutrium Vessel module currently only supports the creation of vessels with cylindrical bodies. The constructor signature is as follows:

	CylindricalBody(od, wt, length, [rotation])

Where the input parameters are :

	od 			: string | Quantity 			// The outer diameter
	wt 			: string | Quantity 			// The wall thickness
	length		: string | Quantity				// The vessel body length (this should include the straightface of the heads if appropriate)
	rotation	: string | number | Quantity	// The vesel rotation (optional) with 0 indicating a vertical vesssel. Defaults to 0.

For example creation of a horizontal ASME elliptical head can be completed as follows:

	let head = new CylindricalBody("1.5m", "7mm", "5m");

Once a vessel body object is created you can access the following attributes:

	id 		: Quantity			// Inner diameter
	od 		: Quantity			// Outer diameter
	wt 		: Quantity			// Wall thickness
	length	: Quantity			// The length of the vessel body

### Vessels

The Neutrium Vessel module provides a Vessel object which can be used to group together the components of a tank to easily perform aggregate calculations. A vessel may be created by providing a body and two head components. For example:

	let topHead = new ASME_EllipticalHead("1.5m", "7mm"),
		bottomHead = new ASME_EllipticalHead("1.5m", "7mm", 180),
		body = new CylindricalBody("1.5m", "7mm", "5m"),
		vessel = new Vessel(body, topHead, bottomHead);

Now calling functions such as `volume()` and `maxLevel()` will take into account all the components of the vessel. Vessel objects assume the orientation of their bodies when performing volume and level calculations.

Indivdual components and still be accessed and used as indidual components:

	vessel.body			// The instance of CylindricalBody
	vessel.topHead		// The instance of ASME_EllipticalHead rotated 0 degrees
	vessel.bottomHead	// The instance of ASME_EllipticalHead rotated 180 degrees

## Donations

NeutriumJS is free software, but you can support the developers by [donating here](https://neutrium.net/donate/).

## Release Notes

| Version | Notes |
|:-------:|:------|
| 1.0.0	  | Initial Release |

## License

[Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/legalcode)
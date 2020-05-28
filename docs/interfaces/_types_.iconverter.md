[slider](../globals.md) › ["types"](../modules/_types_.md) › [IConverter](_types_.iconverter.md)

# Interface: IConverter

## Hierarchy

* **IConverter**

## Implemented by

* [Converter](../classes/_presenter_converter_.converter.md)

## Index

### Methods

* [calcValueWithStep](_types_.iconverter.md#calcvaluewithstep)
* [coordInValue](_types_.iconverter.md#coordinvalue)
* [valueInCoord](_types_.iconverter.md#valueincoord)

## Methods

###  calcValueWithStep

▸ **calcValueWithStep**(`value`: number, `step`: number): *number*

Defined in types.ts:116

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`step` | number |

**Returns:** *number*

___

###  coordInValue

▸ **coordInValue**(`coord`: number, `step`: number, `width`: number, `range`: [IRangeValues](_types_.irangevalues.md)): *number*

Defined in types.ts:105

**Parameters:**

Name | Type |
------ | ------ |
`coord` | number |
`step` | number |
`width` | number |
`range` | [IRangeValues](_types_.irangevalues.md) |

**Returns:** *number*

___

###  valueInCoord

▸ **valueInCoord**(`valueOrIndex`: number, `width`: number, `range`: [IRangeValues](_types_.irangevalues.md)): *number*

Defined in types.ts:111

**Parameters:**

Name | Type |
------ | ------ |
`valueOrIndex` | number |
`width` | number |
`range` | [IRangeValues](_types_.irangevalues.md) |

**Returns:** *number*

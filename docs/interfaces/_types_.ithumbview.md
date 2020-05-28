[slider](../globals.md) › ["types"](../modules/_types_.md) › [IThumbView](_types_.ithumbview.md)

# Interface: IThumbView

## Hierarchy

* **IThumbView**

## Implemented by

* [ThumbView](../classes/_view_thumbview_.thumbview.md)

## Index

### Methods

* [addDragNDropHandler](_types_.ithumbview.md#adddragndrophandler)
* [appendToNode](_types_.ithumbview.md#appendtonode)
* [getCoord](_types_.ithumbview.md#getcoord)
* [getModifier](_types_.ithumbview.md#getmodifier)
* [getWidth](_types_.ithumbview.md#getwidth)
* [hideValue](_types_.ithumbview.md#hidevalue)
* [isInDOM](_types_.ithumbview.md#isindom)
* [isValueShowing](_types_.ithumbview.md#isvalueshowing)
* [removeFromDOM](_types_.ithumbview.md#removefromdom)
* [setPosition](_types_.ithumbview.md#setposition)
* [setValue](_types_.ithumbview.md#setvalue)
* [showValue](_types_.ithumbview.md#showvalue)

## Methods

###  addDragNDropHandler

▸ **addDragNDropHandler**(`getOptionsCallback`: Function, `emitCallback`: Function, `emitCallbackType`: string, `getWidthCallback`: Function): *void*

Defined in types.ts:66

**Parameters:**

Name | Type |
------ | ------ |
`getOptionsCallback` | Function |
`emitCallback` | Function |
`emitCallbackType` | string |
`getWidthCallback` | Function |

**Returns:** *void*

___

###  appendToNode

▸ **appendToNode**(): *void*

Defined in types.ts:56

**Returns:** *void*

___

###  getCoord

▸ **getCoord**(`position`: ISliderOptions["position"]): *number*

Defined in types.ts:64

**Parameters:**

Name | Type |
------ | ------ |
`position` | ISliderOptions["position"] |

**Returns:** *number*

___

###  getModifier

▸ **getModifier**(): *[TModifier](../modules/_types_.md#tmodifier)*

Defined in types.ts:55

**Returns:** *[TModifier](../modules/_types_.md#tmodifier)*

___

###  getWidth

▸ **getWidth**(): *number*

Defined in types.ts:65

**Returns:** *number*

___

###  hideValue

▸ **hideValue**(): *void*

Defined in types.ts:60

**Returns:** *void*

___

###  isInDOM

▸ **isInDOM**(): *boolean*

Defined in types.ts:58

**Returns:** *boolean*

___

###  isValueShowing

▸ **isValueShowing**(): *boolean*

Defined in types.ts:61

**Returns:** *boolean*

___

###  removeFromDOM

▸ **removeFromDOM**(): *void*

Defined in types.ts:57

**Returns:** *void*

___

###  setPosition

▸ **setPosition**(`position`: ISliderOptions["position"], `coord`: number): *void*

Defined in types.ts:63

**Parameters:**

Name | Type |
------ | ------ |
`position` | ISliderOptions["position"] |
`coord` | number |

**Returns:** *void*

___

###  setValue

▸ **setValue**(`value`: string | number): *void*

Defined in types.ts:62

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; number |

**Returns:** *void*

___

###  showValue

▸ **showValue**(): *void*

Defined in types.ts:59

**Returns:** *void*

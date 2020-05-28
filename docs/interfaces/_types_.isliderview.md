[slider](../globals.md) › ["types"](../modules/_types_.md) › [ISliderView](_types_.isliderview.md)

# Interface: ISliderView

## Hierarchy

* [IEventEmitter](_types_.ieventemitter.md)

  ↳ **ISliderView**

## Implemented by

* [SliderView](../classes/_view_sliderview_.sliderview.md)

## Index

### Methods

* [calcValues](_types_.isliderview.md#calcvalues)
* [emit](_types_.isliderview.md#emit)
* [getInputByModifier](_types_.isliderview.md#getinputbymodifier)
* [getOptions](_types_.isliderview.md#getoptions)
* [getThumbByModifier](_types_.isliderview.md#getthumbbymodifier)
* [getWidth](_types_.isliderview.md#getwidth)
* [isRange](_types_.isliderview.md#isrange)
* [on](_types_.isliderview.md#on)
* [render](_types_.isliderview.md#render)
* [resizeRangeLine](_types_.isliderview.md#resizerangeline)
* [setOrientation](_types_.isliderview.md#setorientation)
* [setRange](_types_.isliderview.md#setrange)
* [setShowValue](_types_.isliderview.md#setshowvalue)

## Methods

###  calcValues

▸ **calcValues**(): *void*

Defined in types.ts:97

**Returns:** *void*

___

###  emit

▸ **emit**(`eventName`: string, `arg`: any): *void*

*Inherited from [IEventEmitter](_types_.ieventemitter.md).[emit](_types_.ieventemitter.md#emit)*

Defined in types.ts:39

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |
`arg` | any |

**Returns:** *void*

___

###  getInputByModifier

▸ **getInputByModifier**(`modifier`: [TModifier](../modules/_types_.md#tmodifier)): *[IValueInputView](_types_.ivalueinputview.md)*

Defined in types.ts:94

**Parameters:**

Name | Type |
------ | ------ |
`modifier` | [TModifier](../modules/_types_.md#tmodifier) |

**Returns:** *[IValueInputView](_types_.ivalueinputview.md)*

___

###  getOptions

▸ **getOptions**(): *[ISliderOptions](_types_.islideroptions.md)*

Defined in types.ts:98

**Returns:** *[ISliderOptions](_types_.islideroptions.md)*

___

###  getThumbByModifier

▸ **getThumbByModifier**(`modifier`: [TModifier](../modules/_types_.md#tmodifier)): *[IThumbView](_types_.ithumbview.md)*

Defined in types.ts:93

**Parameters:**

Name | Type |
------ | ------ |
`modifier` | [TModifier](../modules/_types_.md#tmodifier) |

**Returns:** *[IThumbView](_types_.ithumbview.md)*

___

###  getWidth

▸ **getWidth**(): *number*

Defined in types.ts:101

**Returns:** *number*

___

###  isRange

▸ **isRange**(): *boolean*

Defined in types.ts:99

**Returns:** *boolean*

___

###  on

▸ **on**(`eventName`: string, `callback`: Function): *void*

*Inherited from [IEventEmitter](_types_.ieventemitter.md).[on](_types_.ieventemitter.md#on)*

Defined in types.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |
`callback` | Function |

**Returns:** *void*

___

###  render

▸ **render**(`state`: [IState](_types_.istate.md)): *void*

Defined in types.ts:91

**Parameters:**

Name | Type |
------ | ------ |
`state` | [IState](_types_.istate.md) |

**Returns:** *void*

___

###  resizeRangeLine

▸ **resizeRangeLine**(): *void*

Defined in types.ts:100

**Returns:** *void*

___

###  setOrientation

▸ **setOrientation**(`orientation`: IState["orientation"]): *void*

Defined in types.ts:92

**Parameters:**

Name | Type |
------ | ------ |
`orientation` | IState["orientation"] |

**Returns:** *void*

___

###  setRange

▸ **setRange**(`isRange`: IState["isRange"]): *void*

Defined in types.ts:95

**Parameters:**

Name | Type |
------ | ------ |
`isRange` | IState["isRange"] |

**Returns:** *void*

___

###  setShowValue

▸ **setShowValue**(`isShowValue`: IState["isShowValue"]): *void*

Defined in types.ts:96

**Parameters:**

Name | Type |
------ | ------ |
`isShowValue` | IState["isShowValue"] |

**Returns:** *void*

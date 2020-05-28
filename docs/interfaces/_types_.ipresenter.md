[slider](../globals.md) › ["types"](../modules/_types_.md) › [IPresenter](_types_.ipresenter.md)

# Interface: IPresenter

## Hierarchy

* [IEventEmitter](_types_.ieventemitter.md)

  ↳ **IPresenter**

## Implemented by

* [Presenter](../classes/_presenter_presenter_.presenter.md)

## Index

### Methods

* [changeOrientation](_types_.ipresenter.md#changeorientation)
* [changeRangeState](_types_.ipresenter.md#changerangestate)
* [changeShowValues](_types_.ipresenter.md#changeshowvalues)
* [changeStep](_types_.ipresenter.md#changestep)
* [changeValues](_types_.ipresenter.md#changevalues)
* [emit](_types_.ipresenter.md#emit)
* [on](_types_.ipresenter.md#on)
* [renderApp](_types_.ipresenter.md#renderapp)

## Methods

###  changeOrientation

▸ **changeOrientation**(): *void*

Defined in types.ts:137

**Returns:** *void*

___

###  changeRangeState

▸ **changeRangeState**(): *void*

Defined in types.ts:139

**Returns:** *void*

___

###  changeShowValues

▸ **changeShowValues**(): *void*

Defined in types.ts:138

**Returns:** *void*

___

###  changeStep

▸ **changeStep**(`inputValue`: string): *void*

Defined in types.ts:141

**Parameters:**

Name | Type |
------ | ------ |
`inputValue` | string |

**Returns:** *void*

___

###  changeValues

▸ **changeValues**(`values`: string[]): *void*

Defined in types.ts:140

**Parameters:**

Name | Type |
------ | ------ |
`values` | string[] |

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

###  renderApp

▸ **renderApp**(): *void*

Defined in types.ts:136

**Returns:** *void*

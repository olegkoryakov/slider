[slider](../globals.md) › ["types"](../modules/_types_.md) › [IEventEmitter](_types_.ieventemitter.md)

# Interface: IEventEmitter

## Hierarchy

* **IEventEmitter**

  ↳ [ISliderView](_types_.isliderview.md)

  ↳ [IConfigPanelView](_types_.iconfigpanelview.md)

  ↳ [IPresenter](_types_.ipresenter.md)

## Implemented by

* [ConfigPanelView](../classes/_view_configpanelview_.configpanelview.md)
* [EventEmitter](../classes/_eventemitter_eventemitter_.eventemitter.md)
* [Presenter](../classes/_presenter_presenter_.presenter.md)
* [SliderView](../classes/_view_sliderview_.sliderview.md)

## Index

### Methods

* [emit](_types_.ieventemitter.md#emit)
* [on](_types_.ieventemitter.md#on)

## Methods

###  emit

▸ **emit**(`eventName`: string, `arg`: any): *void*

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

Defined in types.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |
`callback` | Function |

**Returns:** *void*

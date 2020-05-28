[slider](../globals.md) › ["Model/Model"](../modules/_model_model_.md) › [Model](_model_model_.model.md)

# Class: Model

Хранит в себе данные о слайдере

## Hierarchy

* **Model**

## Implements

* [IModel](../interfaces/_types_.imodel.md)

## Index

### Constructors

* [constructor](_model_model_.model.md#constructor)

### Properties

* [rangeValues](_model_model_.model.md#private-rangevalues)
* [state](_model_model_.model.md#private-state)
* [step](_model_model_.model.md#private-step)
* [values](_model_model_.model.md#private-values)

### Methods

* [getRangeValues](_model_model_.model.md#getrangevalues)
* [getState](_model_model_.model.md#getstate)
* [getStep](_model_model_.model.md#getstep)
* [getValues](_model_model_.model.md#getvalues)
* [setOrientationState](_model_model_.model.md#setorientationstate)
* [setRangeState](_model_model_.model.md#setrangestate)
* [setShowValueState](_model_model_.model.md#setshowvaluestate)
* [setStep](_model_model_.model.md#setstep)
* [setValues](_model_model_.model.md#setvalues)

## Constructors

###  constructor

\+ **new Model**(`orientation`: IState["orientation"], `isRange`: IState["isRange"], `isShowValue`: IState["isShowValue"], `step`: number, `values`: [TValues](../modules/_types_.md#tvalues)): *[Model](_model_model_.model.md)*

Defined in Model/Model.ts:4

Записывает объект this.state, устанавливет размер this.step, устанавливает this.values

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`orientation` | IState["orientation"] | Вертикальная или горизональная ориентация |
`isRange` | IState["isRange"] | Если true, то промежуток значений, если false то одиночное значение |
`isShowValue` | IState["isShowValue"] | Если true, то показывать значения, если false то нет |
`step` | number | Размер шага |
`values` | [TValues](../modules/_types_.md#tvalues) | Значения слайдера  |

**Returns:** *[Model](_model_model_.model.md)*

## Properties

### `Private` rangeValues

• **rangeValues**: *[IRangeValues](../interfaces/_types_.irangevalues.md)*

Defined in Model/Model.ts:47

Текущий промежуток значений

___

### `Private` state

• **state**: *[IState](../interfaces/_types_.istate.md)*

Defined in Model/Model.ts:32

Текущее состояние слайдера

___

### `Private` step

• **step**: *number*

Defined in Model/Model.ts:37

Текущий размер шага

___

### `Private` values

• **values**: *[TValues](../modules/_types_.md#tvalues)*

Defined in Model/Model.ts:42

Текущие значения

## Methods

###  getRangeValues

▸ **getRangeValues**(): *[IRangeValues](../interfaces/_types_.irangevalues.md)*

*Implementation of [IModel](../interfaces/_types_.imodel.md)*

Defined in Model/Model.ts:92

Возвращает текущий промежуток значений

**Returns:** *[IRangeValues](../interfaces/_types_.irangevalues.md)*

___

###  getState

▸ **getState**(): *[IState](../interfaces/_types_.istate.md)*

*Implementation of [IModel](../interfaces/_types_.imodel.md)*

Defined in Model/Model.ts:99

Возвращает текущее состояние

**Returns:** *[IState](../interfaces/_types_.istate.md)*

___

###  getStep

▸ **getStep**(): *number*

*Implementation of [IModel](../interfaces/_types_.imodel.md)*

Defined in Model/Model.ts:113

Возвращает размер шага

**Returns:** *number*

___

###  getValues

▸ **getValues**(): *[TValues](../modules/_types_.md#tvalues)*

*Implementation of [IModel](../interfaces/_types_.imodel.md)*

Defined in Model/Model.ts:85

Возвращает текущие значения

**Returns:** *[TValues](../modules/_types_.md#tvalues)*

___

###  setOrientationState

▸ **setOrientationState**(`orientation`: IState["orientation"]): *void*

*Implementation of [IModel](../interfaces/_types_.imodel.md)*

Defined in Model/Model.ts:121

Устанавливет this.state.orientation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`orientation` | IState["orientation"] | Вертикальная или горизональная ориентация  |

**Returns:** *void*

___

###  setRangeState

▸ **setRangeState**(`rangeState`: IState["isRange"]): *void*

*Implementation of [IModel](../interfaces/_types_.imodel.md)*

Defined in Model/Model.ts:129

Устанавливет this.state.isRange

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`rangeState` | IState["isRange"] | Если true, то промежуток значений, если false то одиночное значение  |

**Returns:** *void*

___

###  setShowValueState

▸ **setShowValueState**(`showValue`: IState["isShowValue"]): *void*

*Implementation of [IModel](../interfaces/_types_.imodel.md)*

Defined in Model/Model.ts:137

Устанавливет this.state.isShowValue

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`showValue` | IState["isShowValue"] | Если true, то показывать значения, если false то нет  |

**Returns:** *void*

___

###  setStep

▸ **setStep**(`step`: number): *void*

*Implementation of [IModel](../interfaces/_types_.imodel.md)*

Defined in Model/Model.ts:106

Устанавливет размер шага

**Parameters:**

Name | Type |
------ | ------ |
`step` | number |

**Returns:** *void*

___

###  setValues

▸ **setValues**(`values`: [TValues](../modules/_types_.md#tvalues)): *void*

*Implementation of [IModel](../interfaces/_types_.imodel.md)*

Defined in Model/Model.ts:53

Устанавливает новые значения слайдера и их промежуток

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`values` | [TValues](../modules/_types_.md#tvalues) | Новые значения слайдера  |

**Returns:** *void*

[slider](../globals.md) › ["View/ValueInputView"](../modules/_view_valueinputview_.md) › [ValueInputView](_view_valueinputview_.valueinputview.md)

# Class: ValueInputView

Представление компонента поля со значением слайдера

## Hierarchy

* **ValueInputView**

## Implements

* [IValueInputView](../interfaces/_types_.ivalueinputview.md)

## Index

### Constructors

* [constructor](_view_valueinputview_.valueinputview.md#constructor)

### Properties

* [$node](_view_valueinputview_.valueinputview.md#private-node)
* [$valueInput](_view_valueinputview_.valueinputview.md#private-valueinput)
* [modifier](_view_valueinputview_.valueinputview.md#private-modifier)

### Methods

* [addChangeHandler](_view_valueinputview_.valueinputview.md#addchangehandler)
* [appendToNode](_view_valueinputview_.valueinputview.md#appendtonode)
* [getModifier](_view_valueinputview_.valueinputview.md#getmodifier)
* [getValue](_view_valueinputview_.valueinputview.md#getvalue)
* [removeFromDOM](_view_valueinputview_.valueinputview.md#removefromdom)
* [setValue](_view_valueinputview_.valueinputview.md#setvalue)

## Constructors

###  constructor

\+ **new ValueInputView**(`modifier`: [TModifier](../modules/_types_.md#tmodifier), `parentNode`: JQuery): *[ValueInputView](_view_valueinputview_.valueinputview.md)*

Defined in View/ValueInputView.ts:4

Записываеет свойства и вставляет разметку поля воода в родительский элемент

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modifier` | [TModifier](../modules/_types_.md#tmodifier) | Модификатор |
`parentNode` | JQuery | Родительский элемент  |

**Returns:** *[ValueInputView](_view_valueinputview_.valueinputview.md)*

## Properties

### `Private` $node

• **$node**: *JQuery*

Defined in View/ValueInputView.ts:20

Родительский элемент

___

### `Private` $valueInput

• **$valueInput**: *JQuery*

Defined in View/ValueInputView.ts:25

Разметка поля ввода значения

___

### `Private` modifier

• **modifier**: *[TModifier](../modules/_types_.md#tmodifier)*

Defined in View/ValueInputView.ts:30

Модификатор

## Methods

###  addChangeHandler

▸ **addChangeHandler**(`emitCallback`: Function, `emitCallbackType`: string): *void*

*Implementation of [IValueInputView](../interfaces/_types_.ivalueinputview.md)*

Defined in View/ValueInputView.ts:76

Добавляет обработчик события change на поле ввода

**Parameters:**

Name | Type |
------ | ------ |
`emitCallback` | Function |
`emitCallbackType` | string |

**Returns:** *void*

___

###  appendToNode

▸ **appendToNode**(): *void*

*Implementation of [IValueInputView](../interfaces/_types_.ivalueinputview.md)*

Defined in View/ValueInputView.ts:35

Вставляет разметку в родительский элемент

**Returns:** *void*

___

###  getModifier

▸ **getModifier**(): *"from" | "to"*

*Implementation of [IValueInputView](../interfaces/_types_.ivalueinputview.md)*

Defined in View/ValueInputView.ts:69

Возвращает модификатор класса

**Returns:** *"from" | "to"*

___

###  getValue

▸ **getValue**(): *string*

*Implementation of [IValueInputView](../interfaces/_types_.ivalueinputview.md)*

Defined in View/ValueInputView.ts:57

Возвращает значение поля ввода

**Returns:** *string*

___

###  removeFromDOM

▸ **removeFromDOM**(): *void*

*Implementation of [IValueInputView](../interfaces/_types_.ivalueinputview.md)*

Defined in View/ValueInputView.ts:42

Убирает разметку поля ввода из родительского элемента

**Returns:** *void*

___

###  setValue

▸ **setValue**(`value`: number | string): *void*

*Implementation of [IValueInputView](../interfaces/_types_.ivalueinputview.md)*

Defined in View/ValueInputView.ts:50

Устанавливает значение поля ввода

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | number &#124; string | Значаение  |

**Returns:** *void*

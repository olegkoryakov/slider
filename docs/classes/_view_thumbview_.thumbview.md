[slider](../globals.md) › ["View/ThumbView"](../modules/_view_thumbview_.md) › [ThumbView](_view_thumbview_.thumbview.md)

# Class: ThumbView

Представление компонента бегунка слайдера

## Hierarchy

* **ThumbView**

## Implements

* [IThumbView](../interfaces/_types_.ithumbview.md)

## Index

### Constructors

* [constructor](_view_thumbview_.thumbview.md#constructor)

### Properties

* [$node](_view_thumbview_.thumbview.md#private-node)
* [$thumb](_view_thumbview_.thumbview.md#private-thumb)
* [modifier](_view_thumbview_.thumbview.md#private-modifier)

### Methods

* [addDragNDropHandler](_view_thumbview_.thumbview.md#adddragndrophandler)
* [appendToNode](_view_thumbview_.thumbview.md#appendtonode)
* [getCoord](_view_thumbview_.thumbview.md#getcoord)
* [getModifier](_view_thumbview_.thumbview.md#getmodifier)
* [getWidth](_view_thumbview_.thumbview.md#getwidth)
* [hideValue](_view_thumbview_.thumbview.md#hidevalue)
* [isInDOM](_view_thumbview_.thumbview.md#isindom)
* [isValueShowing](_view_thumbview_.thumbview.md#isvalueshowing)
* [removeFromDOM](_view_thumbview_.thumbview.md#removefromdom)
* [setPosition](_view_thumbview_.thumbview.md#setposition)
* [setValue](_view_thumbview_.thumbview.md#setvalue)
* [showValue](_view_thumbview_.thumbview.md#showvalue)

## Constructors

###  constructor

\+ **new ThumbView**(`modifier`: [TModifier](../modules/_types_.md#tmodifier), `parentNode`: JQuery): *[ThumbView](_view_thumbview_.thumbview.md)*

Defined in View/ThumbView.ts:4

Записывает свойства и вставляет разметку бегунка в родительский элемент

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modifier` | [TModifier](../modules/_types_.md#tmodifier) | Модификатор |
`parentNode` | JQuery | Родительский элемент  |

**Returns:** *[ThumbView](_view_thumbview_.thumbview.md)*

## Properties

### `Private` $node

• **$node**: *JQuery*

Defined in View/ThumbView.ts:20

Родительский элемент

___

### `Private` $thumb

• **$thumb**: *JQuery*

Defined in View/ThumbView.ts:25

Разметка бегунка

___

### `Private` modifier

• **modifier**: *[TModifier](../modules/_types_.md#tmodifier)*

Defined in View/ThumbView.ts:30

Модификатор

## Methods

###  addDragNDropHandler

▸ **addDragNDropHandler**(`getOptionsCallback`: Function, `emitCallback`: Function, `emitCallbackType`: string, `getWidthCallback`: Function): *void*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:121

Добавляет возможность перетаскивать бегунок мышкой

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`getOptionsCallback` | Function | Функция, которая вернет объект с текущими опциями |
`emitCallback` | Function | Функция эмитации события |
`emitCallbackType` | string | Имя эмитируемого события |
`getWidthCallback` | Function | Функция, которая вернет длину слайдера  |

**Returns:** *void*

___

###  appendToNode

▸ **appendToNode**(): *void*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:35

Вставляет разметку в родительский элемент

**Returns:** *void*

___

###  getCoord

▸ **getCoord**(`position`: ISliderOptions["position"]): *number*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:71

Возвращает координаты бегунка

**Parameters:**

Name | Type |
------ | ------ |
`position` | ISliderOptions["position"] |

**Returns:** *number*

___

###  getModifier

▸ **getModifier**(): *"from" | "to"*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:78

Возвращает модификатор бегунка

**Returns:** *"from" | "to"*

___

###  getWidth

▸ **getWidth**(): *number*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:109

Вернет длину бегунка

**Returns:** *number*

___

###  hideValue

▸ **hideValue**(): *void*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:85

Скрывает значение бегунка

**Returns:** *void*

___

###  isInDOM

▸ **isInDOM**(): *boolean*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:42

Возвращает true, если бегунок в родительском элементе, false, если нет

**Returns:** *boolean*

___

###  isValueShowing

▸ **isValueShowing**(): *boolean*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:101

Вернет true, если значение показано, false, если нет

**Returns:** *boolean*

___

###  removeFromDOM

▸ **removeFromDOM**(): *void*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:50

Убирает бегунок из родительского элемента

**Returns:** *void*

___

###  setPosition

▸ **setPosition**(`position`: ISliderOptions["position"], `coord`: number): *void*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:64

Устанавливает позицию и координаты бегунка

**Parameters:**

Name | Type |
------ | ------ |
`position` | ISliderOptions["position"] |
`coord` | number |

**Returns:** *void*

___

###  setValue

▸ **setValue**(`value`: string | number): *void*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:57

Устанавливает значение бегунка

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; number |

**Returns:** *void*

___

###  showValue

▸ **showValue**(): *void*

*Implementation of [IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/ThumbView.ts:93

Показывает значение бегунка

**Returns:** *void*

[slider](../globals.md) › ["View/RangeLineView"](../modules/_view_rangelineview_.md) › [RangeLineView](_view_rangelineview_.rangelineview.md)

# Class: RangeLineView

Представление компонента линии между бегунками

## Hierarchy

* **RangeLineView**

## Implements

* [IRangeLineView](../interfaces/_types_.irangelineview.md)

## Index

### Constructors

* [constructor](_view_rangelineview_.rangelineview.md#constructor)

### Properties

* [$node](_view_rangelineview_.rangelineview.md#private-node)
* [$rangeLine](_view_rangelineview_.rangelineview.md#private-rangeline)

### Methods

* [appendToNode](_view_rangelineview_.rangelineview.md#appendtonode)
* [isInDOM](_view_rangelineview_.rangelineview.md#isindom)
* [removeFromDOM](_view_rangelineview_.rangelineview.md#removefromdom)
* [setOrientation](_view_rangelineview_.rangelineview.md#setorientation)
* [setRangeLineSizeFromCoords](_view_rangelineview_.rangelineview.md#setrangelinesizefromcoords)

## Constructors

###  constructor

\+ **new RangeLineView**(`parentNode`: JQuery): *[RangeLineView](_view_rangelineview_.rangelineview.md)*

Defined in View/RangeLineView.ts:4

Записывает свойства и вставляет в родительский элемент

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`parentNode` | JQuery | Родительский элемент  |

**Returns:** *[RangeLineView](_view_rangelineview_.rangelineview.md)*

## Properties

### `Private` $node

• **$node**: *JQuery*

Defined in View/RangeLineView.ts:23

Родительский элемент

___

### `Private` $rangeLine

• **$rangeLine**: *JQuery*

Defined in View/RangeLineView.ts:18

Разметка промежуточной линии

## Methods

###  appendToNode

▸ **appendToNode**(): *void*

*Implementation of [IRangeLineView](../interfaces/_types_.irangelineview.md)*

Defined in View/RangeLineView.ts:28

Вставляет в родительский элемент линию

**Returns:** *void*

___

###  isInDOM

▸ **isInDOM**(): *boolean*

*Implementation of [IRangeLineView](../interfaces/_types_.irangelineview.md)*

Defined in View/RangeLineView.ts:42

Проверяет, есть ли в DOM линия

**Returns:** *boolean*

___

###  removeFromDOM

▸ **removeFromDOM**(): *void*

*Implementation of [IRangeLineView](../interfaces/_types_.irangelineview.md)*

Defined in View/RangeLineView.ts:35

Убирает из родительского элемента линию

**Returns:** *void*

___

###  setOrientation

▸ **setOrientation**(`oldPos`: ISliderOptions["position"], `newPos`: ISliderOptions["position"]): *void*

*Implementation of [IRangeLineView](../interfaces/_types_.irangelineview.md)*

Defined in View/RangeLineView.ts:52

Переварачивает линию из позиции top в left и наоборот

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`oldPos` | ISliderOptions["position"] | Имя позиции, на которой линия была раньше |
`newPos` | ISliderOptions["position"] | Имя позиции, на которой линия сейчас  |

**Returns:** *void*

___

###  setRangeLineSizeFromCoords

▸ **setRangeLineSizeFromCoords**(`coordFrom`: number, `coordTo`: number, `gap`: number, `position`: ISliderOptions["position"]): *void*

*Implementation of [IRangeLineView](../interfaces/_types_.irangelineview.md)*

Defined in View/RangeLineView.ts:70

Задает размеры и начальную точку линии

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`coordFrom` | number | Координата первого бегунка |
`coordTo` | number | Координата второго бегунка |
`gap` | number | Ширина половины бегунка |
`position` | ISliderOptions["position"] | Имя позиции  |

**Returns:** *void*

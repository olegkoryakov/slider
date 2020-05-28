[slider](../globals.md) › ["Presenter/Converter"](../modules/_presenter_converter_.md) › [Converter](_presenter_converter_.converter.md)

# Class: Converter

Конвертирует значения в координаты и коррдинаты в значения

## Hierarchy

* **Converter**

## Implements

* [IConverter](../interfaces/_types_.iconverter.md)

## Index

### Methods

* [calcValueWithStep](_presenter_converter_.converter.md#calcvaluewithstep)
* [coordInValue](_presenter_converter_.converter.md#coordinvalue)
* [valueInCoord](_presenter_converter_.converter.md#valueincoord)

## Methods

###  calcValueWithStep

▸ **calcValueWithStep**(`value`: number, `step`: number): *number*

*Implementation of [IConverter](../interfaces/_types_.iconverter.md)*

Defined in Presenter/Converter.ts:50

Считает значение с учетом шага и возвращает его

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | number | Текущее значение |
`step` | number | Размер шага  |

**Returns:** *number*

___

###  coordInValue

▸ **coordInValue**(`coord`: number, `step`: number, `width`: number, `range`: [IRangeValues](../interfaces/_types_.irangevalues.md)): *number*

*Implementation of [IConverter](../interfaces/_types_.iconverter.md)*

Defined in Presenter/Converter.ts:12

Конвертирует координаты в значение с учетом шага и возвращает его

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`coord` | number | Координаты ползунка |
`step` | number | Размер шага |
`width` | number | Длинна |
`range` | [IRangeValues](../interfaces/_types_.irangevalues.md) | Промежуток значений  |

**Returns:** *number*

___

###  valueInCoord

▸ **valueInCoord**(`valueOrIndex`: number, `width`: number, `range`: [IRangeValues](../interfaces/_types_.irangevalues.md)): *number*

*Implementation of [IConverter](../interfaces/_types_.iconverter.md)*

Defined in Presenter/Converter.ts:33

Конвертирует значение в координаты и возвращает его

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`valueOrIndex` | number | Текущее значение или индекс текущего значения |
`width` | number | Длина |
`range` | [IRangeValues](../interfaces/_types_.irangevalues.md) | Промежуток значений  |

**Returns:** *number*

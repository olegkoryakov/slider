[slider](../globals.md) › ["View/SliderView"](../modules/_view_sliderview_.md) › [SliderView](_view_sliderview_.sliderview.md)

# Class: SliderView

Представление слайдера

## Hierarchy

* [EventEmitter](_eventemitter_eventemitter_.eventemitter.md)

  ↳ **SliderView**

## Implements

* [IEventEmitter](../interfaces/_types_.ieventemitter.md)
* [ISliderView](../interfaces/_types_.isliderview.md)

## Index

### Constructors

* [constructor](_view_sliderview_.sliderview.md#constructor)

### Properties

* [$node](_view_sliderview_.sliderview.md#private-node)
* [$slider](_view_sliderview_.sliderview.md#private-slider)
* [$sliderLine](_view_sliderview_.sliderview.md#private-sliderline)
* [inputValueFrom](_view_sliderview_.sliderview.md#private-inputvaluefrom)
* [inputValueTo](_view_sliderview_.sliderview.md#private-inputvalueto)
* [rangeLine](_view_sliderview_.sliderview.md#private-rangeline)
* [thumbFrom](_view_sliderview_.sliderview.md#private-thumbfrom)
* [thumbTo](_view_sliderview_.sliderview.md#private-thumbto)

### Methods

* [addWindowHandler](_view_sliderview_.sliderview.md#addwindowhandler)
* [calcValues](_view_sliderview_.sliderview.md#calcvalues)
* [emit](_view_sliderview_.sliderview.md#emit)
* [getInputByModifier](_view_sliderview_.sliderview.md#getinputbymodifier)
* [getOptions](_view_sliderview_.sliderview.md#getoptions)
* [getThumbByModifier](_view_sliderview_.sliderview.md#getthumbbymodifier)
* [getWidth](_view_sliderview_.sliderview.md#getwidth)
* [isRange](_view_sliderview_.sliderview.md#isrange)
* [on](_view_sliderview_.sliderview.md#on)
* [onSliderLineClick](_view_sliderview_.sliderview.md#private-onsliderlineclick)
* [render](_view_sliderview_.sliderview.md#render)
* [resizeRangeLine](_view_sliderview_.sliderview.md#resizerangeline)
* [setOrientation](_view_sliderview_.sliderview.md#setorientation)
* [setRange](_view_sliderview_.sliderview.md#setrange)
* [setShowValue](_view_sliderview_.sliderview.md#setshowvalue)

## Constructors

###  constructor

\+ **new SliderView**(`node`: JQuery): *[SliderView](_view_sliderview_.sliderview.md)*

*Overrides [EventEmitter](_eventemitter_eventemitter_.eventemitter.md).[constructor](_eventemitter_eventemitter_.eventemitter.md#constructor)*

Defined in View/SliderView.ts:9

Записывает свойства
Создает инстансы компонентов представления слайдера

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`node` | JQuery | Родительский элемент  |

**Returns:** *[SliderView](_view_sliderview_.sliderview.md)*

## Properties

### `Private` $node

• **$node**: *JQuery*

Defined in View/SliderView.ts:30

Родительский элемент

___

### `Private` $slider

• **$slider**: *JQuery*

Defined in View/SliderView.ts:35

Разметка слайдера

___

### `Private` $sliderLine

• **$sliderLine**: *JQuery*

Defined in View/SliderView.ts:40

Линия слайдера, в которой содержаться бегунки

___

### `Private` inputValueFrom

• **inputValueFrom**: *[IValueInputView](../interfaces/_types_.ivalueinputview.md)*

Defined in View/SliderView.ts:45

Инстанс инпута с модификатором "from"

___

### `Private` inputValueTo

• **inputValueTo**: *[IValueInputView](../interfaces/_types_.ivalueinputview.md)*

Defined in View/SliderView.ts:50

Инстанс инпута с модификатором "to"

___

### `Private` rangeLine

• **rangeLine**: *[IRangeLineView](../interfaces/_types_.irangelineview.md)*

Defined in View/SliderView.ts:55

Инстанс промежуточной линии

___

### `Private` thumbFrom

• **thumbFrom**: *[IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/SliderView.ts:60

Инстанс бегунка с модификатором "from"

___

### `Private` thumbTo

• **thumbTo**: *[IThumbView](../interfaces/_types_.ithumbview.md)*

Defined in View/SliderView.ts:65

Инстанс бегунка с модификатором "to"

## Methods

###  addWindowHandler

▸ **addWindowHandler**(): *void*

Defined in View/SliderView.ts:142

Функция вешает обработчик события resize на window

**Returns:** *void*

___

###  calcValues

▸ **calcValues**(): *void*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:132

Расчет текущих значений бегунков слайдера

**Returns:** *void*

___

###  emit

▸ **emit**(`eventName`: string, `arg`: any): *void*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

*Inherited from [EventEmitter](_eventemitter_eventemitter_.eventemitter.md).[emit](_eventemitter_eventemitter_.eventemitter.md#emit)*

Defined in EventEmitter/EventEmitter.ts:34

Вызывает колбэки по ключу eventName с аргументом arg

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eventName` | string | Ключ объекта events |
`arg` | any | Аргумент, с которым будут вызваны все коллбеки из events[eventName]  |

**Returns:** *void*

___

###  getInputByModifier

▸ **getInputByModifier**(`modifier`: [TModifier](../modules/_types_.md#tmodifier)): *[IValueInputView](../interfaces/_types_.ivalueinputview.md)*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:175

Возвращает инстанс инпута по модификатору

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modifier` | [TModifier](../modules/_types_.md#tmodifier) | модификатор  |

**Returns:** *[IValueInputView](../interfaces/_types_.ivalueinputview.md)*

___

###  getOptions

▸ **getOptions**(): *object*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:287

Возвращает объект, с текущими опциями: имя позиции и ось

**Returns:** *object*

* **clientAxis**: *"clientX" | "clientY"*

* **position**: *"left" | "top"*

___

###  getThumbByModifier

▸ **getThumbByModifier**(`modifier`: [TModifier](../modules/_types_.md#tmodifier)): *[IThumbView](../interfaces/_types_.ithumbview.md)*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:165

Возвращает инстанс бегунка по модификатору

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modifier` | [TModifier](../modules/_types_.md#tmodifier) | модификатор  |

**Returns:** *[IThumbView](../interfaces/_types_.ithumbview.md)*

___

###  getWidth

▸ **getWidth**(): *number*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:309

Возвращает текущую длину слайдера с учетом ориентации

**Returns:** *number*

___

###  isRange

▸ **isRange**(): *boolean*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:237

Возвращает true, если состояние слайдера промежуточное, false, если одиночное

**Returns:** *boolean*

___

###  on

▸ **on**(`eventName`: string, `callback`: Function): *void*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

*Inherited from [EventEmitter](_eventemitter_eventemitter_.eventemitter.md).[on](_eventemitter_eventemitter_.eventemitter.md#on)*

Defined in EventEmitter/EventEmitter.ts:24

Записывает в объект this.events ключ eventName и пушит в массив callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eventName` | string | Имя события, которое будет записано, как ключ в объекте this.events |
`callback` | Function | Функция обратного вызова, которая будет запушена в this.events[eventName]  |

**Returns:** *void*

___

### `Private` onSliderLineClick

▸ **onSliderLineClick**(`clickE`: ClickEvent): *void*

Defined in View/SliderView.ts:71

Функция обработчика клика на линию слайдера

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`clickE` | ClickEvent | click event  |

**Returns:** *void*

___

###  render

▸ **render**(`state`: [IState](../interfaces/_types_.istate.md)): *void*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:101

Отрисовка слайдера

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`state` | [IState](../interfaces/_types_.istate.md) | текущее состояние модели  |

**Returns:** *void*

___

###  resizeRangeLine

▸ **resizeRangeLine**(): *void*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:263

Изменяет размер промежуточной линии слайдера, если this.isRange() === true

**Returns:** *void*

___

###  setOrientation

▸ **setOrientation**(`orientationState`: IState["orientation"]): *void*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:185

Устанавливает ориентацию слайдера

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`orientationState` | IState["orientation"] | ориентация  |

**Returns:** *void*

___

###  setRange

▸ **setRange**(`rangeState`: IState["isRange"]): *void*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:217

Устанавливет промежуточное/одиночное значение слайдера

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`rangeState` | IState["isRange"] | промежуточное, если true, одиночное, если false  |

**Returns:** *void*

___

###  setShowValue

▸ **setShowValue**(`showValueState`: IState["isShowValue"]): *void*

*Implementation of [ISliderView](../interfaces/_types_.isliderview.md)*

Defined in View/SliderView.ts:245

Устанавливает показ/скрытие значений бегунков

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`showValueState` | IState["isShowValue"] | true, если показать, false, если скрыть  |

**Returns:** *void*

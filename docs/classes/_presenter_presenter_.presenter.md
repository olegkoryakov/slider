[slider](../globals.md) › ["Presenter/Presenter"](../modules/_presenter_presenter_.md) › [Presenter](_presenter_presenter_.presenter.md)

# Class: Presenter

Настраивает общение между View и Model

## Hierarchy

* [EventEmitter](_eventemitter_eventemitter_.eventemitter.md)

  ↳ **Presenter**

## Implements

* [IEventEmitter](../interfaces/_types_.ieventemitter.md)
* [IPresenter](../interfaces/_types_.ipresenter.md)

## Index

### Constructors

* [constructor](_presenter_presenter_.presenter.md#constructor)

### Properties

* [configPanel](_presenter_presenter_.presenter.md#private-configpanel)
* [converter](_presenter_presenter_.presenter.md#private-converter)
* [model](_presenter_presenter_.presenter.md#private-model)
* [sliderView](_presenter_presenter_.presenter.md#private-sliderview)

### Methods

* [changeInputValue](_presenter_presenter_.presenter.md#private-changeinputvalue)
* [changeOrientation](_presenter_presenter_.presenter.md#changeorientation)
* [changeRangeState](_presenter_presenter_.presenter.md#changerangestate)
* [changeShowValues](_presenter_presenter_.presenter.md#changeshowvalues)
* [changeStep](_presenter_presenter_.presenter.md#changestep)
* [changeValue](_presenter_presenter_.presenter.md#private-changevalue)
* [changeValues](_presenter_presenter_.presenter.md#changevalues)
* [emit](_presenter_presenter_.presenter.md#emit)
* [on](_presenter_presenter_.presenter.md#on)
* [renderApp](_presenter_presenter_.presenter.md#renderapp)
* [renderRange](_presenter_presenter_.presenter.md#private-renderrange)

## Constructors

###  constructor

\+ **new Presenter**(`configPanel`: [IConfigPanelView](../interfaces/_types_.iconfigpanelview.md), `sliderView`: [ISliderView](../interfaces/_types_.isliderview.md), `model`: [IModel](../interfaces/_types_.imodel.md)): *[Presenter](_presenter_presenter_.presenter.md)*

*Overrides [EventEmitter](_eventemitter_eventemitter_.eventemitter.md).[constructor](_eventemitter_eventemitter_.eventemitter.md#constructor)*

Defined in Presenter/Presenter.ts:7

Записывает свойства класса и подписывает представления на события

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`configPanel` | [IConfigPanelView](../interfaces/_types_.iconfigpanelview.md) | Представление конфигурационной панели слайдера |
`sliderView` | [ISliderView](../interfaces/_types_.isliderview.md) | Представление слайдера |
`model` | [IModel](../interfaces/_types_.imodel.md) | Модель слайдера  |

**Returns:** *[Presenter](_presenter_presenter_.presenter.md)*

## Properties

### `Private` configPanel

• **configPanel**: *[IConfigPanelView](../interfaces/_types_.iconfigpanelview.md)*

Defined in Presenter/Presenter.ts:35

Представление конфигурационной панели

___

### `Private` converter

• **converter**: *[IConverter](../interfaces/_types_.iconverter.md)*

Defined in Presenter/Presenter.ts:40

Конвертер значений и координат

___

### `Private` model

• **model**: *[IModel](../interfaces/_types_.imodel.md)*

Defined in Presenter/Presenter.ts:50

Модель данных слайдера

___

### `Private` sliderView

• **sliderView**: *[ISliderView](../interfaces/_types_.isliderview.md)*

Defined in Presenter/Presenter.ts:45

Представление слайдера

## Methods

### `Private` changeInputValue

▸ **changeInputValue**(`valueInputView`: [IValueInputView](../interfaces/_types_.ivalueinputview.md)): *void*

Defined in Presenter/Presenter.ts:104

Изменяет значение инпута и соответствующего бегунка

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`valueInputView` | [IValueInputView](../interfaces/_types_.ivalueinputview.md) | Инстанс представления инпута значений  |

**Returns:** *void*

___

###  changeOrientation

▸ **changeOrientation**(): *void*

*Implementation of [IPresenter](../interfaces/_types_.ipresenter.md)*

Defined in Presenter/Presenter.ts:151

Изменяет ориентацию в представления слайдера и в данных модели

**Returns:** *void*

___

###  changeRangeState

▸ **changeRangeState**(): *void*

*Implementation of [IPresenter](../interfaces/_types_.ipresenter.md)*

Defined in Presenter/Presenter.ts:173

Изменяет состояние слайдера (промежуточное или одиночное)

**Returns:** *void*

___

###  changeShowValues

▸ **changeShowValues**(): *void*

*Implementation of [IPresenter](../interfaces/_types_.ipresenter.md)*

Defined in Presenter/Presenter.ts:162

Изменяет отображение текущего значения над бегунками

**Returns:** *void*

___

###  changeStep

▸ **changeStep**(`inputValue`: string): *void*

*Implementation of [IPresenter](../interfaces/_types_.ipresenter.md)*

Defined in Presenter/Presenter.ts:208

Изменяет размер шага

**Parameters:**

Name | Type |
------ | ------ |
`inputValue` | string |

**Returns:** *void*

___

### `Private` changeValue

▸ **changeValue**(`thumbView`: [IThumbView](../interfaces/_types_.ithumbview.md)): *void*

Defined in Presenter/Presenter.ts:76

Изменяет значение ползунка и соответствующего инпута

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`thumbView` | [IThumbView](../interfaces/_types_.ithumbview.md) | Инстанс представления ползунка  |

**Returns:** *void*

___

###  changeValues

▸ **changeValues**(`values`: string[]): *void*

*Implementation of [IPresenter](../interfaces/_types_.ipresenter.md)*

Defined in Presenter/Presenter.ts:184

Изменяет текущие значения сдайдера

**Parameters:**

Name | Type |
------ | ------ |
`values` | string[] |

**Returns:** *void*

___

###  emit

▸ **emit**(`eventName`: string, `arg`: any): *void*

*Implementation of [IPresenter](../interfaces/_types_.ipresenter.md)*

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

###  on

▸ **on**(`eventName`: string, `callback`: Function): *void*

*Implementation of [IPresenter](../interfaces/_types_.ipresenter.md)*

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

###  renderApp

▸ **renderApp**(): *void*

*Implementation of [IPresenter](../interfaces/_types_.ipresenter.md)*

Defined in Presenter/Presenter.ts:142

Отрисовывает слайдер на основе данных из модели

**Returns:** *void*

___

### `Private` renderRange

▸ **renderRange**(`rangeInstances`: [IRangeInstances](../interfaces/_types_.irangeinstances.md)): *void*

Defined in Presenter/Presenter.ts:57

Отрисовывает элементы для промежуточного значения

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`rangeInstances` | [IRangeInstances](../interfaces/_types_.irangeinstances.md) | Объект, содержащий представления поля ввода и ползунка, которые используются для отображения слайдера с промежуточным значением  |

**Returns:** *void*

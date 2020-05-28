[slider](../globals.md) › ["View/ConfigPanelView"](../modules/_view_configpanelview_.md) › [ConfigPanelView](_view_configpanelview_.configpanelview.md)

# Class: ConfigPanelView

Представление конфигурационной панели слайдера

## Hierarchy

* [EventEmitter](_eventemitter_eventemitter_.eventemitter.md)

  ↳ **ConfigPanelView**

## Implements

* [IEventEmitter](../interfaces/_types_.ieventemitter.md)
* [IConfigPanelView](../interfaces/_types_.iconfigpanelview.md)

## Index

### Constructors

* [constructor](_view_configpanelview_.configpanelview.md#constructor)

### Properties

* [$configPanel](_view_configpanelview_.configpanelview.md#private-configpanel)

### Methods

* [addConfigPanelHandlers](_view_configpanelview_.configpanelview.md#addconfigpanelhandlers)
* [emit](_view_configpanelview_.configpanelview.md#emit)
* [on](_view_configpanelview_.configpanelview.md#on)

## Constructors

###  constructor

\+ **new ConfigPanelView**(`node`: JQuery): *[ConfigPanelView](_view_configpanelview_.configpanelview.md)*

*Overrides [EventEmitter](_eventemitter_eventemitter_.eventemitter.md).[constructor](_eventemitter_eventemitter_.eventemitter.md#constructor)*

Defined in View/ConfigPanelView.ts:5

Записывает разметку в $configPanel
Добавляет обработчики событий к кнопкам и инпутам
Отрисовывает в родительском элементе

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`node` | JQuery | Родительский элемент  |

**Returns:** *[ConfigPanelView](_view_configpanelview_.configpanelview.md)*

## Properties

### `Private` $configPanel

• **$configPanel**: *JQuery*

Defined in View/ConfigPanelView.ts:27

Свойство, хранящее разметку панели

## Methods

###  addConfigPanelHandlers

▸ **addConfigPanelHandlers**(): *void*

*Implementation of [IConfigPanelView](../interfaces/_types_.iconfigpanelview.md)*

Defined in View/ConfigPanelView.ts:32

Добавляет обработчики событий на кнопки и инпуты

**Returns:** *void*

___

###  emit

▸ **emit**(`eventName`: string, `arg`: any): *void*

*Implementation of [IConfigPanelView](../interfaces/_types_.iconfigpanelview.md)*

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

*Implementation of [IConfigPanelView](../interfaces/_types_.iconfigpanelview.md)*

*Inherited from [EventEmitter](_eventemitter_eventemitter_.eventemitter.md).[on](_eventemitter_eventemitter_.eventemitter.md#on)*

Defined in EventEmitter/EventEmitter.ts:24

Записывает в объект this.events ключ eventName и пушит в массив callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eventName` | string | Имя события, которое будет записано, как ключ в объекте this.events |
`callback` | Function | Функция обратного вызова, которая будет запушена в this.events[eventName]  |

**Returns:** *void*

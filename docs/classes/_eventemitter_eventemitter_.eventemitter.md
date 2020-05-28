[slider](../globals.md) › ["EventEmitter/EventEmitter"](../modules/_eventemitter_eventemitter_.md) › [EventEmitter](_eventemitter_eventemitter_.eventemitter.md)

# Class: EventEmitter

Подписывается на события и эмитирует их

## Hierarchy

* **EventEmitter**

  ↳ [Presenter](_presenter_presenter_.presenter.md)

  ↳ [ConfigPanelView](_view_configpanelview_.configpanelview.md)

  ↳ [SliderView](_view_sliderview_.sliderview.md)

## Implements

* [IEventEmitter](../interfaces/_types_.ieventemitter.md)

## Index

### Constructors

* [constructor](_eventemitter_eventemitter_.eventemitter.md#constructor)

### Properties

* [events](_eventemitter_eventemitter_.eventemitter.md#private-events)

### Methods

* [emit](_eventemitter_eventemitter_.eventemitter.md#emit)
* [on](_eventemitter_eventemitter_.eventemitter.md#on)

## Constructors

###  constructor

\+ **new EventEmitter**(): *[EventEmitter](_eventemitter_eventemitter_.eventemitter.md)*

Defined in EventEmitter/EventEmitter.ts:4

Создает пустой объект events

**Returns:** *[EventEmitter](_eventemitter_eventemitter_.eventemitter.md)*

## Properties

### `Private` events

• **events**: *[IEvents](../interfaces/_types_.ievents.md)*

Defined in EventEmitter/EventEmitter.ts:17

Объект, который хранит в себе:
ключ - имя события,
значение - массив функций обратного вызова

## Methods

###  emit

▸ **emit**(`eventName`: string, `arg`: any): *void*

*Implementation of [IEventEmitter](../interfaces/_types_.ieventemitter.md)*

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

*Implementation of [IEventEmitter](../interfaces/_types_.ieventemitter.md)*

Defined in EventEmitter/EventEmitter.ts:24

Записывает в объект this.events ключ eventName и пушит в массив callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eventName` | string | Имя события, которое будет записано, как ключ в объекте this.events |
`callback` | Function | Функция обратного вызова, которая будет запушена в this.events[eventName]  |

**Returns:** *void*

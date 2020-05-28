# Slider plugin
## Навигация

* [Описание](#Описание)
* [Установка](#Установка)
* [Подключение к странице и настройка](#Подключение-к-странице-и-настройка)
    * [Изменение настроек на лету](#Изменение-настроек-на-лету)
* [Используемые технологии](#Используемые-технологии)
* [Архитектурная документация](#Архитектурная-документация)
    * [UML диаграмма классов](#UML-диаграмма-классов)
* [Техническая документация](#Техническая-документация)
* [Demo страница](#Demo-страница)
## Описание

Slider - простой и функциональный слайдер, который имеет такие возможности как:

* Принимать, как массив строк, так и численные значения в формате "от: N, до: M"
* Использование одного или двух ползунков для выбора промежуточного значения
* Работа как в горизонтальной, так и в вертикальной ориентации
* Выбор шага значений (работает как в численных значениях, так и в строковых)
* Скрытие и показ значений над бегунком/бегунками
* Изменение всего вышеперечисленного динамически
* При клике на линию слайдера к ней подтянется ближайший бегунок
* При ресайзе страницы слайдер не сломается

## Установка

* <code>npm run prod</code> для сборки проекта
* <code>npm run dev</code> для запуска локального дев сервера
* <code>npm run test</code> для запуска тестов и проверки покрытия приложения

## Подключение к странице и настройка

```javascript
$(yourJQueryElement).slider(options);
```
Где `options` является объектом с такими свойствами, как:

```javascript
options = {
  orientation: horizontal/vertical,
  isRange: true/false,
  isShowValue: true/false,
  step: number,
  values: {from: M, to: N}/string[],
};
```

### Изменение настроек на лету

```javascript
$(yourJQueryElement).sliderApp(methodName, argument);
```
`methodName` строка с именем метода

`argument` аргумент с которым будет вызван метод

* С этой связкой слайдер скроет/покажет значение над бегунками
  ```javascript
  methodName = 'changeShowValues';
  argument // в этом случае можно опустить
  ```

* С этой связкой слайдер скроет/покажет второй ползунок
  ```javascript
  methodName = 'changeRangeState';
  argument // в этом случае можно опустить
  ```

* Cлайдер изменит размер шага на 4
  ```javascript
  methodName = 'changeStep';
  argument = '4'; // размер шага принимается в виде строки!
  ```
  
* Слайдер изменит значения на `string[]`
  ```javascript
  methodName = 'changeValues';
  argument = string[];
  ```

## Используемые технологии

* [TypeScript](https://www.typescriptlang.org/ "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
Any browser. Any host. Any OS. Open source.")
* [Typedoc](https://typedoc.org/ "TypeDoc converts comments in TypeScript source code into rendered HTML documentation or a JSON model. It is extensible and supports a variety of configurations. Available as a CLI or Node module.")
* [jQuery](https://jquery.com/ "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.")
* [Jest](https://jestjs.io/ "Jest is a delightful JavaScript Testing Framework with a focus on simplicity.")
* [ESLint](https://eslint.org/ "Find and fix problems in your JavaScript code")
* [Webpack](https://webpack.js.org/, "Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging")

## Архитектурная документация

В плагине используется MVP Архитектура.

MVP состоит из трех основных частей, а именно: 
* Model - Данные, необходимые для отображения
* View - Представление данных из модели
* Presenter - Реализует взаимодействие между View и Model и содержит в себе бизнес-логику приложения

Архитектуру дополняет EventEmitter, который служит для оповещения Presenter из View.
Этот подход позволяет инкапсулировать Model и View друг от друга.

С помощью MVP и EventEmitter были достигнуты такие фишки, как:
* Разделение ответственности приложения(каждый модуль отвечает за отдельную задачу)
* Читаемость кода
* Полная инкапсуляция View от Model и Model от View
* Tестировать приложение становится гораздо проще

### UML диаграмма классов

  ![UML диаграмма классов](/diagram/slider.svg)

## Техническая документация

Техническая документация сгенерирована из комментариев в коде с помощью Typedoc.
С ней можно ознакомиться **[здесь](/docs/globals.md "Полная техническая документация slider plugin")**.

## Demo страница

Demo страница предназначена для предварительного просмотра приложения.

Для просмотра перейдите по ссылке => **[клик ми!](https://olegkoryakov.github.io/slider/dist/)**

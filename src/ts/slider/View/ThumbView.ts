/**
 * Представление компонента бегунка слайдера
 */
export default class ThumbView implements IThumbView {
  /**
   * Записывает свойства и вставляет разметку бегунка в родительский элемент
   * @param modifier Модификатор
   * @param parentNode Родительский элемент
   */
  constructor(modifier: TModifier, parentNode: JQuery) {
    this.modifier = modifier;
    this.$thumb = $(`<div class="slider__thumb slider__thumb--${this.modifier}"><div class="slider__value"></div></div>`);
    this.$node = parentNode;
    this.appendToNode();
  }

  /**
   * Родительский элемент
   */
  private $node: JQuery;

  /**
   * Разметка бегунка
   */
  private $thumb: JQuery;

  /**
   * Модификатор
   */
  private modifier: TModifier;

  /**
   * Вставляет разметку в родительский элемент
   */
  appendToNode() {
    this.$thumb.appendTo(this.$node);
  }

  /**
   * Возвращает true, если бегунок в родительском элементе, false, если нет
   */
  isInDOM() {
    const isInDOM = this.$node.find(this.$thumb).length > 0;
    return isInDOM;
  }

  /**
   * Убирает бегунок из родительского элемента
   */
  removeFromDOM() {
    this.$thumb.detach();
  }

  /**
   * Устанавливает значение бегунка
   */
  setValue(value: string | number) {
    this.$thumb.find('.slider__value').text(value);
  }

  /**
   * Устанавливает позицию и координаты бегунка
   */
  setPosition(position: ISliderOptions['position'], coord: number) {
    this.$thumb.css(position, coord);
  }

  /**
   * Возвращает координаты бегунка
   */
  getCoord(position: ISliderOptions['position']): number {
    return Math.round(this.$thumb.position()[position]);
  }

  /**
   * Возвращает модификатор бегунка
   */
  getModifier() {
    return this.modifier;
  }

  /**
   * Скрывает значение бегунка
   */
  hideValue() {
    const thumbValue = this.$thumb.find('.slider__value');
    thumbValue.hide(100, 'linear');
  }

  /**
   * Показывает значение бегунка
   */
  showValue() {
    const thumbValue = this.$thumb.find('.slider__value');
    thumbValue.show(100, 'linear');
  }

  /**
   * Вернет true, если значение показано, false, если нет
   */
  isValueShowing() {
    const thumbValue = this.$thumb.find('.slider__value');
    return thumbValue.css('display') !== 'none';
  }

  /**
   * Вернет длину бегунка
   */
  getWidth() {
    const width = this.$thumb.outerWidth() || 0;
    return width;
  }

  /**
   * Добавляет возможность перетаскивать бегунок мышкой
   * @param getOptionsCallback Функция, которая вернет объект с текущими опциями
   * @param emitCallback Функция эмитации события
   * @param emitCallbackType Имя эмитируемого события
   * @param getWidthCallback Функция, которая вернет длину слайдера
   */
  addDragNDropHandler(
    getOptionsCallback: Function,
    emitCallback: Function,
    emitCallbackType: string,
    getWidthCallback: Function,
  ) {
    const { $thumb } = this;
    const that = this;

    const onThumbMouseDown = function onThumbMouseDownHandler(downE: JQuery.MouseDownEvent) {
      const width: number = getWidthCallback();
      const zIndex = parseInt($thumb.css('z-index'), 10);
      const options: ISliderOptions = getOptionsCallback();
      let startCoord = downE[options.clientAxis];

      $thumb.css('z-index', zIndex + 1);
      $thumb.css('user-select', 'none');

      const onMouseMove = function onDocumentMouseMoveHandler(moveE: JQuery.MouseMoveEvent) {
        const shift = startCoord - moveE[options.clientAxis];
        let newCoord = Math.round($thumb.position()[options.position] - shift);
        startCoord = moveE[options.clientAxis];

        if (newCoord > width) newCoord = width;
        else if (newCoord < 0) newCoord = 0;
        emitCallback(emitCallbackType, that);
        that.setPosition(options.position, newCoord);
      };

      const bindedOnMouseMove = onMouseMove.bind(that);

      function onMouseUp() {
        $thumb.css('z-index', zIndex);
        $thumb.css('user-select', '');
        $(document).unbind('mousemove', bindedOnMouseMove);
        $(document).unbind('mouseup', onMouseUp);
      }

      $(document).mousemove(bindedOnMouseMove);
      $(document).mouseup(onMouseUp);
    };

    const bindedOnThumbMouseDown = onThumbMouseDown.bind(that);
    $thumb.mousedown(bindedOnThumbMouseDown);
  }
}

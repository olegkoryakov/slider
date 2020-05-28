/**
 * Представление компонента линии между бегунками
 */
export default class RangeLineView implements IRangeLineView {
  /**
   * Записывает свойства и вставляет в родительский элемент
   * @param parentNode Родительский элемент
   */
  constructor(parentNode: JQuery) {
    this.$rangeLine = $('<div class="slider__range-line"></div>');
    this.$node = parentNode;
    this.appendToNode();
  }

  /**
   * Разметка промежуточной линии
   */
  private $rangeLine: JQuery;

  /**
   * Родительский элемент
   */
  private $node: JQuery

  /**
   * Вставляет в родительский элемент линию
   */
  appendToNode() {
    this.$rangeLine.appendTo(this.$node);
  }

  /**
   * Убирает из родительского элемента линию
   */
  removeFromDOM() {
    this.$rangeLine.remove();
  }

  /**
   * Проверяет, есть ли в DOM линия
   */
  isInDOM() {
    const isInDOM = this.$node.find(this.$rangeLine).length > 0;
    return isInDOM;
  }

  /**
   * Переварачивает линию из позиции top в left и наоборот
   * @param oldPos Имя позиции, на которой линия была раньше
   * @param newPos Имя позиции, на которой линия сейчас
   */
  setOrientation(
    oldPos: ISliderOptions['position'],
    newPos: ISliderOptions['position'],
  ) {
    const coord = this.$rangeLine.css(oldPos) || 0;
    this.$rangeLine.css({
      [oldPos]: '50%',
      [newPos]: coord,
    });
  }

  /**
   * Задает размеры и начальную точку линии
   * @param coordFrom Координата первого бегунка
   * @param coordTo Координата второго бегунка
   * @param gap Ширина половины бегунка
   * @param position Имя позиции
   */
  setRangeLineSizeFromCoords(
    coordFrom: number,
    coordTo: number,
    gap: number,
    position: ISliderOptions['position'],
  ) {
    const rangeLineWidth = coordTo - coordFrom;

    this.$rangeLine.css({
      'flex-basis': rangeLineWidth,
      [position]: coordFrom + gap,
    });
  }
}

/**
 * Конвертирует значения в координаты и коррдинаты в значения
 */
export default class Converter implements IConverter {
  /**
   * Конвертирует координаты в значение с учетом шага и возвращает его
   * @param coord Координаты ползунка
   * @param step Размер шага
   * @param width Длинна
   * @param range Промежуток значений
   */
  coordInValue(
    coord: number,
    step: number,
    width: number,
    range: IRangeValues,
  ) {
    let value = ((range.max - range.min) * (coord / width)) + range.min;
    value = this.calcValueWithStep(value, step);

    if (coord >= width) value = range.max;
    if (value < range.min) value = range.min;

    return value;
  }

  /**
   * Конвертирует значение в координаты и возвращает его
   * @param valueOrIndex Текущее значение или индекс текущего значения
   * @param width Длина
   * @param range Промежуток значений
   */
  valueInCoord(
    valueOrIndex: number,
    width: number,
    range: IRangeValues,
  ) {
    let coord = width * (valueOrIndex / (range.max - range.min));
    if (valueOrIndex === range.max) coord = width;
    else if (valueOrIndex === range.min) coord = 0;

    return coord;
  }

  /**
   * Считает значение с учетом шага и возвращает его
   * @param value Текущее значение
   * @param step Размер шага
   */
  calcValueWithStep(value: number, step: number) {
    return Math.floor(value / step) * step;
  }
}

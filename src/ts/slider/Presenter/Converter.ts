export default class Converter implements IConverter {
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

  calcValueWithStep(value: number, step: number) {
    return Math.floor(value / step) * step;
  }
}

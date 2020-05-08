import Converter from '../Converter';

let converter: IConverter;

describe('Converter', () => {
  beforeAll(() => {
    converter = new Converter();
  });

  test('coordInValue should convert coord in value', () => {
    let coord = 99;
    const elementWidth = 100;
    const step = 1;
    const valuesRange = { min: 1, max: 100 };

    let value = converter.coordInValue(
      coord,
      step,
      elementWidth,
      valuesRange,
    );

    const predictedValue = 99;
    expect(value).toBe(predictedValue);

    coord = 1000; // more than width, method should return width val

    value = converter.coordInValue(
      coord,
      step,
      elementWidth,
      valuesRange,
    );

    expect(value).toBe(elementWidth);

    coord = -1000; // less than 0, method should return range min val

    value = converter.coordInValue(
      coord,
      step,
      elementWidth,
      valuesRange,
    );

    expect(value).toBe(valuesRange.min);
  });

  test('valueInCoord should convert value in coord', () => {
    let value = 10;
    const elementWidth = 1000;
    const valuesRange = { min: 1, max: 100 };

    let coord = converter.valueInCoord(
      value,
      elementWidth,
      valuesRange,
    );

    const predictedCoord = 101;

    expect(coord).toBeCloseTo(predictedCoord, 1);

    // if value equal valuesrange.min, then method should return 0 (if branch)
    value = valuesRange.min;
    coord = converter.valueInCoord(
      value,
      elementWidth,
      valuesRange,
    );

    expect(coord).toBe(0);

    // if value equal max range, then method should return coord, that equal width
    value = valuesRange.max;
    coord = converter.valueInCoord(
      value,
      elementWidth,
      valuesRange,
    );

    expect(coord).toBe(elementWidth);
  });

  test('calcValueWithStep should return closest lower multiple value', () => {
    const value = 124;
    const step = 5;

    const valueMultipleStep = converter.calcValueWithStep(value, step);
    const predictedValue = 120;
    expect(valueMultipleStep).toBe(predictedValue);
  });
});

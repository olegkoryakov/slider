import View from '../ts/slider/view';
import Model from '../ts/slider/model';
import Presenter from '../ts/slider/presenter';

const parentNode = $('<div></div>');

const view = new View();
const model = new Model('horizontal', true, true);
const presenter = new Presenter(model, view);

describe('Presenter', () => {
  beforeAll(() => {
    presenter.view.getSliderWidth = jest.fn(() => 276);
  });

  beforeEach(() => {
    presenter.setValues(['1', '100']);
  });

  describe('renderSlider', () => {
    test('should append slider and config panel to parentNode', () => {
      presenter.renderSlider(parentNode);
      expect(parentNode.find('.slider')).toEqual(presenter.view.slider);
      expect(parentNode.find('.config-panel')).toEqual(presenter.view.configPanel);
    });
    test('slider should be rendered based on model state', () => {
      const sliderClasses = view.slider.attr('class');

      expect(sliderClasses).toContain('slider--horizontal');
    });
  });

  describe('toggleOrienation', () => {
    beforeAll(() => {
      presenter.toggleOrientation();
    });
    test('Model should toggle state.orientation', () => {
      const toggledStateOrientation = 'vertical';
      const currentStateOrientation = presenter.model.getState().orientation;

      expect(currentStateOrientation).toBe(toggledStateOrientation);
    });

    test('View should toggle slider class', () => {
      const toggledClass = 'slider--vertical';
      const currentSliderClasses = presenter.view.slider.attr('class');

      expect(currentSliderClasses).toContain(toggledClass);
    });
  });

  describe('toggleRange', () => {
    beforeAll(() => presenter.toggleRange());

    test('should toggle model.state.isRange', () => {
      const toggledIsRange = false;
      const currentIsRange = model.state.isRange;

      expect(currentIsRange).toBe(toggledIsRange);
    });

    test('should add hide class to slider "thumb to", "input value to", "range line to"', () => {
      const inputToClassList = presenter.view.slider.find('.slider__input-value--to').attr('class');
      const thumbToClassList = presenter.view.slider.find('.slider__thumb--to').attr('class');
      const sliderRangeLineClassList = presenter.view.slider.find('.slider__range-line').attr('class');

      expect(inputToClassList).toContain('hide');
      expect(thumbToClassList).toContain('hide');
      expect(sliderRangeLineClassList).toContain('hide');
    });
  });

  describe('toggleShowValue', () => {
    beforeAll(() => presenter.toggleShowValue());

    test('should toggle model.state.isShowValue', () => {
      const toggledIsShowValue = false;
      const currentIsShowValue = presenter.model.getState().isShowValue;

      expect(currentIsShowValue).toBe(toggledIsShowValue);
    });
    test('should add hide class to view slider value', () => {
      const thumbValuesClassList = presenter.view.slider.find('.slider__value').map((_index, thumb) => thumb.className);
      thumbValuesClassList.each((_index, thumbValueClassList) => {
        expect(thumbValueClassList).toContain('hide');
      });
    });
  });

  describe('setValues', () => {
    test('should rewrite model values and values range', () => {
      presenter.setValues('1 2');
      expect(presenter.model.getValues()).toEqual({ from: 1, to: 2 });
      expect(presenter.model.getRangeValues()).toEqual({ min: 1, max: 2 });

      presenter.setValues('2 1');
      expect(presenter.model.getValues()).toEqual({ from: 1, to: 2 });
      expect(presenter.model.getRangeValues()).toEqual({ min: 1, max: 2 });

      presenter.setValues('3');
      expect(presenter.model.getValues()).toEqual({ from: 0, to: 3 });
      expect(presenter.model.getRangeValues()).toEqual({ min: 0, max: 3 });

      const string = 'a, b, c';
      const stringArray = ['a', 'b', 'c'];

      presenter.setValues(stringArray);
      expect(presenter.model.getValues()).toEqual(stringArray);
      expect(presenter.model.getRangeValues()).toEqual({ min: 0, max: 2 });

      presenter.setValues(string);
      expect(presenter.model.getValues()).toEqual(stringArray);
      expect(presenter.model.getRangeValues()).toEqual({ min: 0, max: 2 });
    });
  });

  test('setStep should set step in model', () => {
    const step = 123;
    presenter.setStep(step);
    expect(presenter.model.getStep()).toBe(step);

    const stringStep = step.toString(10);
    presenter.setStep(stringStep);
    expect(presenter.model.getStep()).toBe(step);

    const notStep = 'asdasd';
    presenter.setStep(notStep);
    expect(presenter.model.getStep()).toBe(step);
  });

  test('convertValueInCoord should return coord', () => {
    let predictedCoord = 0;
    let convertedValue = presenter.convertValueInCoord(0);
    expect(convertedValue).toBe(predictedCoord);

    predictedCoord = 276;
    convertedValue = presenter.convertValueInCoord(100);
    expect(convertedValue).toBe(predictedCoord);
  });

  test('convertCoordInValue shoul return value', () => {
    console.log(model.values);
    let predictedValue = 100;
    let coord = 276;
    expect(presenter.convertCoordInValue(coord)).toBe(predictedValue);

    predictedValue = 1;
    coord = 0;
    expect(presenter.convertCoordInValue(coord)).toBe(predictedValue);
  });
});

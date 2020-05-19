import SliderView from '../SliderView';

interface IExtendedSliderView extends ISliderView {
  getThumbs(): IThumbView[],
  getInputs(): IValueInputView[],
  getRangeLine(): IRangeLineView,
  getSliderLine(): JQuery,
}

const parentNode = $('<div></div>');

class ExtendedSliderView extends SliderView implements IExtendedSliderView {
  constructor() {
    super(parentNode);
  }

  getThumbs() {
    return [this._thumbFrom, this._thumbTo];
  }

  getInputs() {
    return [this._inputValueFrom, this._inputValueTo];
  }

  getSliderLine() {
    return this._sliderLine;
  }

  getRangeLine() {
    return this._rangeLine;
  }
}

let sliderView: IExtendedSliderView;
const state: IState = {
  orientation: 'horizontal',
  isRange: true,
  isShowValue: true,
};

describe('SliderView', () => {
  beforeEach(() => {
    sliderView = new ExtendedSliderView();
    sliderView.emit = jest.fn();
    sliderView.getWidth = () => 123;
    sliderView.render(state);
  });

  test('calcValues should emit custom events on 2 thumbs', () => {
    const calledTimes = 2;
    sliderView.emit = jest.fn();
    sliderView.calcValues();
    expect(sliderView.emit).toBeCalledTimes(calledTimes);
  });

  test('getThumbByModifier', () => {
    const thumb = sliderView.getThumbByModifier('from');
    expect(thumb.getModifier()).toBe('from');
  });

  test('getInputByModifier', () => {
    const input = sliderView.getInputByModifier('from');
    expect(input.getModifier()).toBe('from');
  });

  test('isRange', () => {
    expect(sliderView.isRange()).toBe(state.isRange);
  });

  test('getOptions should return object, that contain clientAxis and position keys with string values', () => {
    expect(sliderView.getOptions()).toEqual({ clientAxis: 'clientX', position: 'left' });

    sliderView.setOrientation('vertical');
    expect(sliderView.getOptions()).toEqual({ clientAxis: 'clientY', position: 'top' });
  });

  describe('dragNdrop handlers', () => {
    let thumbView: IThumbView;
    let thumb: JQuery;
    let mouseMoveEvent: JQuery.Event;
    let mouseDownEvent: JQuery.Event;
    let mouseUpEvent: JQuery.Event;
    let currentPosition = 0;
    beforeEach(() => {
      [thumbView] = sliderView.getThumbs();
      // eslint-disable-next-line no-underscore-dangle
      thumb = thumbView._thumb;
      mouseMoveEvent = jQuery.Event('mousemove', { clientX: 20 });
      mouseDownEvent = jQuery.Event('mousedown', { clientX: 0 });
      mouseUpEvent = jQuery.Event('mouseup');
      thumbView.setPosition = (position: ISliderOptions['position'], coord: number) => {
        currentPosition = coord;
      };
      thumb.css('z-index', 1);
    });

    test('mousedown, mousemove', () => {
      const width = sliderView.getWidth();
      thumb.trigger(mouseDownEvent);
      $(document).trigger(mouseMoveEvent);
      $(document).trigger(mouseUpEvent);

      expect(currentPosition).toBe(20);

      mouseMoveEvent.clientX = width + 1;
      // if coord more than width, coord should be equal width
      thumb.trigger(mouseDownEvent);
      $(document).trigger(mouseMoveEvent);
      $(document).trigger(mouseUpEvent);
      expect(currentPosition).toBe(width);

      mouseMoveEvent.clientX = -1;
      // if coord less than 0, coord should be equal 0
      thumb.trigger(mouseDownEvent);
      $(document).trigger(mouseMoveEvent);
      $(document).trigger(mouseUpEvent);
      expect(currentPosition).toBe(0);
    });

    test('mouseup', () => {
      thumb.trigger(mouseDownEvent);
      $(document).trigger(mouseMoveEvent);
      $(document).trigger(mouseUpEvent);
      expect(thumb.css('z-index')).toBe('1');
    });
  });

  test('sliderLineHandler', () => {
    const sliderLine = sliderView.getSliderLine();
    const thumbsView = sliderView.getThumbs();
    const clickEvent = jQuery.Event('click', { offsetX: 15 });
    const coords = [0, 20];

    const positionObj: any = {
      1: coords[0],
      2: coords[1],
    };

    thumbsView.forEach((thumb, index) => {
      // eslint-disable-next-line no-param-reassign
      thumb.setPosition = (position: ISliderOptions['position'], coord: number) => {
        positionObj[index + 1] = coord;
      };

      // eslint-disable-next-line no-param-reassign, no-unused-vars
      thumb.getCoord = (position: ISliderOptions['position']) => positionObj[index + 1];
    });

    sliderLine.trigger(clickEvent);
    expect(thumbsView[1].getCoord('left')).toBe(15);
  });

  test('setRange', () => {
    const thumbTo = sliderView.getThumbs()[1];
    const rangeLine = sliderView.getRangeLine();

    sliderView.setRange(false);
    expect(thumbTo.isInDOM() && rangeLine.isInDOM()).toBe(false);


    sliderView.setRange(true);
    expect(thumbTo.isInDOM() && rangeLine.isInDOM()).toBe(true);
  });

  test('setShowValue', () => {
    const thumbsView = sliderView.getThumbs();

    const isValueShowing = () => thumbsView.every((thumb) => thumb.isValueShowing());

    sliderView.setShowValue(false);
    expect(isValueShowing()).toBe(false);

    sliderView.setShowValue(true);
    expect(isValueShowing()).toBe(true);
  });

  test('resizeRangeLine', () => {
    const rangeLine = sliderView.getRangeLine();
    rangeLine.setRangeLineSizeFromCoords = jest.fn();

    const coords: any = {
      1: 50,
      2: 0,
    };

    sliderView.getThumbs().forEach((thumb, index) => {
      // eslint-disable-next-line no-param-reassign
      thumb.getCoord = () => coords[index + 1];
      // eslint-disable-next-line no-param-reassign
      thumb.getWidth = () => 20;
    });

    sliderView.resizeRangeLine();
    expect(rangeLine.setRangeLineSizeFromCoords).toHaveBeenCalledWith(0, 50, 10, 'left');
  });
});

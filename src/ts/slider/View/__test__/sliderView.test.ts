import SliderView from '../SliderView';

const parentNode = $('<div></div>');
const state: IState = {
  orientation: 'horizontal',
  isRange: true,
  isShowValue: true,
};
let sliderView: ISliderView;
let thumbsViewArray: IThumbView[];

describe('SliderView', () => {
  beforeEach(() => {
    sliderView = new SliderView(parentNode);
    sliderView.emit = jest.fn();
    sliderView.getWidth = () => 123;
    sliderView.render(state);
    // @ts-ignore
    thumbsViewArray = [sliderView.thumbFrom, sliderView.thumbTo];
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
    let $thumb: JQuery;
    let mouseMoveEvent: JQuery.Event;
    let mouseDownEvent: JQuery.Event;
    let mouseUpEvent: JQuery.Event;
    let currentPosition = 0;
    beforeEach(() => {
      [thumbView] = thumbsViewArray;
      // @ts-ignore
      $thumb = thumbView.$thumb;
      mouseMoveEvent = jQuery.Event('mousemove', { clientX: 20 });
      mouseDownEvent = jQuery.Event('mousedown', { clientX: 0 });
      mouseUpEvent = jQuery.Event('mouseup');
      thumbView.setPosition = (position: ISliderOptions['position'], coord: number) => {
        currentPosition = coord;
      };
      $thumb.css('z-index', 1);
    });

    test('mousedown, mousemove', () => {
      const width = sliderView.getWidth();
      $thumb.trigger(mouseDownEvent);
      $(document).trigger(mouseMoveEvent);
      $(document).trigger(mouseUpEvent);

      expect(currentPosition).toBe(20);

      mouseMoveEvent.clientX = width + 1;
      // if coord more than width, coord should be equal width
      $thumb.trigger(mouseDownEvent);
      $(document).trigger(mouseMoveEvent);
      $(document).trigger(mouseUpEvent);
      expect(currentPosition).toBe(width);

      mouseMoveEvent.clientX = -1;
      // if coord less than 0, coord should be equal 0
      $thumb.trigger(mouseDownEvent);
      $(document).trigger(mouseMoveEvent);
      $(document).trigger(mouseUpEvent);
      expect(currentPosition).toBe(0);
    });

    test('mouseup', () => {
      $thumb.trigger(mouseDownEvent);
      $(document).trigger(mouseMoveEvent);
      $(document).trigger(mouseUpEvent);
      expect($thumb.css('z-index')).toBe('1');
    });
  });

  test('sliderLineHandler', () => {
    // @ts-ignore
    const sliderLine = sliderView.$sliderLine;
    const clickEvent = jQuery.Event('click', { offsetX: 15 });
    const coords = [0, 20];

    const positionObj: any = {
      1: coords[0],
      2: coords[1],
    };

    thumbsViewArray.forEach((thumb, index) => {
      // eslint-disable-next-line no-param-reassign
      thumb.setPosition = (position: ISliderOptions['position'], coord: number) => {
        positionObj[index + 1] = coord;
      };

      // eslint-disable-next-line no-param-reassign, no-unused-vars
      thumb.getCoord = (position: ISliderOptions['position']) => positionObj[index + 1];
    });

    sliderLine.trigger(clickEvent);
    expect(thumbsViewArray[1].getCoord('left')).toBe(15);
  });

  test('setRange', () => {
    const thumbTo = thumbsViewArray[1];
    // @ts-ignore
    const { rangeLine } = sliderView;

    sliderView.setRange(false);
    expect(thumbTo.isInDOM() && rangeLine.isInDOM()).toBe(false);


    sliderView.setRange(true);
    expect(thumbTo.isInDOM() && rangeLine.isInDOM()).toBe(true);
  });

  test('setShowValue', () => {
    const isValueShowing = () => thumbsViewArray.every((thumbView) => thumbView.isValueShowing());

    sliderView.setShowValue(false);
    expect(isValueShowing()).toBe(false);

    sliderView.setShowValue(true);
    expect(isValueShowing()).toBe(true);
  });

  test('resizeRangeLine', () => {
    // @ts-ignore
    const { rangeLine } = sliderView;
    rangeLine.setRangeLineSizeFromCoords = jest.fn();

    const coords: any = {
      1: 50,
      2: 0,
    };

    thumbsViewArray.forEach((thumbView, index) => {
      // eslint-disable-next-line no-param-reassign
      thumbView.getCoord = () => coords[index + 1];
      // eslint-disable-next-line no-param-reassign
      thumbView.getWidth = () => 20;
    });

    sliderView.resizeRangeLine();
    expect(rangeLine.setRangeLineSizeFromCoords).toHaveBeenCalledWith(0, 50, 10, 'left');
  });
});

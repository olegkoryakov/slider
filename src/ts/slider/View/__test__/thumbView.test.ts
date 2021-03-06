import ThumbView from '../ThumbView';

const parentNode = $('<div></div>');
const modifier = 'from';


let thumbView: IThumbView;
let $thumbValue: JQuery;

describe('ThumbView', () => {
  beforeEach(() => {
    thumbView = new ThumbView(modifier, parentNode);
    // @ts-ignore
    $thumbValue = thumbView.$thumb.find('.slider__value');
  });

  test('removeFromDOM, isInDOM, appendToNode', () => {
    thumbView.removeFromDOM();
    let isInDOM = false;
    expect(isInDOM).toBe(thumbView.isInDOM());

    thumbView.appendToNode();
    isInDOM = true;
    expect(isInDOM).toBe(thumbView.isInDOM());
  });

  test('setValue', () => {
    const value = '123';
    thumbView.setValue(value);
    expect($thumbValue.text()).toBe(value);
  });

  test('getModifier', () => {
    expect(thumbView.getModifier()).toBe(modifier);
  });

  test('setPosition, getCoord', () => {
    type IValueMock = string | number;
    interface ICSSPropsMock { [prop: string]: IValueMock }

    const CSSObj: ICSSPropsMock = {};
    const currentPos = 'left';
    const currentCoord = 123;

    $.prototype.css = function cssFn(position: ISliderOptions['position'], coord: number) {
      CSSObj[position] = coord;
    };

    $.prototype.position = function posFn() {
      return CSSObj;
    };

    thumbView.setPosition(currentPos, currentCoord);

    expect(currentCoord).toBe(thumbView.getCoord(currentPos));
  });

  test('hideValue, showValue', () => {
    thumbView.hideValue();
    expect($thumbValue[0].style.display).toBe('none');

    thumbView.showValue();
    expect($thumbValue[0].style.display).toBe('');
  });

  test('getWidth', () => {
    const width = 123;
    $.prototype.outerWidth = () => width;

    expect(thumbView.getWidth()).toBe(width);
  });

  test('isValueShowing', () => {
    expect(thumbView.isValueShowing()).toBe(true);
  });
});

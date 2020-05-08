import RangeLineView from '../RangeLineView';

type IValueMock = string | number;
interface ICSSPropsMock { [prop: string]: IValueMock }

let rangeLineView: IRangeLineView;

const parentNode = $('<div></div>');

let CSSObj: ICSSPropsMock;

// Fn callback for $.prototype.css
function cssFn(arg: ICSSPropsMock) {
  CSSObj = arg;
}

$.prototype.css = jest.fn(cssFn);

describe('rangeLineView', () => {
  beforeEach(() => {
    // Object that will change in mock fn
    CSSObj = {};
    rangeLineView = new RangeLineView(parentNode);
  });

  test('isInDom method', () => {
    const isInDOM = true; // because appendToNode method called in constructor

    expect(rangeLineView.isInDOM()).toBe(isInDOM);
  });

  test('removeFromDOM', () => {
    const isInDOM = false;

    rangeLineView.removeFromDOM();

    expect(rangeLineView.isInDOM()).toBe(isInDOM);
  });

  test('setOrientation should set css props that toggle positions', () => {
    const oldPos = 'left';
    const newPos = 'top';
    rangeLineView.setOrientation(oldPos, newPos);

    const predictedCssObj: ICSSPropsMock = {
      [oldPos]: '50%',
      [newPos]: 0,
    };

    expect(CSSObj).toEqual(predictedCssObj);
  });

  test('setRangeLineFromCoords', () => {
    const coordFrom = 1;
    const coordTo = 150;
    const gap = 10;
    const position = 'left';

    const predictedCssObj = {
      'flex-basis': 149,
      [position]: 11,
    };

    rangeLineView.setRangeLineSizeFromCoords(
      coordFrom,
      coordTo,
      gap,
      position,
    );

    expect(CSSObj).toEqual(predictedCssObj);
  });
});

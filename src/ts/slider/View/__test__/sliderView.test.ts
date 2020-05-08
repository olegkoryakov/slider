import SliderView from '../SliderView';

let sliderView: ISliderView;

const parentNode = $('<div></div>');
// const state: IState = {
//   orientation: 'horizontal',
//   isRange: true,
//   isShowValue: true,
// };


describe('SliderView', () => {
  beforeEach(() => {
    sliderView = new SliderView(parentNode);
  });

  test('calcValues', () => {
    sliderView.emit = jest.fn();
    sliderView.calcValues();
    expect(sliderView.emit).toBeCalledTimes(2);
  });
});

import Model from '../ts/slider/model';

let model: IModel;
let result: IState;
describe('Model', () => {
  beforeEach(() => {
    model = new Model('horizontal', false, true);
    result = {
      orientation: 'horizontal',
      isRange: false,
      isShowValue: true,
    };
  });

  test('constructor shoud set state', () => {
    expect(model.state).toEqual(result);
  });

  test('toggleOrientation should toggle state.orientation', () => {
    model.toggleOrientation();
    expect(model.state.orientation).toEqual('vertical');
    model.toggleOrientation();
    expect(model.state.orientation).toEqual('horizontal');
  });

  test('toggleRange should toggle state.isRange', () => {
    model.toggleRange();
    expect(model.state.isRange).toEqual(true);
    model.toggleRange();
    expect(model.state.isRange).toEqual(false);
  });

  test('toggleRange should toggle state.showValue', () => {
    model.toggleShowValue();
    expect(model.state.isShowValue).toEqual(false);
    model.toggleShowValue();
    expect(model.state.isShowValue).toEqual(true);
  });

  test('setStep should set step))0', () => {
    model.setStep(123);
    expect(model.step).toEqual(123);
  });

  test('getStep should return step', () => {
    expect(model.getStep()).toEqual(model.step);
  });
});

import Model from '../Model';

let model: IModel;
let state: IState;
let predictedState: IState;

describe('Model', () => {
  beforeEach(() => {
    model = new Model(
      'horizontal',
      true,
      false,
      1,
      { from: 1, to: 100 },
    );
  });

  test('setValues should set values and values range', () => {
    let testValues: TValues = ['1', '2', '3'];
    model.setValues(testValues);
    let modelValues = model.getValues();
    let modelRange = model.getRangeValues();
    let predictedModelRange = { min: 0, max: 2 };

    expect(modelRange).toEqual(predictedModelRange);
    expect(testValues).toEqual(modelValues);

    testValues = { from: 1, to: 100 };
    model.setValues(testValues);
    modelValues = model.getValues();
    modelRange = model.getRangeValues();
    predictedModelRange = { min: 1, max: 100 };
    expect(modelRange).toEqual(predictedModelRange);
    expect(testValues).toEqual(modelValues);

    testValues = { from: 1000, to: 1 };
    model.setValues(testValues);
    modelValues = model.getValues();
    modelRange = model.getRangeValues();
    predictedModelRange = { min: 1, max: 1000 };
    // test values should pomenyatsya mestami
    testValues = { from: 1, to: 1000 };
    expect(modelRange).toEqual(predictedModelRange);
    expect(testValues).toEqual(modelValues);
  });

  describe('set**** methods', () => {
    beforeEach(() => {
      state = model.getState();
      predictedState = state;
    });

    test('setOrientation', () => {
      let orientation: IState['orientation'] = 'horizontal';
      model.setOrientationState(orientation);

      predictedState.orientation = orientation;
      expect(state).toEqual(predictedState);

      orientation = 'vertical';
      model.setOrientationState(orientation);
      predictedState.orientation = orientation;
      expect(state).toEqual(predictedState);
    });

    test('setRangeState', () => {
      const isRange = false;
      model.setRangeState(isRange);

      predictedState.isRange = isRange;
      expect(state).toEqual(predictedState);
    });

    test('setShowValue', () => {
      const isShowValue = true;
      model.setShowValueState(isShowValue);

      predictedState.isShowValue = isShowValue;
      expect(state).toEqual(predictedState);
    });

    test('setStep', () => {
      const testStep = 5;
      model.setStep(testStep);
      const step = model.getStep();

      expect(step).toBe(testStep);
    });
  });
});

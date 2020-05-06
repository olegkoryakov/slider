export default class Model implements IModel {
  constructor(
    orientation: IState['orientation'],
    isRange: IState['isRange'],
    isShowValue: IState['isShowValue'],
    step: number,
    values: TValues,
  ) {
    this._state = {
      orientation,
      isRange,
      isShowValue,
    };
    this._step = step;
    this.setValues(values);
  }

  _state: IState;

  _step: number;

  values!: TValues;

  rangeValues!: IRangeValues;

  setValues(values: TValues) {
    if (values instanceof Array) {
      this.rangeValues = {
        min: 0,
        max: values.length - 1,
      };
      this.values = values;
    } else {
      let min = values.from;
      let max = values.to;

      if (min > max) {
        const temp = min;
        min = max;
        max = temp;
      }

      this.values = {
        from: min,
        to: max,
      };

      this.rangeValues = {
        min,
        max,
      };
    }
  }

  getValues(): TValues {
    return this.values;
  }

  getRangeValues(): IRangeValues {
    return this.rangeValues;
  }

  getState(): IState {
    return this._state;
  }

  setStep(_step: number): void {
    this._step = _step;
  }

  getStep(): number {
    return this._step;
  }

  setOrientationState(orientation: IState['orientation']) {
    this._state.orientation = orientation;
  }

  setRangeState(rangeState: IState['isRange']) {
    this._state.isRange = rangeState;
  }

  setShowValueState(showValue: IState['isShowValue']) {
    this._state.isShowValue = showValue;
  }
}

export default class Model implements IModel {
  constructor(
    orientation: IState['orientation'],
    isRange: IState['isRange'],
    isShowValue: IState['isShowValue'],
    step: number,
    values: TValues,
  ) {
    this.state = {
      orientation,
      isRange,
      isShowValue,
    };
    this.step = step;
    this.setValues(values);
  }

  private state: IState;

  private step: number;

  private values!: TValues;

  private rangeValues!: IRangeValues;

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
    return this.state;
  }

  setStep(step: number): void {
    this.step = step;
  }

  getStep(): number {
    return this.step;
  }

  setOrientationState(orientation: IState['orientation']) {
    this.state.orientation = orientation;
  }

  setRangeState(rangeState: IState['isRange']) {
    this.state.isRange = rangeState;
  }

  setShowValueState(showValue: IState['isShowValue']) {
    this.state.isShowValue = showValue;
  }
}

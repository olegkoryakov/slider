export default class Model implements IModel {
  constructor(orientation: IState['orientation'], isRange: IState['isRange'], isShowValue: IState['isShowValue']) {
    this.state = {
      orientation,
      isRange,
      isShowValue,
    };
    this.step = 1;
    this.setValues({ from: 1, to: 100 });
  }

  state: IState;

  step: number;

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
    return this.state;
  }

  setStep(step: number): void {
    this.step = step;
  }

  getStep(): number {
    return this.step;
  }

  toggleOrientation() {
    if (this.state.orientation === 'vertical') this.state.orientation = 'horizontal';
    else this.state.orientation = 'vertical';
  }

  toggleRange() {
    if (this.state.isRange === true) this.state.isRange = false;
    else this.state.isRange = true;
  }

  toggleShowValue() {
    if (this.state.isShowValue === true) this.state.isShowValue = false;
    else this.state.isShowValue = true;
  }
}

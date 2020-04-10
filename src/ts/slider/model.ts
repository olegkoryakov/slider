export default class Model implements IModel {
  constructor(orientation: IState['orientation'], isRange: IState['isRange'], isShowValue: IState['isShowValue']) {
    this.state = {
      orientation,
      isRange,
      isShowValue,
    };
    this.step = 1;
  }

  state: IState;

  step: number;

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

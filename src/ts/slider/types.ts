interface IState {
  orientation: 'horizontal' | 'vertical',
  isRange: boolean,
  isShowValue: boolean,
}

interface IModel {
  state: IState,
  step: number,
  toggleOrientation(): void,
  toggleRange(): void,
  toggleShowValue(): void,
  setStep(step: number): void,
  getStep(): number,
}

interface IState {
  orientation: 'horizontal' | 'vertical',
  isRange: boolean,
  isShowValue: boolean,
}

interface IEvents {
  [eventName: string]: Function[],
}

interface IEventEmitter {
  events: IEvents,
  on(eventName: string, callback: Function): void,
  emit(eventName: string, arg: any): void,
}

interface IModel{
  state: IState,
  step: number,
  toggleOrientation(): void,
  toggleRange(): void,
  toggleShowValue(): void,
  setStep(step: number): void,
  getStep(): number,
}

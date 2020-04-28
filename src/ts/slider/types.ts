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
  getRangeValues(): IRangeValues,
  getValues(): TValues,
  getState(): IState,
  setValues(values: TValues): void,
  toggleOrientation(): void,
  toggleRange(): void,
  toggleShowValue(): void,
  setStep(step: number): void,
  getStep(): number,
}

interface INumberValues {
  from: number,
  to: number,
}

type TStringValues = string[];

type TValues = INumberValues | TStringValues;

interface IRangeValues {
  min: number,
  max: number,
}

interface ISliderOptions {
  position: 'left' | 'top',
  clientAxis: 'clientX' | 'clientY';
}

interface IView extends IEventEmitter {
  slider: JQuery,
  configPanel: JQuery,
  setSliderInitialState(state: IState): void,
  toggleOrientation(): void,
  toggleRange(): void,
  toggleShowValue(): void,
  getSliderWidth(): number,
  getSliderOptions(): ISliderOptions,
  setThumbValue(thumbElement: JQuery, value: number | string): void,
  setSliderRangeLineCoords(): void,
  addDragNDropHandlers(): void,
  setInputValue(value: string | number, modifier: string): void,
}

interface IThumbOptions {
  value?: number | string,
  coord?: number
  thumb: JQuery
}

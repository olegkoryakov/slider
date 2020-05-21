interface IState {
  orientation: 'horizontal' | 'vertical',
  isRange: boolean,
  isShowValue: boolean,
}

interface IRangeInstances {
  thumb: IThumbView,
  input: IValueInputView,
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

type TModifier = 'from' | 'to';

interface IEvents {
  [eventName: string]: Function[],
}

interface IEventEmitter {
  on(eventName: string, callback: Function): void,
  emit(eventName: string, arg: any): void,
}

interface IModel{
  getRangeValues(): IRangeValues,
  getValues(): TValues,
  getState(): IState,
  setValues(values: TValues): void,
  setOrientationState(orientation: IState['orientation']): void,
  setRangeState(rangeState: IState['isRange']): void,
  setShowValueState(showValue: IState['isShowValue']): void,
  setStep(step: number): void,
  getStep(): number,
}

interface IThumbView {
  getModifier(): TModifier,
  appendToNode(): void,
  removeFromDOM(): void,
  isInDOM(): boolean,
  showValue(): void,
  hideValue(): void,
  isValueShowing(): boolean,
  setValue(value: string | number): void,
  setPosition(position: ISliderOptions['position'], coord: number): void,
  getCoord(position: ISliderOptions['position']): number;
  getWidth(): number,
  addDragNDropHandler(
    getOptionsCallback: Function,
    emitCallback: Function,
    emitCallbackType: string,
    getWidthCallback: Function,
  ): void,
}

interface IRangeLineView {
  setRangeLineSizeFromCoords(
    coordFrom: number,
    coordTo: number,
    gap: number,
    position: ISliderOptions['position'],
  ): void;
  setOrientation(
    oldPos: ISliderOptions['position'],
    newPos: ISliderOptions['position']
  ): void,
  appendToNode(): void;
  isInDOM(): boolean;
  removeFromDOM(): void;
}

interface ISliderView extends IEventEmitter{
  render(state: IState): void,
  setOrientation(orientation: IState['orientation']): void,
  getThumbByModifier(modifier: TModifier): IThumbView;
  getInputByModifier(modifier: TModifier): IValueInputView;
  setRange(isRange: IState['isRange']): void,
  setShowValue(isShowValue: IState['isShowValue']): void,
  calcValues(): void;
  getOptions(): ISliderOptions,
  isRange(): boolean,
  resizeRangeLine(): void,
  getWidth(): number,
}

interface IConverter {
  coordInValue(
    coord: number,
    step: number,
    width: number,
    range: IRangeValues,
  ): number,
  valueInCoord(
    valueOrIndex: number,
    width: number,
    range: IRangeValues,
  ): number,
  calcValueWithStep(value: number, step: number): number,
}

interface IValueInputView {
  appendToNode(): void,
  removeFromDOM(): void,
  setValue(value: number | string): void,
  getValue(): string,
  getModifier(): TModifier,
  addChangeHandler(
    emitCallback: Function,
    emitCallbackType: string,
  ): void,
}

interface IConfigPanelView extends IEventEmitter {
  addConfigPanelHandlers(): void,
}

interface IPresenter extends IEventEmitter {
  renderApp(): void,
  changeOrientation(): void,
  changeShowValues(): void,
  changeRangeState(): void,
  changeValues(values: string[]): void,
  changeStep(inputValue: string): void,
  }

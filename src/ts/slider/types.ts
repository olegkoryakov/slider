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
  _state: IState,
  _step: number,
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

interface IThumbView {
  _thumb: JQuery,
  _modifier: TModifier,
  _node: JQuery,
  getModifier(): TModifier,
  appendToNode(): void,
  removeFromDOM(): void,
  isInDOM(): boolean,
  showValue(): void,
  hideValue(): void,
  isValueShowing(): boolean,
  setValue(value: string | number): void,
  setPosition(position: string, coord: number): void,
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
  _rangeLine: JQuery;
  _node: JQuery;
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
  _inputValueFrom: IValueInputView,
  _inputValueTo: IValueInputView,
  _thumbFrom: IThumbView,
  _thumbTo: IThumbView,
  _rangeLine: IRangeLineView,
  _slider: JQuery,
  _node: JQuery,
  render(state: IState): void,
  _onSliderLineClick(clickE: JQuery.ClickEvent): void,
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
  _valueInput: JQuery,
  _modifier: TModifier,
  _node: JQuery;
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

interface IRangeInstances {
  thumb: IThumbView,
  input: IValueInputView,
}

interface IConfigPanelView extends IEventEmitter {
  _configPanel: JQuery,
  _callbackPrefix: string,
  addConfigPanelHandlers(emitCallback: Function): void,
}

interface IPresenter extends IEventEmitter {
  _sliderView: ISliderView,
  _configPanel: IConfigPanelView,
  _model: IModel,
  _converter: IConverter,
  renderApp(): void,
  _renderRange(rangeInstances: IRangeInstances): void,
  _changeOrientation(): void,
  _changeShowValues(): void,
  _changeRangeState(): void,
  _changeValues(values: string[]): void,
  _changeStep(inputValue: string): void,
  _changeValue(thumbView: IThumbView): void,
  _changeInputValue(valueInputView: IValueInputView): void,
}

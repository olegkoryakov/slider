import EventEmitter from '../EventEmitter/EventEmitter';
import Converter from './Converter';

export default class Presenter extends EventEmitter implements IPresenter {
  constructor(configPanel: IConfigPanelView, sliderView: ISliderView, model: IModel) {
    super();
    this._sliderView = sliderView;
    this._model = model;
    this._configPanel = configPanel;
    this._converter = new Converter();

    this._sliderView.on('change-value', this._changeValue.bind(this));
    this._sliderView.on('change-input-value', this._changeInputValue.bind(this));
    this._sliderView.on('render-range', this._renderRange.bind(this));

    this._configPanel.on('change-values', this._changeValues.bind(this));
    this._configPanel.on('change-step', this._changeStep.bind(this));
    this._configPanel.on('change-orientation', this._changeOrientation.bind(this));
    this._configPanel.on('change-show-values', this._changeShowValues.bind(this));
    this._configPanel.on('change-range-state', this._changeRangeState.bind(this));
  }

  _configPanel: IConfigPanelView;

  _converter: IConverter;

  _sliderView: ISliderView;

  _model: IModel;

  renderApp() {
    const state = this._model.getState();
    this._sliderView.render(state);
    this._sliderView.calcValues();
  }

  _renderRange(rangeInstances: IRangeInstances) {
    const values = this._model.getValues();
    const width = this._sliderView.getWidth();
    let value: number | string;
    if (values instanceof Array) {
      value = values[values.length - 1];
    } else {
      value = values.to;
    }
    const { position } = this._sliderView.getOptions();
    rangeInstances.thumb.setPosition(position, width);
    rangeInstances.thumb.setValue(value);
    rangeInstances.input.setValue(value);
  }

  _changeOrientation() {
    const { orientation } = this._model.getState();
    const toggledOrientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';

    this._model.setOrientationState(toggledOrientation);
    this._sliderView.setOrientation(toggledOrientation);
  }

  _changeShowValues() {
    const { isShowValue } = this._model.getState();
    const toggledShowValue = !isShowValue;

    this._sliderView.setShowValue(toggledShowValue);
    this._model.setShowValueState(toggledShowValue);
  }

  _changeRangeState() {
    const { isRange } = this._model.getState();
    const toggledRange = !isRange;

    this._model.setRangeState(toggledRange);
    this._sliderView.setRange(toggledRange);
  }

  _changeValues(values: string[]) {
    if (values.length > 2) this._model.setValues(values);
    if (values.length <= 2) {
      const numberValues = values.map((val) => parseInt(val, 10));
      if (numberValues.every((val) => !Number.isNaN(val))) {
        if (numberValues.length === 2) {
          this._model.setValues({
            from: numberValues[0],
            to: numberValues[1],
          });
        } else {
          this._model.setValues({
            from: 1,
            to: numberValues[0],
          });
        }
      }
    }
    this._sliderView.calcValues();
  }

  _changeStep(inputValue: string) {
    let step = parseInt(inputValue, 10);
    if (Number.isNaN(step)) step = 1;
    this._model.setStep(step);
    this._sliderView.calcValues();
  }

  _changeValue(thumbView: IThumbView) {
    const sliderOptions = this._sliderView.getOptions();
    const width = this._sliderView.getWidth();
    const coord = thumbView.getCoord(sliderOptions.position);
    const modelValues = this._model.getValues();
    const modelValuesRange = this._model.getRangeValues();
    const step = this._model.getStep();
    const convertedCoord = this._converter.coordInValue(
      coord,
      step,
      width,
      modelValuesRange,
    );

    let value: string | number;
    if (modelValues instanceof Array) value = modelValues[convertedCoord];
    else value = convertedCoord;

    const inputView = this._sliderView.getInputByModifier(thumbView.getModifier());
    thumbView.setValue(value);
    inputView.setValue(value);
    this._sliderView.resizeRangeLine();
  }

  _changeInputValue(valueInputView: IValueInputView) {
    const { position } = this._sliderView.getOptions();
    const step = this._model.getStep();
    const modelValues = this._model.getValues();
    const modelValuesRange = this._model.getRangeValues();
    const width = this._sliderView.getWidth();
    let value: string | number = valueInputView.getValue();
    let coord = 0;
    if (modelValues instanceof Array) {
      let index = modelValues.findIndex((val) => val === value);
      if (index === -1) {
        index = 0;
        value = modelValues[index];
      } else {
        index = this._converter.calcValueWithStep(index, step);
        coord = this._converter.valueInCoord(index, width, modelValuesRange);
      }
    } else {
      value = parseInt(value, 10);
      if (Number.isNaN(value)) value = modelValuesRange.min;
      else if (value < modelValuesRange.min) value = modelValuesRange.min;
      else if (value > modelValuesRange.max) value = modelValuesRange.max;
      else value = this._converter.calcValueWithStep(value, step);

      coord = this._converter.valueInCoord(value, width, modelValuesRange);
    }

    const thumb = this._sliderView.getThumbByModifier(valueInputView.getModifier());
    thumb.setValue(value);
    thumb.setPosition(position, coord);
    valueInputView.setValue(value);
    this._sliderView.resizeRangeLine();
  }
}

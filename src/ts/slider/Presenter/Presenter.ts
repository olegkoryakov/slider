import Converter from './Converter';

/**
 * Настраивает общение между View и Model
 */
export default class Presenter implements IPresenter {
  /**
   * Записывает свойства класса и подписывает представления на события
   * @param configPanel Представление конфигурационной панели слайдера
   * @param sliderView Представление слайдера
   * @param model Модель слайдера
   */
  constructor(configPanel: IConfigPanelView, sliderView: ISliderView, model: IModel) {
    this.sliderView = sliderView;
    this.model = model;
    this.configPanel = configPanel;
    this.converter = new Converter();

    this.sliderView.on('change-value', this.changeValue.bind(this));
    this.sliderView.on('change-input-value', this.changeInputValue.bind(this));
    this.sliderView.on('render-range', this.renderRange.bind(this));

    this.configPanel.on('change-values', this.changeValues.bind(this));
    this.configPanel.on('change-step', this.changeStep.bind(this));
    this.configPanel.on('change-orientation', this.changeOrientation.bind(this));
    this.configPanel.on('change-show-values', this.changeShowValues.bind(this));
    this.configPanel.on('change-range-state', this.changeRangeState.bind(this));
  }

  /**
   * Представление конфигурационной панели
   */
  private configPanel: IConfigPanelView;

  /**
   * Конвертер значений и координат
   */
  private converter: IConverter;

  /**
   * Представление слайдера
   */
  private sliderView: ISliderView;

  /**
   * Модель данных слайдера
   */
  private model: IModel;

  /**
   * Отрисовывает элементы для промежуточного значения
   * @param rangeInstances Объект, содержащий представления поля ввода и ползунка,
   * которые используются для отображения слайдера с промежуточным значением
   */
  private renderRange(rangeInstances: IRangeInstances) {
    const values = this.model.getValues();
    const width = this.sliderView.getWidth();
    let value: number | string;
    if (values instanceof Array) {
      value = values[values.length - 1];
    } else {
      value = values.to;
    }
    const { position } = this.sliderView.getOptions();
    rangeInstances.thumb.setPosition(position, width);
    rangeInstances.thumb.setValue(value);
    rangeInstances.input.setValue(value);
  }

  /**
   * Изменяет значение ползунка и соответствующего инпута
   * @param thumbView Инстанс представления ползунка
   * */
  private changeValue(thumbView: IThumbView) {
    const sliderOptions = this.sliderView.getOptions();
    const width = this.sliderView.getWidth();
    const coord = thumbView.getCoord(sliderOptions.position);
    const modelValues = this.model.getValues();
    const modelValuesRange = this.model.getRangeValues();
    const step = this.model.getStep();
    const convertedCoord = this.converter.coordInValue(
      coord,
      step,
      width,
      modelValuesRange,
    );

    let value: string | number;
    if (modelValues instanceof Array) value = modelValues[convertedCoord];
    else value = convertedCoord;

    const inputView = this.sliderView.getInputByModifier(thumbView.getModifier());
    thumbView.setValue(value);
    inputView.setValue(value);
    this.sliderView.resizeRangeLine();
  }

  /**
   * Изменяет значение инпута и соответствующего бегунка
   * @param valueInputView Инстанс представления инпута значений
   */
  private changeInputValue(valueInputView: IValueInputView) {
    const { position } = this.sliderView.getOptions();
    const step = this.model.getStep();
    const modelValues = this.model.getValues();
    const modelValuesRange = this.model.getRangeValues();
    const width = this.sliderView.getWidth();
    let value: string | number = valueInputView.getValue();
    let coord = 0;
    if (modelValues instanceof Array) {
      let index = modelValues.findIndex((val) => val === value);
      if (index === -1) {
        index = 0;
        value = modelValues[index];
      } else {
        index = this.converter.calcValueWithStep(index, step);
        coord = this.converter.valueInCoord(index, width, modelValuesRange);
      }
    } else {
      value = parseInt(value, 10);
      if (Number.isNaN(value)) value = modelValuesRange.min;
      else value = this.converter.calcValueWithStep(value, step);

      if (value < modelValuesRange.min) value = modelValuesRange.min;
      else if (value > modelValuesRange.max) value = modelValuesRange.max;

      coord = this.converter.valueInCoord(value, width, modelValuesRange);
    }

    const thumb = this.sliderView.getThumbByModifier(valueInputView.getModifier());
    thumb.setValue(value);
    thumb.setPosition(position, coord);
    valueInputView.setValue(value);
    this.sliderView.resizeRangeLine();
  }

  /**
   * Отрисовывает слайдер на основе данных из модели
   */
  renderApp() {
    const state = this.model.getState();
    this.sliderView.render(state);
    this.sliderView.calcValues();
  }

  /**
   * Изменяет ориентацию в представления слайдера и в данных модели
   */
  changeOrientation() {
    const { orientation } = this.model.getState();
    const toggledOrientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';

    this.model.setOrientationState(toggledOrientation);
    this.sliderView.setOrientation(toggledOrientation);
  }

  /**
   * Изменяет отображение текущего значения над бегунками
   */
  changeShowValues() {
    const { isShowValue } = this.model.getState();
    const toggledShowValue = !isShowValue;

    this.sliderView.setShowValue(toggledShowValue);
    this.model.setShowValueState(toggledShowValue);
  }

  /**
   * Изменяет состояние слайдера (промежуточное или одиночное)
   */
  changeRangeState() {
    const { isRange } = this.model.getState();
    const toggledRange = !isRange;

    this.model.setRangeState(toggledRange);
    this.sliderView.setRange(toggledRange);
  }

  /**
   * Изменяет текущие значения сдайдера
   */
  changeValues(values: string[]) {
    if (values.length > 2) this.model.setValues(values);
    if (values.length <= 2) {
      const numberValues = values.map((val) => parseInt(val, 10));
      if (numberValues.every((val) => !Number.isNaN(val))) {
        if (numberValues.length === 2) {
          this.model.setValues({
            from: numberValues[0],
            to: numberValues[1],
          });
        } else {
          this.model.setValues({
            from: 1,
            to: numberValues[0],
          });
        }
      }
    }
    this.sliderView.calcValues();
  }

  /**
   * Изменяет размер шага
   */
  changeStep(inputValue: string) {
    let step = parseInt(inputValue, 10);
    if (Number.isNaN(step)) step = 1;
    this.model.setStep(step);
    this.sliderView.calcValues();
  }
}

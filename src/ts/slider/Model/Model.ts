/**
 * Хранит в себе данные о слайдере
 */
export default class Model implements IModel {
  /**
   * Записывает объект this.state, устанавливет размер this.step, устанавливает this.values
   * @param orientation Вертикальная или горизональная ориентация
   * @param isRange Если true, то промежуток значений, если false то одиночное значение
   * @param isShowValue Если true, то показывать значения, если false то нет
   * @param step Размер шага
   * @param values Значения слайдера
   */
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

  /**
   * Текущее состояние слайдера
   */
  private state: IState;

  /**
   * Текущий размер шага
   */
  private step: number;

  /**
   * Текущие значения
   */
  private values!: TValues;

  /**
   * Текущий промежуток значений
   */
  private rangeValues!: IRangeValues;

  /**
   * Устанавливает новые значения слайдера и их промежуток
   * @param values Новые значения слайдера
   */
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

  /**
   * Возвращает текущие значения
   */
  getValues(): TValues {
    return this.values;
  }

  /**
   * Возвращает текущий промежуток значений
   */
  getRangeValues(): IRangeValues {
    return this.rangeValues;
  }

  /**
   * Возвращает текущее состояние
   */
  getState(): IState {
    return this.state;
  }

  /**
   * Устанавливет размер шага
   */
  setStep(step: number): void {
    this.step = step;
  }

  /**
   * Возвращает размер шага
   */
  getStep(): number {
    return this.step;
  }

  /**
   * Устанавливет this.state.orientation
   * @param orientation Вертикальная или горизональная ориентация
   */
  setOrientationState(orientation: IState['orientation']) {
    this.state.orientation = orientation;
  }

  /**
   * Устанавливет this.state.isRange
   * @param rangeState Если true, то промежуток значений, если false то одиночное значение
   */
  setRangeState(rangeState: IState['isRange']) {
    this.state.isRange = rangeState;
  }

  /**
   * Устанавливет this.state.isShowValue
   * @param showValue Если true, то показывать значения, если false то нет
   */
  setShowValueState(showValue: IState['isShowValue']) {
    this.state.isShowValue = showValue;
  }
}

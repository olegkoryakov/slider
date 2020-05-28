import RangeLineView from './RangeLineView';
import ThumbView from './ThumbView';
import EventEmitter from '../EventEmitter/EventEmitter';
import ValueInputView from './ValueInputView';

/**
 * Представление слайдера
 */
export default class SliderView extends EventEmitter implements ISliderView {
  /**
   * Записывает свойства
   * Создает инстансы компонентов представления слайдера
   * @param node Родительский элемент
   */
  constructor(node: JQuery) {
    super();
    this.$node = node;
    this.$slider = $('<div class="slider"><div class="slider__values"></div><div class="slider__line"></div></div>');
    this.$sliderLine = this.$slider.find('.slider__line');
    this.rangeLine = new RangeLineView(this.$sliderLine);
    this.thumbFrom = new ThumbView('from', this.$sliderLine);
    this.thumbTo = new ThumbView('to', this.$sliderLine);
    this.inputValueFrom = new ValueInputView('from', this.$slider.find('.slider__values'));
    this.inputValueTo = new ValueInputView('to', this.$slider.find('.slider__values'));
  }

  /**
  * Родительский элемент
  */
  private $node: JQuery;

  /**
   * Разметка слайдера
   */
  private $slider: JQuery;

  /**
   * Линия слайдера, в которой содержаться бегунки
   */
  private $sliderLine: JQuery;

  /**
   * Инстанс инпута с модификатором "from"
   */
  private inputValueFrom: IValueInputView;

  /**
   * Инстанс инпута с модификатором "to"
   */
  private inputValueTo: IValueInputView;

  /**
   * Инстанс промежуточной линии
   */
  private rangeLine: IRangeLineView;

  /**
   * Инстанс бегунка с модификатором "from"
   */
  private thumbFrom: IThumbView;

  /**
   * Инстанс бегунка с модификатором "to"
   */
  private thumbTo: IThumbView;

  /**
   * Функция обработчика клика на линию слайдера
   * @param clickE click event
   */
  private onSliderLineClick(clickE: JQuery.ClickEvent) {
    if (clickE.target !== this.$sliderLine[0]) return;
    const width = this.getWidth();
    const { position } = this.getOptions();
    const offsetName = position === 'left' ? 'offsetX' : 'offsetY';
    let offset = clickE[offsetName];

    if (offset > width) offset = width;
    else if (offset < 0) offset = 0;

    let closestThumb = this.thumbFrom;
    if (this.isRange()) {
      const thumbsArray = [this.thumbTo, this.thumbFrom];
      const thumbsCoords = thumbsArray
        .map((thumb) => thumb.getCoord(position));
      const distances = thumbsCoords.map((coord) => Math.abs(offset - coord));
      closestThumb = thumbsArray[
        distances.findIndex((distance) => distance === Math.min(...distances))
      ];
    }

    closestThumb.setPosition(position, offset);

    this.emit('change-value', closestThumb);
  }

  /**
   * Отрисовка слайдера
   * @param state текущее состояние модели
   */
  render(state: IState) {
    this.$slider.appendTo(this.$node);
    this.$sliderLine.click(this.onSliderLineClick.bind(this));
    this.setOrientation(state.orientation);
    this.setRange(state.isRange);
    this.setShowValue(state.isShowValue);
    this.addWindowHandler();

    const thumbsArray = [this.thumbFrom, this.thumbTo];
    const inputsArray = [this.inputValueFrom, this.inputValueTo];

    thumbsArray.forEach((thumb) => {
      thumb.addDragNDropHandler(
        this.getOptions.bind(this),
        this.emit.bind(this),
        'change-value',
        this.getWidth.bind(this),
      );
    });

    inputsArray.forEach((input) => {
      input.addChangeHandler(
        this.emit.bind(this),
        'change-input-value',
      );
    });
  }

  /**
   * Расчет текущих значений бегунков слайдера
   */
  calcValues() {
    const thumbsArray = [this.thumbFrom, this.thumbTo];
    thumbsArray.forEach((thumb) => {
      this.emit('change-value', thumb);
    });
  }

  /**
   * Функция вешает обработчик события resize на window
   */
  addWindowHandler() {
    const thumbsArray = [this.thumbFrom, this.thumbTo];
    const that = this;

    const onWindowResize = function onWindowResizeHandler() {
      const { position } = that.getOptions();
      const width = that.getWidth();
      const thumbsPositions = thumbsArray.map((thumb) => thumb.getCoord(position));
      thumbsPositions.forEach((thumbPosition, index) => {
        if (thumbPosition > width) {
          thumbsArray[index].setPosition(position, width);
        }
      });
      that.calcValues();
    };

    $(window).resize(onWindowResize.bind(this));
  }

  /**
   * Возвращает инстанс бегунка по модификатору
   * @param modifier модификатор
   */
  getThumbByModifier(modifier: TModifier) {
    const thumbsArray = [this.thumbTo, this.thumbFrom];
    const thumbView = thumbsArray.filter((thumb) => thumb.getModifier() === modifier)[0];
    return thumbView;
  }

  /**
   * Возвращает инстанс инпута по модификатору
   * @param modifier модификатор
   */
  getInputByModifier(modifier: TModifier) {
    const inputsArray = [this.inputValueFrom, this.inputValueTo];
    const inputView = inputsArray.filter((input) => input.getModifier() === modifier)[0];
    return inputView;
  }

  /**
   * Устанавливает ориентацию слайдера
   * @param orientationState ориентация
   */
  setOrientation(orientationState: IState['orientation']) {
    const thumbsArray = [this.thumbFrom, this.thumbTo];
    const oldPos = this.getOptions().position;
    const thumbsCoord = thumbsArray.map((thumb) => thumb.getCoord(oldPos));

    const orientationClass = `slider--${orientationState}`;
    this.$slider.attr('class', `slider ${orientationClass}`);

    const newPos = this.getOptions().position;
    const width = this.getWidth();

    thumbsCoord.forEach((coord, index) => {
      if (coord > width) {
        thumbsCoord[index] = width;
      }
    });

    thumbsArray.forEach((thumb, index) => {
      thumb.setPosition(oldPos, 0);
      thumb.setPosition(newPos, thumbsCoord[index]);
    });

    this.rangeLine.setOrientation(oldPos, newPos);
    if (this.isRange()) this.resizeRangeLine();

    this.calcValues();
  }

  /**
   * Устанавливет промежуточное/одиночное значение слайдера
   * @param rangeState промежуточное, если true, одиночное, если false
   */
  setRange(rangeState: IState['isRange']) {
    const currentRangeState = this.isRange();
    if (currentRangeState !== rangeState) {
      if (rangeState) {
        this.thumbTo.appendToNode();
        this.rangeLine.appendToNode();
        this.inputValueTo.appendToNode();
        this.emit('render-range', { thumb: this.thumbTo, input: this.inputValueTo });
        this.resizeRangeLine();
      } else {
        this.thumbTo.removeFromDOM();
        this.inputValueTo.removeFromDOM();
        this.rangeLine.removeFromDOM();
      }
    }
  }

  /**
   * Возвращает true, если состояние слайдера промежуточное, false, если одиночное
   */
  isRange() {
    return this.thumbTo.isInDOM() && this.rangeLine.isInDOM();
  }

  /**
   * Устанавливает показ/скрытие значений бегунков
   * @param showValueState true, если показать, false, если скрыть
   */
  setShowValue(showValueState: IState['isShowValue']) {
    const currentShowValueState = this.thumbTo.isValueShowing()
    && this.thumbFrom.isValueShowing();

    if (currentShowValueState !== showValueState) {
      if (showValueState) {
        this.thumbFrom.showValue();
        this.thumbTo.showValue();
      } else {
        this.thumbFrom.hideValue();
        this.thumbTo.hideValue();
      }
    }
  }

  /**
   * Изменяет размер промежуточной линии слайдера, если this.isRange() === true
   */
  resizeRangeLine() {
    if (!this.isRange) return;
    const { position } = this.getOptions();
    const gap = this.thumbFrom.getWidth() / 2;
    let coordFrom = this.thumbFrom.getCoord(position);
    let coordTo = this.thumbTo.getCoord(position);

    if (coordFrom > coordTo) {
      const temp = coordFrom;
      coordFrom = coordTo;
      coordTo = temp;
    }

    this.rangeLine.setRangeLineSizeFromCoords(
      coordFrom,
      coordTo,
      gap,
      position,
    );
  }

  /**
   * Возвращает объект, с текущими опциями: имя позиции и ось
   */
  getOptions() {
    let clientAxis: ISliderOptions['clientAxis'];
    let position: ISliderOptions['position'];
    if (this.$slider.hasClass('slider--horizontal')) {
      clientAxis = 'clientX';
      position = 'left';
    } else {
      clientAxis = 'clientY';
      position = 'top';
    }

    const options = {
      clientAxis,
      position,
    };

    return options;
  }

  /**
   * Возвращает текущую длину слайдера с учетом ориентации
   */
  getWidth() {
    const { position } = this.getOptions();
    const prop = position === 'left' ? 'innerWidth' : 'innerHeight';
    const sliderLineWidth = this.$slider[prop]() || 0;
    const sliderLineGap = (this.$sliderLine.outerWidth() || 0)
                          - (this.$sliderLine.innerWidth() || 0);
    const innerWidth = Math.floor(sliderLineWidth - this.thumbFrom.getWidth() - sliderLineGap);

    return innerWidth;
  }
}

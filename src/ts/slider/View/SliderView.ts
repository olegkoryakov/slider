import RangeLineView from './RangeLineView';
import ThumbView from './ThumbView';
import EventEmitter from '../EventEmitter/EventEmitter';
import ValueInputView from './ValueInputView';

export default class SliderView extends EventEmitter implements ISliderView {
  constructor(node: JQuery) {
    super();
    this._node = node;
    this._slider = $('<div class="slider"><div class="slider__values"></div><div class="slider__line"></div></div>');
    this._sliderLine = this._slider.find('.slider__line');
    this._rangeLine = new RangeLineView(this._sliderLine);
    this._thumbFrom = new ThumbView('from', this._sliderLine);
    this._thumbTo = new ThumbView('to', this._sliderLine);
    this._inputValueFrom = new ValueInputView('from', this._slider.find('.slider__values'));
    this._inputValueTo = new ValueInputView('to', this._slider.find('.slider__values'));
  }

  _node: JQuery;

  _inputValueFrom: IValueInputView;

  _inputValueTo: IValueInputView;

  _rangeLine: IRangeLineView;

  _thumbFrom: IThumbView;

  _thumbTo: IThumbView;

  _slider: JQuery;

  _sliderLine: JQuery;

  render(state: IState) {
    this._slider.appendTo(this._node);
    this._sliderLine.click(this._onSliderLineClick.bind(this));
    this.setOrientation(state.orientation);
    this.setRange(state.isRange);
    this.setShowValue(state.isShowValue);
    this.addWindowHandler();

    const thumbsArray = [this._thumbFrom, this._thumbTo];
    const inputsArray = [this._inputValueFrom, this._inputValueTo];
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

  calcValues() {
    const thumbsArray = [this._thumbFrom, this._thumbTo];
    thumbsArray.forEach((thumb) => {
      this.emit('change-value', thumb);
    });
  }

  addWindowHandler() {
    const thumbsArray = [this._thumbFrom, this._thumbTo];
    const that = this;
    function onWindowResize() {
      const { position } = that.getOptions();
      const width = that.getWidth();
      const thumbsPositions = thumbsArray.map((thumb) => thumb.getCoord(position));
      thumbsPositions.forEach((thumbPosition, index) => {
        if (thumbPosition > width) {
          thumbsArray[index].setPosition(position, width);
        }
      });
      that.calcValues();
    }

    $(window).resize(onWindowResize.bind(this));
  }

  _onSliderLineClick(clickE: JQuery.ClickEvent) {
    if (clickE.target !== this._sliderLine[0]) return;
    const width = this.getWidth();
    const { position } = this.getOptions();
    const offsetName = position === 'left' ? 'offsetX' : 'offsetY';
    let offset = clickE[offsetName];

    if (offset > width) offset = width;
    else if (offset < 0) offset = 0;

    let closestThumb = this._thumbFrom;
    if (this.isRange()) {
      const thumbsArray = [this._thumbTo, this._thumbFrom];
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

  getThumbByModifier(modifier: TModifier) {
    const thumbsArray = [this._thumbTo, this._thumbFrom];
    const thumbView = thumbsArray.filter((thumb) => thumb.getModifier() === modifier)[0];
    return thumbView;
  }

  getInputByModifier(modifier: TModifier) {
    const inputsArray = [this._inputValueFrom, this._inputValueTo];
    const inputView = inputsArray.filter((input) => input.getModifier() === modifier)[0];
    return inputView;
  }

  setOrientation(orientationState: IState['orientation']) {
    const thumbsArray = [this._thumbFrom, this._thumbTo];
    const oldPos = this.getOptions().position;
    const thumbsCoord = thumbsArray.map((thumb) => thumb.getCoord(oldPos));

    const orientationClass = `slider--${orientationState}`;
    this._slider.attr('class', `slider ${orientationClass}`);

    const newPos = this.getOptions().position;
    const width = this.getWidth();
    let isCoordMoreThatWidth = false;
    thumbsCoord.forEach((coord, index) => {
      if (coord > width) {
        thumbsCoord[index] = width;
        isCoordMoreThatWidth = true;
      }
    });

    thumbsArray.forEach((thumb, index) => {
      thumb.setPosition(oldPos, 0);
      thumb.setPosition(newPos, thumbsCoord[index]);
    });

    this._rangeLine.setOrientation(oldPos, newPos);
    if (isCoordMoreThatWidth) {
      this.resizeRangeLine();
      this.calcValues();
    }
  }

  setRange(rangeState: IState['isRange']) {
    const currentRangeState = this.isRange();
    if (currentRangeState !== rangeState) {
      if (rangeState) {
        this._thumbTo.appendToNode();
        this._rangeLine.appendToNode();
        this._inputValueTo.appendToNode();
        this.emit('render-range', { thumb: this._thumbTo, input: this._inputValueTo });
        this.resizeRangeLine();
      } else {
        this._thumbTo.removeFromDOM();
        this._inputValueTo.removeFromDOM();
        this._rangeLine.removeFromDOM();
      }
    }
  }

  isRange() {
    return this._thumbTo.isInDOM() && this._rangeLine.isInDOM();
  }

  setShowValue(showValueState: IState['isShowValue']) {
    const currentShowValueState = this._thumbTo.isValueShowing()
    && this._thumbFrom.isValueShowing();

    if (currentShowValueState !== showValueState) {
      if (showValueState) {
        this._thumbFrom.showValue();
        this._thumbTo.showValue();
      } else {
        this._thumbFrom.hideValue();
        this._thumbTo.hideValue();
      }
    }
  }

  resizeRangeLine() {
    if (!this.isRange) return;
    const { position } = this.getOptions();
    const gap = this._thumbFrom.getWidth() / 2;
    let coordFrom = this._thumbFrom.getCoord(position);
    let coordTo = this._thumbTo.getCoord(position);

    if (coordFrom > coordTo) {
      const temp = coordFrom;
      coordFrom = coordTo;
      coordTo = temp;
    }

    this._rangeLine.setRangeLineSizeFromCoords(
      coordFrom,
      coordTo,
      gap,
      position,
    );
  }

  getOptions() {
    let clientAxis: ISliderOptions['clientAxis'];
    let position: ISliderOptions['position'];
    if (this._slider.hasClass('slider--horizontal')) {
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

  getWidth() {
    const { position } = this.getOptions();
    const prop = position === 'left' ? 'innerWidth' : 'innerHeight';
    const sliderLineWidth = this._slider[prop]() || 0;
    const sliderLineGap = (this._sliderLine.outerWidth() || 0)
                          - (this._sliderLine.innerWidth() || 0);
    const innerWidth = Math.floor(sliderLineWidth - this._thumbFrom.getWidth() - sliderLineGap);

    return innerWidth;
  }
}

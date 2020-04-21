import EventEmitter from './eventemitter';
import { getSliderHTML, getConfigPanelHTML } from './helpers';


export default class View extends EventEmitter implements IView {
  slider: JQuery;

  configPanel: JQuery;

  constructor() {
    super();
    this.slider = getSliderHTML();
    this.configPanel = getConfigPanelHTML();
    this.addDragNDropHandlers();
    this.addInputsChangeHandlers();
    this.addConfigPanelHandlers();
  }

  setSliderInitialState(state: IState) {
    const thumbTo = this.slider.find('.slider__thumb--to');
    const thumbFrom = this.slider.find('.slider__thumb--from');
    this.slider.addClass(`slider--${state.orientation}`);
    if (!state.isShowValue) {
      this.toggleShowValue();
    }
    if (!state.isRange) {
      this.toggleRange();
    }
    const options = this.getSliderOptions();
    const thumbs = [thumbTo, thumbFrom];
    thumbs.forEach((thumb) => {
      const thumbOptions: IThumbOptions = {
        coord: thumb.position()[options.position],
        thumb,
      };
      this.emit('change-value', thumbOptions);
    });
  }

  toggleOrientation() {
    this.slider.toggleClass('slider--horizontal slider--vertical');
    const thumbs = Array.from(this.slider.find('.slider__thumb'));
    const sliderLine = this.slider.find('.slider__range-line');
    const options = this.getSliderOptions();
    const currentPosition = options.position;
    const oldPosition = currentPosition === 'left' ? 'top' : 'left';

    thumbs.forEach((thumb) => {
      const thumbCoord = $(thumb).css(oldPosition);
      $(thumb).css({
        [currentPosition]: thumbCoord,
        [oldPosition]: 0,
      });
    });

    const sliderLineCoord = sliderLine.css(oldPosition);
    sliderLine.css({
      [currentPosition]: sliderLineCoord,
      [oldPosition]: '50%',
    });
  }

  toggleRange() {
    const inputTo = this.slider.find('.slider__input-value--to');
    const thumbTo = this.slider.find('.slider__thumb--to');
    const sliderRangeLine = this.slider.find('.slider__range-line');
    inputTo.toggleClass('hide');
    thumbTo.toggleClass('hide');
    sliderRangeLine.toggleClass('hide');
  }

  toggleShowValue() {
    const values = this.slider.find('.slider__value');
    values.toggleClass('hide');
  }

  getSliderWidth(): number {
    const sliderLine = this.slider.find('.slider__line');
    const thumb = this.slider.find('.slider__thumb');

    let width = 0;

    if (sliderLine && thumb) {
      const lineOuterWidth = sliderLine.outerWidth();
      const lineInnerWidth = sliderLine.innerWidth();
      const lineFlexBasis = parseInt(sliderLine.css('flex-basis').split('px')[0], 10);
      const thumbWidth = thumb.outerWidth();
      if (lineInnerWidth && lineOuterWidth && thumbWidth) {
        const lineGap = lineOuterWidth - lineInnerWidth;
        width = lineFlexBasis - thumbWidth - lineGap;
      }
    }

    return width;
  }

  getSliderOptions(): ISliderOptions {
    let options: ISliderOptions;

    if (this.slider.hasClass('slider--vertical')) {
      options = {
        position: 'top',
        clientAxis: 'clientY',
      };
    } else {
      options = {
        position: 'left',
        clientAxis: 'clientX',
      };
    }

    return options;
  }

  setSliderRangeLineCoords() {
    const sliderRangeLine = this.slider.find('.slider__range-line');
    const thumbs = this.slider.find('.slider__thumb');
    const options = this.getSliderOptions();
    const thumbsPos = Array.from(thumbs).map((thumb) => $(thumb).position()[options.position]);

    let thumbGap = 0;
    const thumbWidth = thumbs.outerWidth();
    if (typeof thumbWidth === 'number') thumbGap = thumbWidth / 2;

    const leftThumbCoord = Math.min(...thumbsPos) + thumbGap;
    const rightThumbCoord = Math.max(...thumbsPos) + thumbGap;

    const rangeLineWidth = rightThumbCoord - leftThumbCoord;

    if (rangeLineWidth > 0) {
      sliderRangeLine.css({
        'flex-basis': rangeLineWidth,
        [options.position]: leftThumbCoord,
      });
    } else {
      sliderRangeLine.css({
        'flex-basis': Math.abs(rangeLineWidth),
        [options.position]: rightThumbCoord,
      });
    }
  }

  setInputValue(value: string | number, modifier: string) {
    const input = this.slider.find(`.slider__input-value--${modifier}`);
    input.val(value);
  }

  // eslint-disable-next-line class-methods-use-this
  setThumbValue(thumb: JQuery, value: number | string) {
    thumb.find('.slider__value').text(value);
  }

  addConfigPanelHandlers() {
    const that = this;
    const buttons = that.configPanel.find('.config-panel__button');
    const inputs = that.configPanel.find('.config-panel__input');
    console.log(inputs);

    function onButtonClick(clickE: JQuery.ClickEvent) {
      const button = $(clickE.target);
      if (button.hasClass('config-panel__button--toggle-orientation')) that.emit('toggle-orientation', null);
      else if (button.hasClass('config-panel__button--toggle-range')) that.emit('toggle-range', null);
      else if (button.hasClass('config-panel__button--toggle-show-value')) that.emit('toggle-show-value', null);
    }

    function onInputChange(changeE: JQuery.ChangeEvent) {
      const input = $(changeE.target);
      const inputValue = input.val();

      if (inputValue === undefined) return;

      if (input.hasClass('config-panel__input--values')) that.emit('set-values', inputValue);
      else if (input.hasClass('config-panel__input--step') && !(inputValue instanceof Array)) that.emit('set-step', inputValue);
    }

    inputs.change(onInputChange.bind(that));
    buttons.click(onButtonClick.bind(that));
  }

  addInputsChangeHandlers() {
    const inputs = this.slider.find('.slider__input-value');
    const that = this;

    function onInputChange(changeE: JQuery.ChangeEvent) {
      const input = $(changeE.target);

      if (!input.hasClass('slider__input-value')) return;

      const inputValue = input.val();

      if (typeof inputValue === 'string' && inputValue !== '') {
        let thumbOptions: IThumbOptions;
        if (input.hasClass('slider__input-value--from')) {
          thumbOptions = {
            thumb: that.slider.find('.slider__thumb--from'),
            value: inputValue,
          };
        } else {
          thumbOptions = {
            thumb: that.slider.find('.slider__thumb--to'),
            value: inputValue,
          };
        }
        that.emit('change-coord', thumbOptions);
      }
    }

    inputs.change(onInputChange.bind(that));
  }

  addDragNDropHandlers() {
    const that = this;
    const thumbs = that.slider.find('.slider__thumb');

    function onThumbMouseDown(downE: JQuery.MouseDownEvent) {
      const thumb = $(downE.target);
      if (!thumb.hasClass('slider__thumb')) return;
      const width = that.getSliderWidth();
      const zIndex = parseInt(thumb.css('z-index'), 10);
      const options = that.getSliderOptions();

      let startCoord = downE[options.clientAxis];

      thumb.css('z-index', zIndex + 1);
      function onMouseMove(moveE: JQuery.MouseMoveEvent) {
        const shift = startCoord - moveE[options.clientAxis];
        let newCoord = thumb.position()[options.position] - shift;
        startCoord = moveE[options.clientAxis];

        if (newCoord > width) newCoord = width;
        else if (newCoord < 0) newCoord = 0;
        that.setSliderRangeLineCoords();
        const thumbOptions: IThumbOptions = {
          coord: Math.round(newCoord),
          thumb,
        };
        that.emit('change-value', thumbOptions);
        thumb.css(options.position, newCoord);
      }

      const bindedOnMouseMove = onMouseMove.bind(that);

      function onMouseUp() {
        thumb.css('z-index', zIndex);
        $(document).unbind('mousemove', bindedOnMouseMove);
        $(document).unbind('mouseup', onMouseUp);
      }

      $(document).mousemove(bindedOnMouseMove);
      $(document).mouseup(onMouseUp);
    }
    const bindedOnThumbMouseDown = onThumbMouseDown.bind(that);
    thumbs.mousedown(bindedOnThumbMouseDown);
  }
}

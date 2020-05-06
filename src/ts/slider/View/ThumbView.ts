export default class ThumbView implements IThumbView {
  constructor(modifier: TModifier, parentNode: JQuery) {
    this._modifier = modifier;
    this._thumb = $(`<div class="slider__thumb slider__thumb--${this._modifier}"><div class="slider__value"></div></div>`);
    this._node = parentNode;
    this.appendToNode();
  }

  _node: JQuery;

  _thumb: JQuery;

  _modifier: TModifier;

  appendToNode() {
    this._thumb.appendTo(this._node);
  }

  isInDOM() {
    const flag = this._node.find(this._thumb).length > 0;
    return flag;
  }

  removeFromDOM() {
    this._thumb.detach();
  }

  setValue(value: string | number) {
    this._thumb.find('.slider__value').text(value);
  }

  setPosition(position: ISliderOptions['position'], coord: number) {
    this._thumb.css(position, coord);
  }

  getCoord(position: ISliderOptions['position']): number {
    return Math.round(this._thumb.position()[position]);
  }

  getModifier() {
    return this._modifier;
  }

  hideValue() {
    const thumbValue = this._thumb.find('.slider__value');
    thumbValue.hide(100, 'linear');
  }

  showValue() {
    const thumbValue = this._thumb.find('.slider__value');
    thumbValue.show(100, 'linear');
  }

  isValueShowing() {
    const thumbValue = this._thumb.find('.slider__value');
    return thumbValue.css('display') !== 'none';
  }

  getWidth() {
    const width = this._thumb.outerWidth() || 0;
    return width;
  }

  addDragNDropHandler(
    getOptionsCallback: Function,
    emitCallback: Function,
    emitCallbackType: string,
    getWidthCallback: Function,
  ) {
    const thumb = this._thumb;
    const that = this;

    function onThumbMouseDown(downE: JQuery.MouseDownEvent) {
      const width: number = getWidthCallback();
      const zIndex = parseInt(thumb.css('z-index'), 10);
      const options: ISliderOptions = getOptionsCallback();
      let startCoord = downE[options.clientAxis];

      thumb.css('z-index', zIndex + 1);

      function onMouseMove(moveE: JQuery.MouseMoveEvent) {
        const shift = startCoord - moveE[options.clientAxis];
        let newCoord = Math.round(thumb.position()[options.position] - shift);
        startCoord = moveE[options.clientAxis];

        if (newCoord > width) newCoord = width;
        else if (newCoord < 0) newCoord = 0;
        emitCallback(emitCallbackType, that);
        that.setPosition(options.position, newCoord);
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
    thumb.mousedown(bindedOnThumbMouseDown);
  }
}

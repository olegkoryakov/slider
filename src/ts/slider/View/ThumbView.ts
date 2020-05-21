export default class ThumbView implements IThumbView {
  constructor(modifier: TModifier, parentNode: JQuery) {
    this.modifier = modifier;
    this.$thumb = $(`<div class="slider__thumb slider__thumb--${this.modifier}"><div class="slider__value"></div></div>`);
    this.$node = parentNode;
    this.appendToNode();
  }

  private $node: JQuery;

  private $thumb: JQuery;

  private modifier: TModifier;

  appendToNode() {
    this.$thumb.appendTo(this.$node);
  }

  isInDOM() {
    const isInDOM = this.$node.find(this.$thumb).length > 0;
    return isInDOM;
  }

  removeFromDOM() {
    this.$thumb.detach();
  }

  setValue(value: string | number) {
    this.$thumb.find('.slider__value').text(value);
  }

  setPosition(position: ISliderOptions['position'], coord: number) {
    this.$thumb.css(position, coord);
  }

  getCoord(position: ISliderOptions['position']): number {
    return Math.round(this.$thumb.position()[position]);
  }

  getModifier() {
    return this.modifier;
  }

  hideValue() {
    const thumbValue = this.$thumb.find('.slider__value');
    thumbValue.hide(100, 'linear');
  }

  showValue() {
    const thumbValue = this.$thumb.find('.slider__value');
    thumbValue.show(100, 'linear');
  }

  isValueShowing() {
    const thumbValue = this.$thumb.find('.slider__value');
    return thumbValue.css('display') !== 'none';
  }

  getWidth() {
    const width = this.$thumb.outerWidth() || 0;
    return width;
  }

  addDragNDropHandler(
    getOptionsCallback: Function,
    emitCallback: Function,
    emitCallbackType: string,
    getWidthCallback: Function,
  ) {
    const { $thumb } = this;
    const that = this;

    const onThumbMouseDown = function onThumbMouseDownHandler(downE: JQuery.MouseDownEvent) {
      const width: number = getWidthCallback();
      const zIndex = parseInt($thumb.css('z-index'), 10);
      const options: ISliderOptions = getOptionsCallback();
      let startCoord = downE[options.clientAxis];

      $thumb.css('z-index', zIndex + 1);
      $thumb.css('user-select', 'none');

      const onMouseMove = function onDocumentMouseMoveHandler(moveE: JQuery.MouseMoveEvent) {
        const shift = startCoord - moveE[options.clientAxis];
        let newCoord = Math.round($thumb.position()[options.position] - shift);
        startCoord = moveE[options.clientAxis];

        if (newCoord > width) newCoord = width;
        else if (newCoord < 0) newCoord = 0;
        emitCallback(emitCallbackType, that);
        that.setPosition(options.position, newCoord);
      };

      const bindedOnMouseMove = onMouseMove.bind(that);

      function onMouseUp() {
        $thumb.css('z-index', zIndex);
        $thumb.css('user-select', '');
        $(document).unbind('mousemove', bindedOnMouseMove);
        $(document).unbind('mouseup', onMouseUp);
      }

      $(document).mousemove(bindedOnMouseMove);
      $(document).mouseup(onMouseUp);
    };

    const bindedOnThumbMouseDown = onThumbMouseDown.bind(that);
    $thumb.mousedown(bindedOnThumbMouseDown);
  }
}

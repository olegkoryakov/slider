export default class RangeLineView implements IRangeLineView {
  constructor(parentNode: JQuery) {
    this.$rangeLine = $('<div class="slider__range-line"></div>');
    this.$node = parentNode;
    this.appendToNode();
  }

  private $rangeLine: JQuery;

  private $node: JQuery

  appendToNode() {
    this.$rangeLine.appendTo(this.$node);
  }

  removeFromDOM() {
    this.$rangeLine.remove();
  }

  isInDOM() {
    const isInDOM = this.$node.find(this.$rangeLine).length > 0;
    return isInDOM;
  }

  setOrientation(
    oldPos: ISliderOptions['position'],
    newPos: ISliderOptions['position'],
  ) {
    const coord = this.$rangeLine.css(oldPos) || 0;
    this.$rangeLine.css({
      [oldPos]: '50%',
      [newPos]: coord,
    });
  }

  setRangeLineSizeFromCoords(
    coordFrom: number,
    coordTo: number,
    gap: number,
    position: ISliderOptions['position'],
  ) {
    const rangeLineWidth = coordTo - coordFrom;

    this.$rangeLine.css({
      'flex-basis': rangeLineWidth,
      [position]: coordFrom + gap,
    });
  }
}

export default class RangeLineView implements IRangeLineView {
  constructor(parentNode: JQuery) {
    this._rangeLine = $('<div class="slider__range-line"></div>');
    this._node = parentNode;
    this.appendToNode();
  }

  _rangeLine: JQuery;

  _node: JQuery

  appendToNode() {
    this._rangeLine.appendTo(this._node);
  }

  removeFromDOM() {
    this._rangeLine.remove();
  }

  isInDOM() {
    const flag = this._node.find(this._rangeLine).length > 0;
    return flag;
  }

  setOrientation(
    oldPos: ISliderOptions['position'],
    newPos: ISliderOptions['position'],
  ) {
    const coord = this._rangeLine.css(oldPos) || 0;
    this._rangeLine.css({
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

    this._rangeLine.css({
      'flex-basis': rangeLineWidth,
      [position]: coordFrom + gap,
    });
  }
}

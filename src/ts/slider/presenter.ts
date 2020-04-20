import { getModifier } from './helpers';

export default class Presenter {
  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;
    this.view.on('change-value', this.setThumbValue.bind(this));
    this.view.on('change-coord', this.setThumbCoord.bind(this));
  }

  view: IView;

  model: IModel;

  renderSlider(parentElement: JQuery) {
    const state = this.model.getState();
    parentElement.append(this.view.slider);
    this.view.setSliderInitialState(state);
  }

  setThumbValue(thumbOptions: IThumbOptions) {
    if (thumbOptions.coord === undefined) return;

    const values = this.model.getValues();
    const value = this.convertCoordInValue(thumbOptions.coord);

    let returnableValue: string | number;

    if (values instanceof Array) {
      returnableValue = values[value];
    } else {
      returnableValue = value;
    }

    const modifier = getModifier(thumbOptions.thumb);
    if (modifier !== undefined) this.view.setInputValue(returnableValue, modifier);
    this.view.setThumbValue(thumbOptions.thumb, returnableValue);
  }

  setThumbCoord(thumbOptions: IThumbOptions) {
    if (thumbOptions.value === undefined) return;

    const sliderPosition = this.view.getSliderOptions().position;
    const { value, thumb } = thumbOptions;
    const valuesRange = this.model.getRangeValues();
    const values = this.model.getValues();

    let valueToSet = value;
    let coord: number;
    const modifier = getModifier(thumb);

    if (values instanceof Array) {
      const isValueInValuesRange = values.some((val) => val === value);
      if (isValueInValuesRange) {
        const index = values.findIndex((val) => val === value);
        coord = this.convertValueInCoord(index);
        valueToSet = value;
      } else {
        coord = 0;
        valueToSet = values[valuesRange.min];
      }
    } else {
      if (typeof valueToSet !== 'number') valueToSet = parseInt(valueToSet, 10);
      if (Number.isNaN(valueToSet) || valueToSet < valuesRange.min) valueToSet = valuesRange.min;
      if (valueToSet > valuesRange.max) valueToSet = valuesRange.max;
      coord = this.convertValueInCoord(valueToSet);
    }

    thumb.css(sliderPosition, coord);
    this.view.setThumbValue(thumb, valueToSet);
    if (modifier !== undefined) this.view.setInputValue(valueToSet, modifier);

    this.view.setSliderRangeLineCoords();
  }

  convertValueInCoord(value: number): number {
    const valuesRange = this.model.getRangeValues();
    const width = this.view.getSliderWidth();

    let coord = width * (value / (valuesRange.max - valuesRange.min));
    if (coord > width) coord = width;
    if (coord < 0) coord = 0;

    return coord;
  }

  convertCoordInValue(coord: number): number {
    const step = this.model.getStep();
    const valuesRange = this.model.getRangeValues();
    const width = this.view.getSliderWidth();

    let value = ((valuesRange.max - valuesRange.min) * (coord / width)) + valuesRange.min;
    value = Math.floor(value / step) * step;

    if (value >= valuesRange.max || coord >= width) value = valuesRange.max;
    else if (value <= valuesRange.min) value = valuesRange.min;
    return value;
  }
}

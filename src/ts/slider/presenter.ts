import { getModifier } from './helpers';

export default class Presenter {
  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;
    this.view.on('change-value', this.setThumbValue.bind(this));
    this.view.on('change-coord', this.setThumbCoord.bind(this));
    this.view.on('toggle-orientation', this.toggleOrientation.bind(this));
    this.view.on('toggle-show-value', this.toggleShowValue.bind(this));
    this.view.on('toggle-range', this.toggleRange.bind(this));
    this.view.on('set-step', this.setStep.bind(this));
    this.view.on('set-values', this.setValues.bind(this));
  }

  view: IView;

  model: IModel;

  renderSlider(parentElement: JQuery) {
    const state = this.model.getState();
    parentElement.append(this.view.slider);
    this.view.setSliderInitialState(state);
  }

  toggleOrientation() {
    this.view.toggleOrientation();
    this.model.toggleOrientation();
  }

  toggleShowValue() {
    this.model.toggleShowValue();
    this.view.toggleShowValue();
  }

  toggleRange() {
    this.model.toggleRange();
    this.view.toggleRange();
  }

  setValues(inputValue: string | string[]) {
    if (inputValue instanceof Array) {
      this.model.setValues(inputValue);
    } else {
      const regExp = new RegExp(',?\\s');
      const valuesArray = inputValue.trim().split(regExp);
      if (valuesArray.length === 2) {
        const from = parseInt(valuesArray[0], 10);
        const to = parseInt(valuesArray[1], 10);
        if (!Number.isNaN(from) && !Number.isNaN(to)) {
          this.model.setValues({ from, to });
        }
      } else if (valuesArray.length > 2) {
        this.model.setValues(valuesArray);
      } else if (valuesArray.length === 1) {
        const value = parseInt(valuesArray[0], 10);
        if (!Number.isNaN(value)) this.model.setValues({ from: 0, to: value });
      }
    }
  }

  setStep(inputValue: string | number) {
    let value: number;
    if (typeof inputValue !== 'number') value = parseInt(inputValue, 10);
    else value = inputValue;
    if (Number.isNaN(value)) return;
    this.model.setStep(value);
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

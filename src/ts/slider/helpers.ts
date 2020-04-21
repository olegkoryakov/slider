function getModifier(element: JQuery): string | undefined {
  const classList = element.attr('class');
  if (classList !== undefined) {
    return classList.split('--')[1];
  }
  return undefined;
}

function getSliderHTML() {
  return $(`<div class="slider">
              <div class="slider__values">
                <input type="text" class="slider__input-value slider__input-value--from">
                <input type="text" class="slider__input-value slider__input-value--to">
              </div>
              <div class="slider__line">
              <div class="slider__thumb slider__thumb--from">
                <div class="slider__value"></div>
              </div>
              <div class="slider__thumb slider__thumb--to">
                <div class="slider__value"></div>
              </div>
              <div class="slider__range-line"></div>
              </div>
            </div>`);
}
function getConfigPanelHTML() {
  return $(`<div class="config-panel">
              <input type="text" placeholder="Enter values range/values array" class="config-panel__input config-panel__input--values">
              <input type="text" placeholder="Enter step" class="config-panel__input config-panel__input--step">
              <button class="config-panel__button config-panel__button--toggle-orientation" type="button">Toggle orientation</button>
              <button class="config-panel__button config-panel__button--toggle-show-value" type="button">Toggle show value</button>
              <button class="config-panel__button config-panel__button--toggle-range" type="button">Toggle range</button>
            </div>`);
}
export { getModifier, getSliderHTML, getConfigPanelHTML };

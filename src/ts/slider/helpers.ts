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

export { getModifier, getSliderHTML };

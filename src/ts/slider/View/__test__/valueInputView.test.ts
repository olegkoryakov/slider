import ValueInputView from '../ValueInputView';

let valueInputView: IValueInputView;
const parentElement = $('<div></div>');
const modifier = 'from';

describe('ValueInputView', () => {
  beforeEach(() => {
    valueInputView = new ValueInputView(modifier, parentElement);
  });

  test('removeFromDOM', () => {
    valueInputView.removeFromDOM();
    const isInDOM = parentElement.find('.slider__input-value').length > 0;
    expect(isInDOM).toBe(false);
  });

  test('setValue, getValue', () => {
    const testValue = 'asdasd';

    valueInputView.setValue(testValue);
    const value = valueInputView.getValue();

    expect(value).toBe(testValue);
  });

  test('getModifier', () => {
    expect(valueInputView.getModifier()).toBe(modifier);
  });
});

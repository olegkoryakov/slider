import ValueInputView from '../ValueInputView';

const parentElement = $('<div></div>');
const modifier = 'from';

let valueInputView: IValueInputView;
let callbackFn: any;

describe('ValueInputView', () => {
  beforeEach(() => {
    valueInputView = new ValueInputView(modifier, parentElement);
    callbackFn = jest.fn();
    valueInputView.addChangeHandler(callbackFn, 'type');
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

  test('input change event test', () => {
    // @ts-ignore
    const { $valueInput } = valueInputView;
    $valueInput.trigger('change');
    expect(callbackFn).toBeCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith('type', valueInputView);
  });
});

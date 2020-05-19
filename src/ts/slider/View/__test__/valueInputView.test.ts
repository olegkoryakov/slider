import ValueInputView from '../ValueInputView';

interface IExtendedValueInputView extends IValueInputView {
  getInput(): JQuery;
}
const parentElement = $('<div></div>');
const modifier = 'from';

class ExtendedValueInputView extends ValueInputView implements IExtendedValueInputView {
  constructor() {
    super(modifier, parentElement);
  }

  getInput() {
    return this._valueInput;
  }
}

let valueInputView: IExtendedValueInputView;
let callbackFn: any;

describe('ValueInputView', () => {
  beforeEach(() => {
    valueInputView = new ExtendedValueInputView();
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

  test('handel', () => {
    const input = valueInputView.getInput();
    input.trigger('change');
    expect(callbackFn).toBeCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith('type', valueInputView);
  });
});

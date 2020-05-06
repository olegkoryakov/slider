export default class ValueInputView implements IValueInputView {
  constructor(modifier: TModifier, parentNode: JQuery) {
    this._valueInput = $(`<input type="text" class="slider__input-value slider__input-value--${modifier}">`);
    this._modifier = modifier;
    this._node = parentNode;
    this.appendToNode();
  }

  _node: JQuery;

  _valueInput: JQuery;

  _modifier: TModifier;

  appendToNode() {
    this._valueInput.appendTo(this._node);
  }

  removeFromDOM() {
    this._valueInput.detach();
  }

  setValue(value: number | string) {
    this._valueInput.val(value);
  }

  getValue(): string {
    const input = this._valueInput[0];
    let value = '';
    if (input instanceof HTMLInputElement) {
      value = input.value;
    }
    return value;
  }

  getModifier() {
    return this._modifier;
  }

  addChangeHandler(
    emitCallback: Function,
    emitCallbackType: string,
  ) {
    const input = this._valueInput;
    const that = this;

    function onValueInputChange() {
      emitCallback(emitCallbackType, that);
    }

    input.change(onValueInputChange.bind(that));
  }
}

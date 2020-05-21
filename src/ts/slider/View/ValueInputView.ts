export default class ValueInputView implements IValueInputView {
  constructor(modifier: TModifier, parentNode: JQuery) {
    this.$valueInput = $(`<input type="text" class="slider__input-value slider__input-value--${modifier}">`);
    this.modifier = modifier;
    this.$node = parentNode;
    this.appendToNode();
  }

  private $node: JQuery;

  private $valueInput: JQuery;

  private modifier: TModifier;

  appendToNode() {
    this.$valueInput.appendTo(this.$node);
  }

  removeFromDOM() {
    this.$valueInput.detach();
  }

  setValue(value: number | string) {
    this.$valueInput.val(value);
  }

  getValue(): string {
    const input = this.$valueInput[0];
    let value = '';
    if (input instanceof HTMLInputElement) {
      value = input.value;
    }
    return value;
  }

  getModifier() {
    return this.modifier;
  }

  addChangeHandler(
    emitCallback: Function,
    emitCallbackType: string,
  ) {
    const input = this.$valueInput;
    const that = this;

    const onValueInputChange = function onValueInputChangeHandler() {
      emitCallback(emitCallbackType, that);
    };

    input.change(onValueInputChange.bind(that));
  }
}

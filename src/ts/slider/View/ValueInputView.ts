/**
 * Представление компонента поля со значением слайдера
 */
export default class ValueInputView implements IValueInputView {
  /**
   * Записываеет свойства и вставляет разметку поля воода в родительский элемент
   * @param modifier Модификатор
   * @param parentNode Родительский элемент
   */
  constructor(modifier: TModifier, parentNode: JQuery) {
    this.$valueInput = $(`<input type="text" class="slider__input-value slider__input-value_${modifier}">`);
    this.modifier = modifier;
    this.$node = parentNode;
    this.appendToNode();
  }

  /**
   * Родительский элемент
   */
  private $node: JQuery;

  /**
   * Разметка поля ввода значения
   */
  private $valueInput: JQuery;

  /**
   * Модификатор
   */
  private modifier: TModifier;

  /**
   * Вставляет разметку в родительский элемент
   */
  appendToNode() {
    this.$valueInput.appendTo(this.$node);
  }

  /**
   * Убирает разметку поля ввода из родительского элемента
   */
  removeFromDOM() {
    this.$valueInput.detach();
  }

  /**
   * Устанавливает значение поля ввода
   * @param value Значаение
   */
  setValue(value: number | string) {
    this.$valueInput.val(value);
  }

  /**
   * Возвращает значение поля ввода
   */
  getValue(): string {
    const input = this.$valueInput[0];
    let value = '';
    if (input instanceof HTMLInputElement) {
      value = input.value;
    }
    return value;
  }

  /**
   * Возвращает модификатор класса
   */
  getModifier() {
    return this.modifier;
  }

  /**
   * Добавляет обработчик события change на поле ввода
   */
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

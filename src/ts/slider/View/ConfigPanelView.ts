import EventEmitter from '../EventEmitter/EventEmitter';
/**
 * Представление конфигурационной панели слайдера
 */
export default class ConfigPanelView extends EventEmitter implements IConfigPanelView {
  /**
   * Записывает разметку в $configPanel
   * Добавляет обработчики событий к кнопкам и инпутам
   * Отрисовывает в родительском элементе
   * @param node Родительский элемент
   */
  constructor(node: JQuery) {
    super();
    this.$configPanel = $(`<div class="config-panel">
                            <input type="text" placeholder="Enter values range/values array" class="config-panel__input config-panel__input_values">
                            <input type="text" placeholder="Enter step" class="config-panel__input config-panel__input_step">
                            <button class="config-panel__button config-panel__button_orientation" type="button">Toggle orientation</button>
                            <button class="config-panel__button config-panel__button_show-values" type="button">Toggle show value</button>
                            <button class="config-panel__button config-panel__button_range-state" type="button">Toggle range</button>
                          </div>`);
    this.addConfigPanelHandlers();
    node.append(this.$configPanel);
  }

  /**
   * Свойство, хранящее разметку панели
   */
  private $configPanel: JQuery;

  /**
   * Добавляет обработчики событий на кнопки и инпуты
   */
  addConfigPanelHandlers() {
    const that = this;
    const buttons = this.$configPanel.find('.config-panel__button');
    const inputs = this.$configPanel.find('.config-panel__input');
    const prefix = 'change';

    const getCallbackType = function getCallbackTypeFromClassList(
      classList: DOMTokenList,
      elementName: string,
    ) {
      let separator = '';
      if (elementName === 'button') {
        separator = 'config-panel__button_';
      } else if (elementName === 'input') {
        separator = 'config-panel__input_';
      }
      const array = Array.from(classList);
      const callbackType = array.join('').split(separator)[1];
      return callbackType;
    };

    const onButtonClick = function onButtonClickHandler(clickE: JQuery.ClickEvent) {
      const callbackType: string = getCallbackType(clickE.target.classList, 'button');
      that.emit(`${prefix}-${callbackType}`, null);
    };

    const onInputChange = function onInputChangeHandler(changeE: JQuery.ChangeEvent) {
      const input = changeE.target;
      const { value } = input;
      const callbackType = getCallbackType(changeE.target.classList, 'input');

      if (callbackType === 'step') {
        let step = parseInt(value, 10);
        if (Number.isNaN(step) || step < 0) step = 1;
        that.emit(`${prefix}-${callbackType}`, step);
      } else if (callbackType === 'values') {
        const regExp = new RegExp(',?\\s');
        const values = value.split(regExp);
        that.emit(`${prefix}-${callbackType}`, values);
      }
    };

    buttons.click(onButtonClick.bind(this));
    inputs.change(onInputChange.bind(this));
  }
}

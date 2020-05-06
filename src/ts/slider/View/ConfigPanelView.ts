import EventEmitter from '../EventEmitter/EventEmitter';

export default class ConfigPanelView extends EventEmitter implements IConfigPanelView {
  constructor(node: JQuery, callbackPrefix: string) {
    super();
    this._callbackPrefix = callbackPrefix;
    this._configPanel = $(`<div class="config-panel"><input type="text" placeholder="Enter values range/values array" class="config-panel__input config-panel__input--values">
                            <input type="text" placeholder="Enter step" class="config-panel__input config-panel__input--step">
                            <button class="config-panel__button config-panel__button--orientation" type="button">Toggle orientation</button>
                            <button class="config-panel__button config-panel__button--show-values" type="button">Toggle show value</button>
                            <button class="config-panel__button config-panel__button--range-state" type="button">Toggle range</button>
                          </div>`);
    this.addConfigPanelHandlers();
    node.append(this._configPanel);
  }

  _configPanel: JQuery;

  _callbackPrefix: string;

  addConfigPanelHandlers() {
    const that = this;
    const buttons = this._configPanel.find('.config-panel__button');
    const inputs = this._configPanel.find('.config-panel__input');
    const prefix = this._callbackPrefix;

    function getCallbackType(classList: DOMTokenList) {
      const array = Array.from(classList);
      return array.join('').split('--')[1];
    }

    function onButtonClick(clickE: JQuery.ClickEvent) {
      const callbackType: string = getCallbackType(clickE.target.classList);
      that.emit(`${prefix}-${callbackType}`, null);
    }

    function onInputChange(changeE: JQuery.ChangeEvent) {
      const input = changeE.target;
      if (!(input instanceof HTMLInputElement)) return;
      const { value } = input;
      const callbackType = getCallbackType(changeE.target.classList);

      if (callbackType === 'step') {
        let step = parseInt(value, 10);
        if (Number.isNaN(step)) step = 1;
        that.emit(`${prefix}-${callbackType}`, step);
      } else if (callbackType === 'values') {
        const regExp = new RegExp(',?\\s');
        const values = value.split(regExp);
        that.emit(`${prefix}-${callbackType}`, values);
      }
    }

    buttons.click(onButtonClick.bind(this));
    inputs.change(onInputChange.bind(this));
  }
}

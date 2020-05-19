import ConfigPanelView from '../ConfigPanelView';

interface IExtendedConfigPanelView extends IConfigPanelView {
  getHTML(): JQuery;
}

const parentNode = $('<div></div>');

class ExtendedConfigPanelView extends ConfigPanelView implements IExtendedConfigPanelView {
  constructor() {
    super(parentNode, 'change');
  }

  getHTML() {
    return this._configPanel;
  }
}
let configPanelView: ExtendedConfigPanelView;
let configPanelHTML: JQuery;

describe('ConfigPanelView', () => {
  beforeAll(() => {
    configPanelView = new ExtendedConfigPanelView();
    configPanelHTML = configPanelView.getHTML();
    configPanelView.addConfigPanelHandlers();
  });

  beforeEach(() => {
    configPanelView.emit = jest.fn();
  });

  test('should append to node', () => {
    expect(parentNode.find('.config-panel').length === 1).toBeTruthy();
  });

  test('orientation button click test', () => {
    const orientationButton = configPanelHTML.find('.config-panel__button--orientation');
    orientationButton.trigger('click');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-orientation', null);
  });

  test('orientation button click test', () => {
    const showValueButton = configPanelHTML.find('.config-panel__button--show-values');
    showValueButton.trigger('click');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-show-values', null);
  });

  test('range state button click test', () => {
    const rangeStateButton = configPanelHTML.find('.config-panel__button--range-state');
    rangeStateButton.trigger('click');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-range-state', null);
  });

  test('input values change test', () => {
    const valuesArr = ['1', '2', '3', '4'];
    const inputValues = configPanelHTML.find('.config-panel__input--values');
    inputValues.val(valuesArr.join(' '));
    inputValues.trigger('change');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-values', valuesArr);
  });

  test('input step change test', () => {
    let step = '5';
    const inputStep = configPanelHTML.find('.config-panel__input--step');
    inputStep.val(step);
    inputStep.trigger('change');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-step', parseInt(step, 10));

    step = 'asdfasd';
    inputStep.val(step);
    inputStep.trigger('change');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-step', 1);
  });
});

import ConfigPanelView from '../ConfigPanelView';

const parentNode = $('<div><div>');
let configPanelView: IConfigPanelView;
let $configPanel: JQuery;

describe('ConfigPanelView', () => {
  beforeAll(() => {
    configPanelView = new ConfigPanelView(parentNode);
    // @ts-ignore
    $configPanel = configPanelView.$configPanel;
    configPanelView.addConfigPanelHandlers();
  });

  beforeEach(() => {
    configPanelView.emit = jest.fn();
  });

  test('should append to node', () => {
    expect(parentNode.find('.config-panel').length === 1).toBeTruthy();
  });

  test('orientation button click test', () => {
    const orientationButton = $configPanel.find('.config-panel__button--orientation');
    orientationButton.trigger('click');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-orientation', null);
  });

  test('show-values button click test', () => {
    const showValueButton = $configPanel.find('.config-panel__button--show-values');
    showValueButton.trigger('click');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-show-values', null);
  });

  test('range state button click test', () => {
    const rangeStateButton = $configPanel.find('.config-panel__button--range-state');
    rangeStateButton.trigger('click');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-range-state', null);
  });

  test('input values change test', () => {
    const valuesArr = ['1', '2', '3', '4'];
    const inputValues = $configPanel.find('.config-panel__input--values');
    inputValues.val(valuesArr.join(' '));
    inputValues.trigger('change');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-values', valuesArr);
  });

  test('input step change test', () => {
    let step = '5';
    const inputStep = $configPanel.find('.config-panel__input--step');
    inputStep.val(step);
    inputStep.trigger('change');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-step', parseInt(step, 10));

    step = 'asdfasd';
    inputStep.val(step);
    inputStep.trigger('change');
    expect(configPanelView.emit).toHaveBeenCalledWith('change-step', 1);
  });
});

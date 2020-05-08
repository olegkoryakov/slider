import ConfigPanelView from '../ConfigPanelView';

let configPanelView: IConfigPanelView;

const parentNode = $('<div></div>');

describe('ConfigPanelView', () => {
  beforeEach(() => {
    configPanelView = new ConfigPanelView(parentNode, 'change');
    configPanelView.addConfigPanelHandlers();
  });

  test('should append to node', () => {
    expect(parentNode.find('.config-panel').length === 1).toBeTruthy();
  });
});

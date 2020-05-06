import Presenter from './slider/Presenter/Presenter';
import Model from './slider/Model/Model';
import SliderView from './slider/View/SliderView';
import ConfigPanelView from './slider/View/ConfigPanelView';

const parentElement = $('.wrapper');

const model = new Model(
  'horizontal',
  true,
  true,
  1,
  { from: 1, to: 100 },
);
const sliderView = new SliderView(parentElement);
const configPanel = new ConfigPanelView(parentElement, 'change');

const presenter = new Presenter(configPanel, sliderView, model);
presenter.renderApp();

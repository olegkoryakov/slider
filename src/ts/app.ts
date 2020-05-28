import Presenter from './slider/Presenter/Presenter';
import Model from './slider/Model/Model';
import SliderView from './slider/View/SliderView';
import ConfigPanelView from './slider/View/ConfigPanelView';

const defaults: IOptions = {
  orientation: 'horizontal',
  isShowValue: true,
  isRange: true,
  step: 1,
  values: { from: 1, to: 100 },
};

let presenter: IPresenter;

let methods: IMethods = {};

// eslint-disable-next-line no-param-reassign
$.fn.slider = function (param: string | IOptions, arg?: string | string[]) {
  const element = this.first();
  $.fn.extend({ presenter, methods });
  if (param instanceof Object && !arg) {
    const configPanelView = new ConfigPanelView(element);
    const sliderView = new SliderView(element);
    const model = new Model(
      param.orientation,
      param.isRange,
      param.isShowValue,
      param.step,
      param.values,
    );
    presenter = new Presenter(
      configPanelView,
      sliderView,
      model,
    );

    presenter.renderApp();
    methods = {
      changeOrientation: presenter.changeOrientation.bind(presenter),
      changeShowValues: presenter.changeShowValues.bind(presenter),
      changeStep: presenter.changeStep.bind(presenter),
      changeValues: presenter.changeValues.bind(presenter),
      changeRangeState: presenter.changeRangeState.bind(presenter),
    };
  } else if (typeof param === 'string') {
    methods[param](arg);
  }
};
const element = $('.wrapper--1st');
const element2 = $('.wrapper--2nd');
const element3 = $('.wrapper--3rd');

element.slider(defaults);

element.slider('changeOrientation');
element.slider('changeStep', '5');

defaults.orientation = 'horizontal';
element2.slider(defaults);
element2.slider('changeValues', ['😼', '😇', '😏', '😹', '😎']);

defaults.isRange = false;
defaults.values = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
element3.slider(defaults);
element3.slider('changeShowValues');

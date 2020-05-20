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

(function ($) {
  let presenter!: IPresenter;

  let methods: IMethods = {};

  // eslint-disable-next-line no-param-reassign
  $.fn.sliderApp = function (param: string | IOptions, arg?: string) {
    const element = this.first();
    if (param instanceof Object && !arg) {
      const configPanelView = new ConfigPanelView(element, 'change');
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
}(jQuery));

$('.wrapper').sliderApp(defaults);

$('.wrapper').sliderApp('changeOrientation');
$('.wrapper').sliderApp('changeStep', '5');

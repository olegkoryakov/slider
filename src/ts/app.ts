import Presenter from './slider/Presenter/Presenter';
import Model from './slider/Model/Model';
import SliderView from './slider/View/SliderView';
import ConfigPanelView from './slider/View/ConfigPanelView';

// eslint-disable-next-line func-names
$.fn.sliderApp = function (
  orientation: IState['orientation'],
  isRange: IState['isRange'],
  isShowValue: IState['isShowValue'],
  step: number,
  values: TValues,
) {
  const model = new Model(
    orientation,
    isRange,
    isShowValue,
    step,
    values,
  );

  const sliderView = new SliderView(this);
  const configPanel = new ConfigPanelView(this, 'change');
  const presenter = new Presenter(
    configPanel,
    sliderView,
    model,
  );

  presenter.renderApp();
};

$('.wrapper').sliderApp(
  'horizontal',
  false,
  true,
  1,
  ['1', '2', '3', '4'],
);

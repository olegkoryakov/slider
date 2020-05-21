import Presenter from '../Presenter';
import SliderView from '../../View/SliderView';
import Model from '../../Model/Model';
import ConfigPanelView from '../../View/ConfigPanelView';

const parentNode = $('<div></div>');
let model:IModel;
let sliderView: ISliderView;
let configPanelView: IConfigPanelView;
let presenter: IPresenter;

describe('Presenter', () => {
  beforeEach(() => {
    model = new Model(
      'horizontal',
      false,
      false,
      1,
      { from: 1, to: 100 },
    );
    sliderView = new SliderView(parentNode);
    configPanelView = new ConfigPanelView(parentNode);
    presenter = new Presenter(configPanelView, sliderView, model);
  });

  test('renderApp', () => {
    // @ts-ignore
    presenter.sliderView.calcValues = jest.fn();
    // @ts-ignore
    presenter.sliderView.render = jest.fn();
    presenter.renderApp();

    // @ts-ignore
    expect(presenter.sliderView.render).toHaveBeenCalledWith({
      orientation: 'horizontal',
      isRange: false,
      isShowValue: false,
    });

    // @ts-ignore
    expect(presenter.sliderView.calcValues).toBeCalled();
  });

  test('renderRange', () => {
    const rangeInstances = {
      // @ts-ignore
      thumb: presenter.sliderView.thumbTo,
      // @ts-ignore
      input: presenter.sliderView.inputValueTo,
    };

    rangeInstances.input.setValue = jest.fn();
    rangeInstances.thumb.setValue = jest.fn();
    rangeInstances.thumb.setPosition = jest.fn();

    // @ts-ignore
    presenter.renderRange(rangeInstances);
    expect(rangeInstances.thumb.setPosition).toHaveBeenCalledWith('top', 0);
    expect(rangeInstances.thumb.setValue).toHaveBeenCalledWith(100);
    expect(rangeInstances.input.setValue).toHaveBeenCalledWith(100);


    presenter.changeRangeState();
    rangeInstances.input.setValue = jest.fn();
    rangeInstances.thumb.setValue = jest.fn();
    rangeInstances.thumb.setPosition = jest.fn();

    presenter.changeValues(['1', '2', '3']);

    // @ts-ignore
    presenter.renderRange(rangeInstances);
    expect(rangeInstances.thumb.setPosition).toHaveBeenCalledWith('top', 0);
    expect(rangeInstances.thumb.setValue).toHaveBeenCalledWith('3');
    expect(rangeInstances.input.setValue).toHaveBeenCalledWith('3');
  });

  test('changeOrientation', () => {
    // @ts-ignore
    presenter.model.setOrientationState = jest.fn();
    // @ts-ignore
    presenter.sliderView.setOrientation = jest.fn();

    presenter.changeOrientation();

    // @ts-ignore
    expect(presenter.model.setOrientationState).toHaveBeenCalledWith('vertical');

    // @ts-ignore
    expect(presenter.sliderView.setOrientation).toHaveBeenCalledWith('vertical');
  });

  test('changeShowValues', () => {
    // @ts-ignore
    presenter.sliderView.setShowValue = jest.fn();

    // @ts-ignore
    presenter.model.setShowValueState = jest.fn();
    presenter.changeShowValues();


    // @ts-ignore
    expect(presenter.sliderView.setShowValue).toHaveBeenCalledWith(true);

    // @ts-ignore
    expect(presenter.model.setShowValueState).toHaveBeenCalledWith(true);
  });

  test('changeRangeState', () => {
    // @ts-ignore
    presenter.sliderView.setRange = jest.fn();

    // @ts-ignore
    presenter.model.setRangeState = jest.fn();

    presenter.changeRangeState();
    // @ts-ignore
    expect(presenter.sliderView.setRange).toHaveBeenCalledWith(true);
    // @ts-ignore
    expect(presenter.model.setRangeState).toHaveBeenCalledWith(true);
  });

  test('changeStep', () => {
    let step: string;

    step = 'asd';
    // @ts-ignore
    presenter.model.setStep = jest.fn();
    presenter.changeStep(step);

    // @ts-ignore
    expect(presenter.model.setStep).toHaveBeenCalledWith(1);

    step = '123';
    // @ts-ignore
    presenter.model.setStep = jest.fn();
    presenter.changeStep(step);

    // @ts-ignore
    expect(presenter.model.setStep).toHaveBeenCalledWith(123);
  });

  test('changeValues', () => {
    model.setValues = jest.fn();
    presenter.changeValues(['1', '123']);

    expect(model.setValues).toHaveBeenCalledWith({ from: 1, to: 123 });


    model.setValues = jest.fn();
    presenter.changeValues(['123']);

    expect(model.setValues).toHaveBeenCalledWith({ from: 1, to: 123 });
  });

  test('changeValue', () => {
    // @ts-ignore
    const thumb = presenter.sliderView.thumbTo;
    // @ts-ignore
    const input = presenter.sliderView.inputValueTo;

    // @ts-ignore
    presenter.sliderView.getWidth = () => 123;

    input.setValue = jest.fn();
    thumb.setValue = jest.fn();


    // @ts-ignore
    presenter.changeValue(thumb);
    expect(input.setValue).toHaveBeenCalledWith(1);
    expect(thumb.setValue).toHaveBeenCalledWith(1);


    presenter.changeValues(['3', '2', '1']);
    expect(input.setValue).toHaveBeenCalledWith('3');
    expect(thumb.setValue).toHaveBeenCalledWith('3');
  });

  test('changeInputValue', () => {
    // @ts-ignore
    presenter.sliderView.getWidth = () => 123;
    // @ts-ignore
    const input = presenter.sliderView.inputValueTo;
    // @ts-ignore
    const thumb = presenter.sliderView.thumbTo;

    thumb.setValue = jest.fn();
    input.getValue = () => '50';

    // @ts-ignore
    presenter.changeInputValue(input);

    expect(thumb.setValue).toHaveBeenCalledWith(50);

    thumb.setValue = jest.fn();
    input.getValue = () => '101';

    // @ts-ignore
    presenter.changeInputValue(input);

    expect(thumb.setValue).toHaveBeenCalledWith(100);

    thumb.setValue = jest.fn();
    input.getValue = () => '-50';

    // @ts-ignore
    presenter.changeInputValue(input);

    expect(thumb.setValue).toHaveBeenCalledWith(1);

    thumb.setValue = jest.fn();
    input.getValue = () => 'wrong value';

    // @ts-ignore
    presenter.changeInputValue(input);

    expect(thumb.setValue).toHaveBeenCalledWith(1);

    const valuesArray = ['alo', 'privet', 'kak dela'];
    model.setValues(valuesArray);
    input.getValue = () => valuesArray[1];
    thumb.setValue = jest.fn();
    // @ts-ignore
    presenter.changeInputValue(input);
    expect(thumb.setValue).toHaveBeenCalledWith(valuesArray[1]);


    input.getValue = () => 'wrong value';
    thumb.setValue = jest.fn();
    // @ts-ignore
    presenter.changeInputValue(input);
    expect(thumb.setValue).toHaveBeenCalledWith(valuesArray[0]);
  });
});

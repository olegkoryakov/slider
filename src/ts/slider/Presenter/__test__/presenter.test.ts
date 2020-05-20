/* eslint-disable no-underscore-dangle */
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
    configPanelView = new ConfigPanelView(parentNode, 'change');
    presenter = new Presenter(configPanelView, sliderView, model);
  });

  test('renderApp', () => {
    presenter._sliderView.calcValues = jest.fn();
    presenter._sliderView.render = jest.fn();
    presenter.renderApp();

    expect(presenter._sliderView.render).toHaveBeenCalledWith({
      orientation: 'horizontal',
      isRange: false,
      isShowValue: false,
    });
    expect(presenter._sliderView.calcValues).toBeCalled();
  });

  test('renderRange', () => {
    const rangeInstances = {
      thumb: presenter._sliderView._thumbTo,
      input: presenter._sliderView._inputValueTo,
    };

    rangeInstances.input.setValue = jest.fn();
    rangeInstances.thumb.setValue = jest.fn();
    rangeInstances.thumb.setPosition = jest.fn();

    presenter._renderRange(rangeInstances);
    expect(rangeInstances.thumb.setPosition).toHaveBeenCalledWith('top', 0);
    expect(rangeInstances.thumb.setValue).toHaveBeenCalledWith(100);
    expect(rangeInstances.input.setValue).toHaveBeenCalledWith(100);


    presenter.changeRangeState();
    rangeInstances.input.setValue = jest.fn();
    rangeInstances.thumb.setValue = jest.fn();
    rangeInstances.thumb.setPosition = jest.fn();

    presenter.changeValues(['1', '2', '3']);

    presenter._renderRange(rangeInstances);
    expect(rangeInstances.thumb.setPosition).toHaveBeenCalledWith('top', 0);
    expect(rangeInstances.thumb.setValue).toHaveBeenCalledWith('3');
    expect(rangeInstances.input.setValue).toHaveBeenCalledWith('3');
  });

  test('changeOrientation', () => {
    presenter._model.setOrientationState = jest.fn();
    presenter._sliderView.setOrientation = jest.fn();

    presenter.changeOrientation();

    expect(presenter._model.setOrientationState).toHaveBeenCalledWith('vertical');
    expect(presenter._sliderView.setOrientation).toHaveBeenCalledWith('vertical');
  });

  test('changeShowValues', () => {
    presenter._sliderView.setShowValue = jest.fn();
    presenter._model.setShowValueState = jest.fn();
    presenter.changeShowValues();

    expect(presenter._sliderView.setShowValue).toHaveBeenCalledWith(true);
    expect(presenter._model.setShowValueState).toHaveBeenCalledWith(true);
  });

  test('changeRangeState', () => {
    presenter._sliderView.setRange = jest.fn();
    presenter._model.setRangeState = jest.fn();

    presenter.changeRangeState();
    expect(presenter._sliderView.setRange).toHaveBeenCalledWith(true);
    expect(presenter._model.setRangeState).toHaveBeenCalledWith(true);
  });

  test('changeStep', () => {
    let step: string;

    step = 'asd';
    presenter._model.setStep = jest.fn();
    presenter.changeStep(step);

    expect(presenter._model.setStep).toHaveBeenCalledWith(1);

    step = '123';
    presenter._model.setStep = jest.fn();
    presenter.changeStep(step);

    expect(presenter._model.setStep).toHaveBeenCalledWith(123);
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
    const thumb = presenter._sliderView._thumbTo;
    const input = presenter._sliderView._inputValueTo;

    presenter._sliderView.getWidth = () => 123;

    input.setValue = jest.fn();
    thumb.setValue = jest.fn();


    presenter._changeValue(thumb);
    expect(input.setValue).toHaveBeenCalledWith(1);
    expect(thumb.setValue).toHaveBeenCalledWith(1);


    presenter.changeValues(['3', '2', '1']);
    expect(input.setValue).toHaveBeenCalledWith('3');
    expect(thumb.setValue).toHaveBeenCalledWith('3');
  });

  test('changeInputValue', () => {
    presenter._sliderView.getWidth = () => 123;
    const input = presenter._sliderView._inputValueTo;
    const thumb = presenter._sliderView._thumbTo;

    thumb.setValue = jest.fn();
    input.getValue = () => '50';

    presenter._changeInputValue(input);

    expect(thumb.setValue).toHaveBeenCalledWith(50);

    thumb.setValue = jest.fn();
    input.getValue = () => '101';

    presenter._changeInputValue(input);

    expect(thumb.setValue).toHaveBeenCalledWith(100);

    thumb.setValue = jest.fn();
    input.getValue = () => '-50';

    presenter._changeInputValue(input);

    expect(thumb.setValue).toHaveBeenCalledWith(1);

    thumb.setValue = jest.fn();
    input.getValue = () => 'wrong value';

    presenter._changeInputValue(input);

    expect(thumb.setValue).toHaveBeenCalledWith(1);

    const valuesArray = ['alo', 'privet', 'kak dela'];
    model.setValues(valuesArray);
    input.getValue = () => valuesArray[1];
    thumb.setValue = jest.fn();
    presenter._changeInputValue(input);
    expect(thumb.setValue).toHaveBeenCalledWith(valuesArray[1]);


    input.getValue = () => 'wrong value';
    thumb.setValue = jest.fn();
    presenter._changeInputValue(input);
    expect(thumb.setValue).toHaveBeenCalledWith(valuesArray[0]);
  });
});

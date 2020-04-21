import View from './slider/view';
import Presenter from './slider/presenter';
import Model from './slider/model';

const model = new Model('vertical', true, true);
const view = new View();
const parentElement = $('body');

const presenter = new Presenter(model, view);
parentElement.append(view.configPanel);
presenter.renderSlider(parentElement);

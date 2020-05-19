interface ISliderApp {
  model: IModel,
  sliderView: ISliderView,
  configPanel: IConfigPanelView
  presenter: IPresenter,
}

interface JQuery {
  sliderApp(
    orientation: IState['orientation'],
    isRange: IState['isRange'],
    isShowValue: IState['isShowValue'],
    step: number,
    values: TValues,
  ): void,
}

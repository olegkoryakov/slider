interface IOptions {
  orientation: IState['orientation'],
  isShowValue: IState['isShowValue'],
  isRange: IState['isRange'],
  step: number,
  values: TValues,
}

interface IMethods {
  [key: string]: Function
}

interface JQuery {
  slider(param: string | IOptions, arg?: string | string[]): void,
}

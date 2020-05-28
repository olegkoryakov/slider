/**
 * Подписывается на события и эмитирует их
 */
export default class EventEmitter implements IEventEmitter {
  /**
   * Создает пустой объект events
   */
  constructor() {
    this.events = {};
  }

  /**
   * Объект, который хранит в себе:
   * ключ - имя события,
   * значение - массив функций обратного вызова
   */
  private events: IEvents;

  /**
   * Записывает в объект this.events ключ eventName и пушит в массив callback
   * @param eventName Имя события, которое будет записано, как ключ в объекте this.events
   * @param callback Функция обратного вызова, которая будет запушена в this.events[eventName]
   */
  on(eventName: string, callback: Function): void {
    if (this.events[eventName] === undefined) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  /**
   * Вызывает колбэки по ключу eventName с аргументом arg
   * @param eventName Ключ объекта events
   * @param arg Аргумент, с которым будут вызваны все коллбеки из events[eventName]
   */
  emit(eventName: string, arg: any): void {
    const event = this.events[eventName];
    event.forEach((callbalck) => {
      callbalck(arg);
    });
  }
}

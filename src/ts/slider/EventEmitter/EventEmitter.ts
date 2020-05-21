export default class EventEmitter implements IEventEmitter {
  constructor() {
    this.events = {};
  }

  private events: IEvents;

  on(eventName: string, callback: Function): void {
    if (this.events[eventName] === undefined) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  emit(eventName: string, arg: any): void {
    const event = this.events[eventName];
    event.forEach((callbalck) => {
      callbalck(arg);
    });
  }
}

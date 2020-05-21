import EventEmitter from '../EventEmitter';

let eventEmitter: IEventEmitter;
let eventName: string;
let testCallback: Function;
let testCbArray: Function[];

describe('EventEmitter: ', () => {
  beforeEach(() => {
    eventEmitter = new EventEmitter();
    eventName = 'test';
    testCallback = jest.fn();
    testCbArray = [testCallback];
    eventEmitter.on(eventName, testCallback);
  });

  test('Method .on should add callback in events object', () => {
    // @ts-ignore
    expect(eventEmitter.events[eventName]).toBeInstanceOf(Array);
    // @ts-ignore
    expect(eventEmitter.events[eventName]).toEqual(testCbArray);
  });

  test('Method emit should trigger events[eventName] callbacks', () => {
    eventEmitter.emit(eventName, 'name');
    expect(testCallback).toBeCalledWith('name');
  });
});

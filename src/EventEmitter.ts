
type EventEmitterCallback = (payload?: any) => any;

class EventEmitterListenerGroup<E> {

  private _emitter: EventEmitter<E>;
  private _unbind: Function[] = [];
  
  constructor(emitter: EventEmitter<E>) {
    this._emitter = emitter;
  }

  /**
   * Add an event listener
   *
   * @param name The event to subscribe to 
   * @param callback The callback function to invoke
   */
  addEventListener(name: E, callback: EventEmitterCallback): void {
    let unbind = this._emitter.addEventListener(name, callback);
    this._unbind.push(unbind);
  }

  /**
   * Remove all event listeners in group
   */
  removeEventListeners(): void {
    this._unbind.forEach((unbind) => unbind());
    this._unbind = [];
  }

}

class EventEmitter<E> {

  private _eventEmitterChannels: { [name:number]: EventEmitterCallback[]; } = {};

  /**
   * Add an event listener
   *
   * @param name The event to subscribe to @param callback The callback function to invoke
   * @return unbind function
   */
  addEventListener(name: E, callback: EventEmitterCallback): (...any) => any {
    if (!this._eventEmitterChannels.hasOwnProperty(<any>name)) {
      this._eventEmitterChannels[<any>name] = [callback];
    } else {
      this._eventEmitterChannels[<any>name].push(callback);
    }
    return () => this.removeEventListener(name, callback);
  }

  /**
   * Remove an event listener
   *
   * @param name The event to unsubscribe from
   * @param callback The callback to unsubscribe
   */
  removeEventListener(name: E, callback: EventEmitterCallback): void {
    let channels = this._eventEmitterChannels;
    if (channels.hasOwnProperty(<any>name)) {
      let channel = channels[<any>name];
      let index = channel.indexOf(callback);
      if (index !== -1) {
        channel.splice(index, 1);
      }
    }
  }

  /**
   * Remove all event listeners
   *
   * @param name Event to reset (defaults to all)
   */
  removeEventListeners(name?: E): void {
    if (typeof name === 'undefined') {
      this._eventEmitterChannels = {};
    } else if (this._eventEmitterChannels.hasOwnProperty(<any>name)) {
      delete this._eventEmitterChannels[<any>name];
    }
  }

  /**
   * Emit an event
   *
   * @param name The event type
   * @param payload Optional data passed to listeners
   */
  emitEvent(name: E, payload?: any): void {
    if (this._eventEmitterChannels.hasOwnProperty(<any>name)) {
      this._eventEmitterChannels[<any>name].forEach((callback) => {
        callback(payload);
      });
    }
  }

  /**
   * Create a group of listeners that can be unbound all together
   *
   * @return a group of listeners
   */
  createEventGroup(): EventEmitterListenerGroup<E> {
    return new EventEmitterListenerGroup(this);
  }

}

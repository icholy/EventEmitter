
type EventEmitterCallback<T> = (payload?: T) => any;

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
  addListener<T>(name: E, callback: EventEmitterCallback<T>): void {
    let unbind = this._emitter.addListener(name, callback);
    this._unbind.push(unbind);
  }

  /**
   * Remove all event listeners in group
   */
  removeAllListeners(): void {
    for (let unbind of this._unbind.slice()) {
      unbind();
    }
    this._unbind = [];
  }

}

class EventEmitter<E> {

  private _eventEmitterChannels: { [name: number]: EventEmitterCallback<any>[]; } = {};

  /**
   * Add an event listener
   *
   * @param name The event to subscribe to @param callback The callback function to invoke
   * @return unbind function
   */
  addListener<T>(name: E, callback: EventEmitterCallback<T>): Function {
    if (!this._eventEmitterChannels.hasOwnProperty(name as any)) {
      this._eventEmitterChannels[name as any] = [];
    }
    this._eventEmitterChannels[name as any].push(callback);
    return () => this.removeListener(name, callback);
  }

  /**
   * Remove an event listener
   *
   * @param name The event to unsubscribe from
   * @param callback The callback to unsubscribe
   */
  removeListener(name: E, callback: EventEmitterCallback<any>): void {
    let channels = this._eventEmitterChannels;
    if (channels.hasOwnProperty(name as any)) {
      let channel = channels[name as any];
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
  removeAllListeners(name?: E): void {
    if (typeof name === 'undefined') {
      this._eventEmitterChannels = {};
    } else if (this._eventEmitterChannels.hasOwnProperty(name as any)) {
      delete this._eventEmitterChannels[name as any];
    }
  }

  /**
   * Emit an event
   *
   * @param name The event type
   * @param payload Optional data passed to listeners
   */
  emitEvent(name: E, payload?: any): void {
    if (!this._eventEmitterChannels.hasOwnProperty(name as any)) {
      return;
    }
    let channel = this._eventEmitterChannels[name as any];
    for (let listener of channel.slice()) {
      listener(payload);
    }
  }

  /**
   * Create a group of listeners that can be unbound all together
   *
   * @return a group of listeners
   */
  createListenerGroup(): EventEmitterListenerGroup<E> {
    return new EventEmitterListenerGroup(this);
  }

}

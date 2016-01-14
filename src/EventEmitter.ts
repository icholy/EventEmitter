
type EventEmitterCallback = (payload?: any) => any;

class EventEmitterGroup<E> {

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
  on(name: E, callback: EventEmitterCallback): void {
    let unbind = this._emitter.on(name, callback);
    this._unbind.push(unbind);
  }

  /**
   * Remove all event listeners in group
   */
  off(): void {
    this._unbind.forEach((unbind) => {
      unbind();
    });
  }

}

class EventEmitter<E> {

  private _channels: { [name:number]: EventEmitterCallback[]; } = {};

  /**
   * Add an event listener
   *
   * @param name The event to subscribe to @param callback The callback function to invoke
   * @return unbind function
   */
  on(name: E, callback: EventEmitterCallback): (...any) => any {
    if (!this._channels.hasOwnProperty(<any>name)) {
      this._channels[<any>name] = [callback];
    } else {
      this._channels[<any>name].push(callback);
    }
    return () => this.off(name, callback);
  }

  /**
   * Remove an event listener
   *
   * @param name The event to unsubscribe from
   * @param callback The callback to unsubscribe
   */
  off(name: E, callback: EventEmitterCallback): void {
    let channels = this._channels;
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
  reset(name?: E): void {
    if (typeof name === 'undefined') {
      this._channels = {};
    } else if (this._channels.hasOwnProperty(<any>name)) {
      delete this._channels[<any>name];
    }
  }

  /**
   * Emit an event
   *
   * @param name The event type
   * @param payload Optional data passed to listeners
   */
  emit(name: E, payload?: any): void {
    if (this._channels.hasOwnProperty(<any>name)) {
      this._channels[<any>name].forEach((callback) => {
        callback(payload);
      });
    }
  }

  /**
   * Create a group of listeners that can be unbound all together
   *
   * @return a group of listeners
   */
  group(): EventEmitterGroup<E> {
    return new EventEmitterGroup(this);
  }

}

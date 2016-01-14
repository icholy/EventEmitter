
type EventEmitterCallback = (payload?: any) => any;

class EventEmitter<E> {

  private _channels: { [name:number]: EventEmitterCallback[]; } = {};

  /**
   * Add an event listener
   *
   * @param name The event to subscribe to
   * @param callback The callback function to invoke
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
}

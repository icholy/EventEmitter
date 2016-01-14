
type EventEmitterCallback = (payload?: any) => any;

class EventEmitter<E> {

  private _channels: { [name:number]: EventEmitterCallback[]; } = {};

  on(name: E, callback: EventEmitterCallback): (...any) => any {
    if (!this._channels.hasOwnProperty(<any>name)) {
      this._channels[<any>name] = [callback];
    } else {
      this._channels[<any>name].push(callback);
    }
    return () => this.off(name, callback);
  }

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

  emit(name: E, payload?: any): void {
    if (this._channels.hasOwnProperty(<any>name)) {
      this._channels[<any>name].forEach((callback) => {
        callback(payload);
      });
    }
  }
}

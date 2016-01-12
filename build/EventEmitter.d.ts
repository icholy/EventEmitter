declare type EventEmitterCallback = (payload?: any) => any;
declare class EventEmitter<E> {
    private _channels;
    on(name: E, callback: EventEmitterCallback): Function;
    off(name: E, callback: EventEmitterCallback): void;
    emit(name: E, payload?: any): void;
}

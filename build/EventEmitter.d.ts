declare type EventEmitterCallback = (payload?: any) => any;
declare class EventEmitterGroup<E> {
    private _emitter;
    private _unbind;
    constructor(emitter: EventEmitter<E>);
    /**
     * Add an event listener
     *
     * @param name The event to subscribe to
     * @param callback The callback function to invoke
     */
    on(name: E, callback: EventEmitterCallback): void;
    /**
     * Remove all event listeners in group
     */
    off(): void;
}
declare class EventEmitter<E> {
    private _channels;
    /**
     * Add an event listener
     *
     * @param name The event to subscribe to @param callback The callback function to invoke
     * @return unbind function
     */
    on(name: E, callback: EventEmitterCallback): (...any) => any;
    /**
     * Remove an event listener
     *
     * @param name The event to unsubscribe from
     * @param callback The callback to unsubscribe
     */
    off(name: E, callback: EventEmitterCallback): void;
    /**
     * Remove all event listeners
     *
     * @param name Event to reset (defaults to all)
     */
    reset(name?: E): void;
    /**
     * Emit an event
     *
     * @param name The event type
     * @param payload Optional data passed to listeners
     */
    emit(name: E, payload?: any): void;
    /**
     * Create a group of listeners that can be unbound all together
     *
     * @return a group of listeners
     */
    group(): EventEmitterGroup<E>;
}

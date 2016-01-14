declare type EventEmitterCallback = (payload?: any) => any;
declare class EventEmitter<E> {
    private _channels;
    /**
     * Add an event listener
     *
     * @param name The event to subscribe to
     * @param callback The callback function to invoke
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
     */
    reset(): void;
    /**
     * Emit an event
     *
     * @param name The event type
     * @param payload Optional data passed to listeners
     */
    emit(name: E, payload?: any): void;
}

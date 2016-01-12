# EventEmitter:

> Partially Type Safe Event Emitter

**Usage:**

``` ts

enum FooEvents {
  EVENT_A,
  EVENT_B,
  EVENT_C
}

class Foo extends EventEmitter<FooEvents> {}

var foo = new Foo();

foo.on(FooEvents.EVENT_A, (payload: string) => {
  console.log(payload);
});

foo.emit(FooEvents.EVENT_A, "Hello World!");

```


# EventEmitter:

> Partially Type Safe Event Emitter

**Usage:**

``` ts

enum Events { A, B, C }

class Foo extends EventEmitter<Events> {}

var foo = new Foo();

foo.addEventListener(Events.A, (payload: string) => {
  console.log(payload);
});

foo.emitEvent(Events.A, "Hello World!");
```


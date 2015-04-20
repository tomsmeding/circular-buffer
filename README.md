# NodeJS Circular Buffer

This is a simple [circular buffer](http://en.wikipedia.org/wiki/Circular_buffer) implementation for NodeJS.

## Usage

Below is a sample session with a circular buffer with this package. It should answer most questions.

```node
var CircularBuffer = require("circular-buffer");

var buf = new CircularBuffer(3);
console.log(buf.capacity()); // -> 3
buf.enq(1);
buf.enq(2);
console.log(buf.size()); // -> 2
buf.enq(3);
buf.enq(4);
console.log(buf.size()); // -> 3  (despite having added a fourth item!)
buf.get(0); // -> 4  (last added item is at start of buffer)
buf.get(0,2); // -> [4,3,2]  (2-parameter get takes start and end)
buf.toarray(); // -> [4,3,2]  (equivalent to buf.get(0,buf.size() - 1) )
console.log(buf.deq()); // -> 4
buf.toarray(); // -> [3,2]
buf.deq(); // -> 3
buf.deq(); // -> 2
buf.toarray(); // -> []
buf.deq(); // -> throws RangeError("CircularBuffer dequeue on empty buffer")
```

## Functions

- `size()` -> `integer`
  - Returns the current number of items in the buffer.
- `capacity()` -> `integer`
  - Returns the maximum number of items in the buffer (specified when creating it).
- `enq(value)`
  - Enqueue `value` at the start of the buffer
- `deq()` -> `value`
  - Dequeue an item from the start of the buffer; returns that item. Throws `RangeError` when the buffer is empty on invocation.
- `get(idx)` -> `value`
  - Get the value at index `idx`. `0` is the start of the buffer (last-enqueued item), `buf.size()-1` is the oldest item in the buffer.
- `get(start,end)` -> `[value]`
  - Gets the values from index `start` up to and including index `end`; returns an array. The newest item is first in the array, and it is the same as `buf.get(start)`.
- `toarray()` -> `[value]`
  - Equivalent to `buf.get(0,buf.size() - 1)`: exports all items in the buffer in order.

## Testing

To test the package simply run `npm update && npm test` in the package's root folder.

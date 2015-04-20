var assert = require("chai").assert;
var CircularBuffer = require("../");

describe("CircularBuffer", function () {
	var size = 3;

	it("should be an CircularBuffer", function () {
		var buf = new CircularBuffer(size);
		assert.instanceOf(buf, CircularBuffer);
	});

	it("should have the correct capacity", function () {
		var buf = new CircularBuffer(size);
		assert.equal(buf.capacity(), size);
	});

	it("should correctly return the current count", function () {
		var buf = new CircularBuffer(size);
		assert.equal(buf.size(), 0);

		buf.enq(0);
		buf.enq(1);

		assert.equal(buf.size(), 2);

		buf.enq(3);
		buf.enq(4);

		assert.equal(buf.size(), 3);
	});

	it("should queue items and get them", function () {
		var buf = new CircularBuffer(size);
		var n = Math.random();

		buf.enq(5);
		buf.enq(n);

		assert.equal(buf.get(0), n);
	});

	it("retrieve multiple values at once", function () {
		var buf = new CircularBuffer(size);

		for (var i = 0; i < 4; i++) {
			buf.enq(i);
		}

		var res = buf.get(0,2); // 3,2,1
		assert.instanceOf(res, Array);
		assert.deepEqual(res, [3, 2, 1]);
	});

	it("should convert the current values to an array", function () {
		var buf = new CircularBuffer(size);

		assert.instanceOf(buf.toarray(), Array);
		assert.lengthOf(buf.toarray(), 0);

		buf.enq(42);

		assert.deepEqual(buf.toarray(), [42]);
	});

	it("should error when dequeuing empty buffer", function () {
		var buf = new CircularBuffer(size);
		try {
			buf.deq();
		} catch (e) { // yay! we catched an error
			return;
		}

		// uh noes we shouldnt be allowed to do this.
		assert.fail("No error after dequeueing empty buffer", "Error after dequeueing empty buffer");
	});

});

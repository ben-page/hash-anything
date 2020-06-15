const Hash = require('../js/main/hash-anything').Hash;
const sha1 = require('../js/main/hash-anything').sha1;

test('arrays', function () {
    const arr1 = [1, 2, 3];
    const dup = [1, 2, 3];
    const arr2 = ['one', 'two', 'three'];

    expect(sha1(arr1)).toBe(sha1(dup));
    expect(sha1(arr1)).not.toBe(sha1(arr2));
});

test('Date', function () {
    const now = +(Date.now());

    const d1 = new Date(now);
    const dup = new Date(now);
    const d2 = new Date(now + 1000);

    expect(sha1(d1)).toBe(sha1(dup));
    const i = sha1(d1);
    const j = sha1(d2);
    expect(sha1(d1)).not.toBe(sha1(d2));
});

test('Function', function () {
    const f1 = function (v) {
        return v++;
    };
    const dup = function (v) {
        return v++;
    };
    const f2 = function (v) {
        return v--;
    };

    expect(sha1(f1)).toBe(sha1(dup));
    expect(sha1(f1)).not.toBe(sha1(f2));
});

test('Object', function () {
    const o1 = {
        some: 'thing',
        other: 3
    };
    const dup = {
        some: 'thing',
        other: 3
    };
    const o2 = {
        some: 'things',
        other: 2
    };

    expect(sha1(o1)).toBe(sha1(dup));
    expect(sha1(o1)).not.toBe(sha1(o2));
});

test('Instance of an Object', function () {
    function F1(v) {
        return v++;
    }

    F1.prototype.method1 = function() {};

    function F2(v) {
        return v++;
    }

    F1.prototype.method2 = function() {};

    const f1 = new F1();
    const dup = new F1();
    const f2 = new F2();

    expect(sha1(f1)).toBe(sha1(dup));
    expect(sha1(f1)).not.toBe(sha1(f2));
});

test('Function with Prototype', function () {
    const f1 = (function() {
        function F1(v) {
            return v++;
        }

        F1.prototype.method1 = function() {};

        return F1;
    });

    const dup = (function() {
        function F1(v) {
            return v++;
        }

        F1.prototype.method1 = function() {};

        return F1;
    });

    const f2 = (function() {
        function F2(v) {
            return v++;
        }

        F2.prototype.method2 = function() {};

        return F2;
    });

    expect(sha1(f1)).toBe(sha1(dup));
    expect(sha1(f1)).not.toBe(sha1(f2));
});

test('RegExp', function () {
    const r1 = /[0-9]/;
    const dup = /[0-9]/;
    const r2 = /[0-9]/g;
    const r3 = /[0-9a-z]/;

    expect(sha1(r1)).toBe(sha1(dup));
    expect(sha1(r1)).not.toBe(sha1(r2));
    expect(sha1(r1)).not.toBe(sha1(r3));
});

test('Null', function () {
    const n1 = null;
    const dup = null;
    const n2 = 1;

    expect(sha1(n1)).toBe(sha1(dup));
    expect(sha1(n1)).not.toBe(sha1(n2));
});

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

test('Symbols', function () {
    const s1 = Symbol('s1');
    const dup = Symbol('s1');
    const s2 = Symbol('s2');

    expect(sha1(s1)).toBe(sha1(dup));
    expect(sha1(s1)).not.toBe(sha1(s2));
});

test('BigInt', function () {
    const b1 = 9007199254740991n;
    const dup = BigInt(9007199254740991);
    const b2 = 1234n;

    expect(sha1(b1)).toBe(sha1(dup));
    expect(sha1(b1)).not.toBe(sha1(b2));
});

test('Map', function () {
    const m1 = new Map();
    m1.set(1, 'one');
    m1.set(2, 'two');
    const dup = new Map();
    dup.set(1, 'one');
    dup.set(2, 'two');
    const m2 = new Map();
    m2.set(2, 'two');
    m2.set(1, 'one');

    expect(sha1(m1)).toBe(sha1(dup));
    expect(sha1(m1)).not.toBe(sha1(m2));
});

test('Set', function () {
    const s1 = new Set();
    s1.add(1);
    s1.add(2);
    const dup = new Set();
    dup.add(1);
    dup.add(2);
    const s2 = new Set();
    s2.add(2);
    s2.add(1);
    const a2 = [ 1, 2 ];

    expect(sha1(s1)).toBe(sha1(dup));
    expect(sha1(s1)).not.toBe(sha1(s2));
    expect(sha1(s1)).not.toBe(sha1(a2)); //ensure array doesn't match
});

test('Generator Function', function () {
    const n1 = function*(){};
    const dup = function*(){};
    const n2 = function*(){let i = 0;};

    expect(sha1(n1)).toBe(sha1(dup));
    expect(sha1(n1)).not.toBe(sha1(n2));
});

test('Async Function', function () {
    const n1 = async function(){};
    const dup = async function(){};
    const n2 = async function(){let i = 0;};

    expect(sha1(n1)).toBe(sha1(dup));
    expect(sha1(n1)).not.toBe(sha1(n2));
});
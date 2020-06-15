const sha1 = require('../js/main/hash-anything').sha1;

test('Integer', function () {
    const i1 = 1234;
    const dup = 1234;
    const i2 = 12345;

    expect(sha1(i1)).toBe(sha1(dup));
    expect(sha1(i1)).not.toBe(sha1(i2));
});

test('Number - Integer', function () {
    const i1 = 1234;
    const dup = 1234;
    const i2 = 12345;

    expect(sha1(i1)).toBe(sha1(dup));
    expect(sha1(i1)).not.toBe(sha1(i2));
});

test('Number - Decimal', function () {
    const d1 = 12.34;
    const dup = 12.34;
    const d2 = 12.345;

    expect(sha1(d1)).toBe(sha1(dup));
    expect(sha1(d1)).not.toBe(sha1(d2));
});

test('Boolean', function () {
    const b1 = true;
    const dup = true;
    const b2 = false;

    expect(sha1(b1)).toBe(sha1(dup));
    expect(sha1(b1)).not.toBe(sha1(b2));
});

test('String', function () {
    const s1 = 'abcdefghi';
    const dup = 'abcdefghi';
    const s2 = 'abcdefghij';

    expect(sha1(s1)).toBe(sha1(dup));
    expect(sha1(s1)).not.toBe(sha1(s2));
});

test('Undefined', function () {
    const u1 = undefined;
    const dup = undefined;
    const u2 = 1;

    expect(sha1(u1)).toBe(sha1(dup));
    expect(sha1(u1)).not.toBe(sha1(u2));
});

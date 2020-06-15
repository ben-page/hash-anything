const Hash = require('../js/main/hash-anything').Hash;
const sha1 = require('../js/main/hash-anything').sha1;
const XXHash = require('xxhash');

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

test('Chaining', function () {
    const hash1 = new Hash('sha1').hash(123).hash('string').getValue();
    const dup = new Hash('sha1').hash(123).hash('string').getValue();
    const hash2 = new Hash('sha1').hash(1234).hash('string').getValue();

    expect(hash1).toBe(dup);
    expect(hash1).not.toBe(hash2);
});

test('Large Amount of Data', function () {
    const text1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies, magna sed condimentum faucibus, nulla libero vestibulum metus, non ornare elit nisi eget sapien. Etiam scelerisque ultrices vehicula. Donec tincidunt magna vel est faucibus eleifend non a nulla. In luctus venenatis nunc vel vulputate. Nullam auctor quis lacus et pharetra. Vivamus placerat viverra porttitor. Phasellus id nisi ut ipsum fringilla molestie non a ante. Suspendisse ornare odio tellus, vel elementum urna sollicitudin at. Morbi mi lorem, sollicitudin et neque eu, rutrum ultricies nulla. Donec sed ex leo. In gravida non justo in pharetra.         Curabitur eleifend ipsum id vulputate commodo. Nunc ut arcu tincidunt, volutpat est at, commodo augue. In in tincidunt tortor. Integer egestas, orci vel tincidunt fermentum, risus metus ullamcorper augue, vitae molestie lorem mauris nec nisl. Cras tempor sapien vel mauris varius, vitae elementum sapien luctus. Donec id nisl non sapien malesuada varius. Vestibulum tempus dignissim enim, eu auctor libero varius eget. Aliquam nec risus est. Sed egestas justo et volutpat pharetra. Nunc dictum urna semper est sodales porttitor. Mauris egestas scelerisque neque a tincidunt. Nunc ultricies laoreet pellentesque.';
    const dup = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies, magna sed condimentum faucibus, nulla libero vestibulum metus, non ornare elit nisi eget sapien. Etiam scelerisque ultrices vehicula. Donec tincidunt magna vel est faucibus eleifend non a nulla. In luctus venenatis nunc vel vulputate. Nullam auctor quis lacus et pharetra. Vivamus placerat viverra porttitor. Phasellus id nisi ut ipsum fringilla molestie non a ante. Suspendisse ornare odio tellus, vel elementum urna sollicitudin at. Morbi mi lorem, sollicitudin et neque eu, rutrum ultricies nulla. Donec sed ex leo. In gravida non justo in pharetra.         Curabitur eleifend ipsum id vulputate commodo. Nunc ut arcu tincidunt, volutpat est at, commodo augue. In in tincidunt tortor. Integer egestas, orci vel tincidunt fermentum, risus metus ullamcorper augue, vitae molestie lorem mauris nec nisl. Cras tempor sapien vel mauris varius, vitae elementum sapien luctus. Donec id nisl non sapien malesuada varius. Vestibulum tempus dignissim enim, eu auctor libero varius eget. Aliquam nec risus est. Sed egestas justo et volutpat pharetra. Nunc dictum urna semper est sodales porttitor. Mauris egestas scelerisque neque a tincidunt. Nunc ultricies laoreet pellentesque.';
    const text2 = 'Donec maximus erat sed leo molestie euismod. Proin a aliquam sapien. Sed eget placerat ligula. Fusce semper sed ex non elementum. Donec convallis urna et magna tempor, in interdum velit posuere. Donec ac leo eget nunc rhoncus tincidunt a ac risus. Nunc vitae pellentesque orci, id dapibus justo. Ut varius vulputate nibh, luctus molestie mauris varius ullamcorper. Donec consequat ornare arcu, tempor sollicitudin turpis euismod ut. Fusce convallis, nibh et interdum pharetra, nibh nisi blandit risus, id lobortis ante odio vehicula lorem. Curabitur eget vehicula elit. Donec at facilisis justo, nec malesuada tellus.        Nunc eu tortor nunc. Curabitur eleifend ante vitae blandit porta. Curabitur imperdiet in dui non bibendum. Fusce tincidunt gravida metus, lacinia rhoncus lacus vehicula quis. Mauris viverra imperdiet orci, sed dictum diam bibendum non. Sed at nibh leo. Proin maximus cursus feugiat. Nulla consectetur nec mauris dapibus pharetra. Nulla tristique tellus ut magna viverra egestas. Sed viverra ante libero, eu laoreet erat iaculis non. Cras ut vestibulum ex.';

    expect(sha1(text1)).toBe(sha1(dup));
    expect(sha1(text1)).not.toBe(sha1(text2));
});

test('clear()', function () {
    const hash = new Hash('sha1');

    const value1 = hash.hash(1234).getValue();
    const value2 = hash.hash('something').getValue();
    const value3 = hash.clear().hash(1234).getValue();

    expect(value1).toBe(value3);
    expect(value1).not.toBe(value2);
});


test('external hash', function () {
    function doHash(buf) {
        const hasher = new XXHash(0xb911be95);
        hasher.update(buf);
        return hasher.digest('hex');
    }

    const hash1 = new Hash(doHash).hash(123).hash('string').getValue();
    const dup = new Hash(doHash).hash(123).hash('string').getValue();
    const hash2 = new Hash(doHash).hash(1234).hash('string').getValue();

    expect(hash1).toBe(dup);
    expect(hash1).not.toBe(hash2);
});

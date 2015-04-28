var assert = require('assert');
var Hash = require('../index.js').Hash;
var hash = require('../index.js').hash;

describe('hash', function() {
    it('integer', function () {
        var i1 = 1234;
        var dup = 1234;
        var i2 = 12345;

        assert.equal(hash(i1), hash(dup));
        assert.notEqual(hash(i1), hash(i2));
    });

    it('decimal', function () {
        var d1 = 12.34;
        var dup = 12.34;
        var d2 = 12.345;

        assert.equal(hash(d1), hash(dup));
        assert.notEqual(hash(d1), hash(d2));
    });

    it('boolean', function () {
        var b1 = true;
        var dup = true;
        var b2 = false;

        assert.equal(hash(b1), hash(dup));
        assert.notEqual(hash(b1), hash(b2));
    });

    it('String', function () {
        var s1 = 'abcdefghi';
        var dup = 'abcdefghi';
        var s2 = 'abcdefghij';

        assert.equal(hash(s1), hash(dup));
        assert.notEqual(hash(s1), hash(s2));
    });

    it('arrays', function () {
        var arr1 = [1, 2, 3];
        var dup = [1, 2, 3];
        var arr2 = ['one', 'two', 'three'];

        assert.equal(hash(arr1), hash(dup));
        assert.notEqual(hash(arr1), hash(arr2));
    });

    it('Date', function () {
        var d1 = new Date(Date.now());
        var dup = new Date(Date.now());
        var d2 = new Date(Date.now() + 1000);

        assert.equal(hash(d1), hash(dup));
        assert.notEqual(hash(d1), hash(d2));
    });

    it('Function', function () {
        var f1 = function (v) {
            return v++;
        };
        var dup = function (v) {
            return v++;
        };
        var f2 = function (v) {
            return v--;
        };

        assert.equal(hash(f1), hash(dup));
        assert.notEqual(hash(f1), hash(f2));
    });

    it('Object', function () {
        var o1 = {
            some: 'thing',
            other: 3
        };
        var dup = {
            some: 'thing',
            other: 3
        };
        var o2 = {
            some: 'things',
            other: 2
        };

        assert.equal(hash(o1), hash(dup));
        assert.notEqual(hash(o1), hash(o2));
    });

    it('Instance of an Object', function () {
        function F1(v) {
            return v++;
        }

        F1.prototype.method1 = function() {};

        function F2(v) {
            return v++;
        }

        F1.prototype.method2 = function() {};

        var f1 = new F1();
        var dup = new F1();
        var f2 = new F2();

        assert.equal(hash(f1), hash(dup));
        assert.notEqual(hash(f1), hash(f2));
    });

    it('Function with Prototype', function () {
        var f1 = (function() {
            function F1(v) {
                return v++;
            }

            F1.prototype.method1 = function() {};

            return F1;
        });

        var dup = (function() {
            function F1(v) {
                return v++;
            }

            F1.prototype.method1 = function() {};

            return F1;
        });

        var f2 = (function() {
            function F2(v) {
                return v++;
            }

            F2.prototype.method2 = function() {};

            return F2;
        });

        assert.equal(hash(f1), hash(dup));
        assert.notEqual(hash(f1), hash(f2));
    });

    it('RegExp', function () {
        var r1 = /[0-9]/;
        var dup = /[0-9]/;
        var r2 = /[0-9]/g;
        var r3 = /[0-9a-z]/;

        assert.equal(hash(r1), hash(dup));
        assert.notEqual(hash(r1), hash(r2));
        assert.notEqual(hash(r1), hash(r3));
    });

    it('Null', function () {
        var n1 = null;
        var dup = null;
        var n2 = 1;

        assert.equal(hash(n1), hash(dup));
        assert.notEqual(hash(n1), hash(n2));
    });

    it('Undefined', function () {
        var u1 = undefined;
        var dup = undefined;
        var u2 = 1;

        assert.equal(hash(u1), hash(dup));
        assert.notEqual(hash(u1), hash(u2));
    });

    it('Chaining', function () {
        var hash1 = new Hash().hash(123).hash('string').getValue();
        var dup = new Hash().hash(123).hash('string').getValue();
        var hash2 = new Hash().hash(1234).hash('string').getValue();

        assert.equal(hash(hash1), hash(dup));
        assert.notEqual(hash(hash1), hash(hash2));
    });

    it('Large Amount of Data', function () {
        var text1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies, magna sed condimentum faucibus, nulla libero vestibulum metus, non ornare elit nisi eget sapien. Etiam scelerisque ultrices vehicula. Donec tincidunt magna vel est faucibus eleifend non a nulla. In luctus venenatis nunc vel vulputate. Nullam auctor quis lacus et pharetra. Vivamus placerat viverra porttitor. Phasellus id nisi ut ipsum fringilla molestie non a ante. Suspendisse ornare odio tellus, vel elementum urna sollicitudin at. Morbi mi lorem, sollicitudin et neque eu, rutrum ultricies nulla. Donec sed ex leo. In gravida non justo in pharetra.         Curabitur eleifend ipsum id vulputate commodo. Nunc ut arcu tincidunt, volutpat est at, commodo augue. In in tincidunt tortor. Integer egestas, orci vel tincidunt fermentum, risus metus ullamcorper augue, vitae molestie lorem mauris nec nisl. Cras tempor sapien vel mauris varius, vitae elementum sapien luctus. Donec id nisl non sapien malesuada varius. Vestibulum tempus dignissim enim, eu auctor libero varius eget. Aliquam nec risus est. Sed egestas justo et volutpat pharetra. Nunc dictum urna semper est sodales porttitor. Mauris egestas scelerisque neque a tincidunt. Nunc ultricies laoreet pellentesque.';
        var dup = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies, magna sed condimentum faucibus, nulla libero vestibulum metus, non ornare elit nisi eget sapien. Etiam scelerisque ultrices vehicula. Donec tincidunt magna vel est faucibus eleifend non a nulla. In luctus venenatis nunc vel vulputate. Nullam auctor quis lacus et pharetra. Vivamus placerat viverra porttitor. Phasellus id nisi ut ipsum fringilla molestie non a ante. Suspendisse ornare odio tellus, vel elementum urna sollicitudin at. Morbi mi lorem, sollicitudin et neque eu, rutrum ultricies nulla. Donec sed ex leo. In gravida non justo in pharetra.         Curabitur eleifend ipsum id vulputate commodo. Nunc ut arcu tincidunt, volutpat est at, commodo augue. In in tincidunt tortor. Integer egestas, orci vel tincidunt fermentum, risus metus ullamcorper augue, vitae molestie lorem mauris nec nisl. Cras tempor sapien vel mauris varius, vitae elementum sapien luctus. Donec id nisl non sapien malesuada varius. Vestibulum tempus dignissim enim, eu auctor libero varius eget. Aliquam nec risus est. Sed egestas justo et volutpat pharetra. Nunc dictum urna semper est sodales porttitor. Mauris egestas scelerisque neque a tincidunt. Nunc ultricies laoreet pellentesque.';
        var text2 = 'Donec maximus erat sed leo molestie euismod. Proin a aliquam sapien. Sed eget placerat ligula. Fusce semper sed ex non elementum. Donec convallis urna et magna tempor, in interdum velit posuere. Donec ac leo eget nunc rhoncus tincidunt a ac risus. Nunc vitae pellentesque orci, id dapibus justo. Ut varius vulputate nibh, luctus molestie mauris varius ullamcorper. Donec consequat ornare arcu, tempor sollicitudin turpis euismod ut. Fusce convallis, nibh et interdum pharetra, nibh nisi blandit risus, id lobortis ante odio vehicula lorem. Curabitur eget vehicula elit. Donec at facilisis justo, nec malesuada tellus.        Nunc eu tortor nunc. Curabitur eleifend ante vitae blandit porta. Curabitur imperdiet in dui non bibendum. Fusce tincidunt gravida metus, lacinia rhoncus lacus vehicula quis. Mauris viverra imperdiet orci, sed dictum diam bibendum non. Sed at nibh leo. Proin maximus cursus feugiat. Nulla consectetur nec mauris dapibus pharetra. Nulla tristique tellus ut magna viverra egestas. Sed viverra ante libero, eu laoreet erat iaculis non. Cras ut vestibulum ex.';

        assert.equal(hash(text1), hash(dup));
        assert.notEqual(hash(text1), hash(text2));
    });
});

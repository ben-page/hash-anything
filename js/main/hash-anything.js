'use strict';
/** @module hash-anything **/
var Buffer = require('buffer').Buffer;
var createHash = require('crypto').createHash;

var TYPE = Object.freeze({
    Array: 1,
    Boolean: 2,
    Date: 3,
    Function: 4,
    Null: 5,
    Number: 6,
    Object: 7,
    RegExp: 8,
    String: 9,
    Undefined: 10,
    NaN : 11,
    PositiveInfinity: 12,
    NegativeInfinity: 13,
    Int8Array: 14,
    Uint8Array: 15,
    Uint8ClampedArray: 16,
    Int16Array: 17,
    Uint16Array: 18,
    Int32Array: 19,
    Uint32Array: 20,
    Float32Array: 21,
    Float64Array: 22,
});

function Hash(algorithm) {
    if (!(this instanceof Hash))
        throw new Error('new must be used when calling Hash()');
    if (!algorithm)
        throw new Error('algorithm is required.');

    this._buffer = new Buffer(128);
    this._index = 0;
    switch (typeof algorithm) {
        case 'string':
            this._algorithm = algorithm.toLowerCase();
            break;
        case 'function':
            this._algorithm = algorithm;
            break;
        default:
            throw new Error('unrecognized hash algorithm')
    }
}

Hash.prototype.getValue = function () {
    var hasher,
        buffer = this._buffer.slice(0, this._index);
    
    switch (this._algorithm) {
        case 'sha1':
        case 'md5':
        case 'sha256':
        case 'sha512':
            hasher = createHash(this._algorithm);
            hasher.update(buffer);
            return hasher.digest('hex');
        default:
            if (typeof this._algorithm === 'function')
                return this._algorithm(buffer);
            throw new Error('unrecognized hash algorithm: ' + this._algorithm.toString())
    }
};

Hash.prototype.hash = function (obj) {
    this._add(obj);
    return this;
};

Hash.prototype.clear = function (obj) {
    this._index = 0;
    return this;
};

Hash.prototype._resizeBuffer = function() {
    var buffer = new Buffer(this._buffer.length * 2);
    this._buffer.copy(buffer);
    this._buffer = buffer;
};

Hash.prototype._writeInt8 = function(v) {
    if (this._index + 1 >= this._buffer.length)
        this._resizeBuffer();
    
    this._buffer.writeUInt8(v, this._index++);
};

Hash.prototype._writeUInt8 = function(v) {
    if (this._index + 1 >= this._buffer.length)
        this._resizeBuffer();
    
    this._buffer.writeUInt8(v, this._index++);
};

Hash.prototype._writeInt16LE = function(v) {
    if (this._index + 2 >= this._buffer.length)
        this._resizeBuffer();
    
    this._buffer.writeUInt16LE(v, this._index);
    this._index += 2;
};

Hash.prototype._writeUInt16LE = function(v) {
    if (this._index + 2 >= this._buffer.length)
        this._resizeBuffer();
    
    this._buffer.writeUInt16LE(v, this._index);
    this._index += 2;
};

Hash.prototype._writeInt32LE = function(v) {
    if (this._index + 4 >= this._buffer.length)
        this._resizeBuffer();
    
    this._buffer.writeUInt32LE(v, this._index);
    this._index += 4;
};

Hash.prototype._writeUInt32LE = function(v) {
    if (this._index + 4 >= this._buffer.length)
        this._resizeBuffer();
    
    this._buffer.writeUInt32LE(v, this._index);
    this._index += 4;
};

Hash.prototype._writeUInt64LE = function(v) {
    if (this._index + 8 >= this._buffer.length)
        this._resizeBuffer();

    this._buffer.writeUInt32LE((v << 32) >>> 0, this._index);
    this._index += 4;
    this._buffer.writeUInt32LE(v >>> 0, this._index);
    this._index += 4;
};

Hash.prototype._writeFloatLE = function(v) {
    if (this._index + 4 >= this._buffer.length)
        this._resizeBuffer();
    
    this._buffer.writeFloatLE(v, this._index);
    this._index += 8;
};

Hash.prototype._writeDoubleLE = function(v) {
    if (this._index + 8 >= this._buffer.length)
        this._resizeBuffer();
    
    this._buffer.writeDoubleLE(v, this._index);
    this._index += 8;
};

Hash.prototype._writeString = function(v) {
    while (this._index + v.length >= this._buffer.length)
        this._resizeBuffer();

    this._buffer.write(v, this._index);
    this._index += v.length;
};

Hash.prototype._add = function(obj) {
    var className = Object.prototype.toString.call(obj);
    switch (className) {
        case '[object Array]':
            this._addArray(obj);
            return;
        case '[object Boolean]':
            this._addBoolean(obj);
            return;
        case '[object Date]':
            this._addDate(obj);
            return;
        case '[object Function]':
            this._addFunction(obj);
            return;
        case '[object Null]':
            this._addNull();
            return;
        case '[object Number]':
            this._addNumber(obj);
            return;
        case '[object Object]':
            this._addObject(obj);
            return;
        case '[object RegExp]':
            this._addRegExp(obj);
            return;
        case '[object String]':
            this._addString(obj);
            return;
        case '[object Undefined]':
            this._addUndefined();
            return;
        case '[object Int8Array]':
            this._addInt8Array(obj);
            return;
        case '[object Uint8Array]':
            this._addUint8Array(obj);
            return;
        case '[object Uint8ClampedArray]':
            this._addUint8ClampedArray(obj);
            return;
        case '[object Int16Array]':
            this._addInt16Array(obj);
            return;
        case '[object Uint16Array]':
            this._addUint16Array(obj);
            return;
        case '[object Int32Array]':
            this._addInt32Array(obj);
            return;
        case '[object Uint32Array]':
            this._addUint32Array(obj);
            return;
        case '[object Float32Array]':
            this._addFloat32Array(obj);
            return;
        case '[object Float64Array]':
            this._addFloat64Array(obj);
            return;
        default:
            this._addObject(obj);
            return;
    }
};

Hash.prototype._addArray = function(arr) {
    this._writeUInt8(TYPE.Array);

    var l = arr.length;
    for (var i = 0; i < l; i++) {
        this._addNumber(i);
        this._add(arr[i]);
    }
};

Hash.prototype._addInt8Array = function(arr) {
    this._writeUInt8(TYPE.Int8Array);
    
    var l = arr.length;
    for (var i = 0; i < l; i++)
        this._writeInt8(arr[i]);
};

Hash.prototype._addUint8Array = function(arr) {
    this._writeUInt8(TYPE.Uint8Array);
    
    var l = arr.length;
    for (var i = 0; i < l; i++)
        this._writeUInt8(arr[i]);
};

Hash.prototype._addUint8ClampedArray = function(arr) {
    this._writeUInt8(TYPE.Uint8ClampedArray);
    
    var l = arr.length;
    for (var i = 0; i < l; i++)
        this._writeUInt8(arr[i]);
};

Hash.prototype._addInt16Array = function(arr) {
    this._writeUInt8(TYPE.Int16Array);
    
    var l = arr.length;
    for (var i = 0; i < l; i++)
        this._writeInt16LE(arr[i]);
};

Hash.prototype._addUint16Array = function(arr) {
    this._writeUInt8(TYPE.Uint16Array);
    
    var l = arr.length;
    for (var i = 0; i < l; i++)
        this._writeUInt16LE(arr[i]);
};

Hash.prototype._addInt32Array = function(arr) {
    this._writeUInt8(TYPE.Int32Array);
    
    var l = arr.length;
    for (var i = 0; i < l; i++)
        this._writeInt32LE(arr[i]);
};

Hash.prototype._addUint32Array = function(arr) {
    this._writeUInt8(TYPE.Uint32Array);
    
    var l = arr.length;
    for (var i = 0; i < l; i++)
        this._writeUInt32LE(arr[i]);
};

Hash.prototype._addFloat32Array = function(arr) {
    this._writeUInt8(TYPE.Float32Array);
    
    var l = arr.length;
    for (var i = 0; i < l; i++)
        this._writeFloatLE(arr[i]);
};

Hash.prototype._addFloat64Array = function(arr) {
    this._writeUInt8(TYPE.Float64Array);
    
    var l = arr.length;
    for (var i = 0; i < l; i++)
        this._writeDoubleLE(arr[i]);
};

Hash.prototype._addBoolean = function(bool) {
    this._writeUInt8(TYPE.Boolean);
    this._writeUInt8(bool ? 0xF : 0xFF);
};

Hash.prototype._addDate = function(date) {
    this._writeUInt8(TYPE.Date);
    this._writeUInt64LE(+date);
};

Hash.prototype._addFunction = function(func) {
    this._writeUInt8(TYPE.Function);
    this._writeString(func.toString());
    
    var proto = Object.getPrototypeOf(func);
    if (proto && proto !== Object.prototype)
        this._addObject(proto);
};

Hash.prototype._addNull = function() {
    this._writeUInt8(TYPE.Null);
};

Hash.prototype._addNumber = function(number) {
    if (isFinite(number)) {
        if (Math.floor(number) === number) { //integers
            this._writeUInt8(TYPE.Number);
            this._writeUInt64LE(number);
        } else { //decimal & float numbers
            this._writeUInt8(TYPE.Number);
            this._writeDoubleLE(number);
        }
    } else {
        if (isNaN(number))
            this._writeUInt8(TYPE.NaN);
        else if (number === Number.POSITIVE_INFINITY)
            this._writeUInt8(TYPE.PositiveInfinity );
        else if (number === Number.NEGATIVE_INFINITY)
            this._writeUInt8(TYPE.NegativeInfinity);
        else
            throw new Error('unhandled infinite number');
    }
}

Hash.prototype._addObject = function(obj) {
    this._writeUInt8(TYPE.Object);

    for (var propertyName in obj) {
        if (obj.hasOwnProperty(propertyName)) {
            if (this.includeFunc) {
                if (!this.includeFunc(obj, propertyName))
                    continue;
            }

            this._addString(propertyName);
            this._add(obj[propertyName]);
        }
    }
    
    var proto = Object.getPrototypeOf(obj);
    if (proto && proto !== Object.prototype)
        this._addObject(proto);
};

Hash.prototype._addRegExp = function(regex) {
    this._writeUInt8(TYPE.Regex);
    this._writeString(regex.toString());
};

Hash.prototype._addString = function(str) {
    this._writeUInt8(TYPE.String);
    this._writeString(str);
};

Hash.prototype._addUndefined = function() {
    this._writeUInt8(TYPE.Undefined);
};

module.exports = {
    /**
     * Constructor for Hash object
     * @param algorithm {String} - algorithm to use to calculate the hash: 'sha1', 'md5', 'sha256', 'sha512'
     * @constructor
     */
    Hash: Hash,
    /**
     * Returns the SHA1 hash of anything
     * @param anything
     */
    sha1: function (anything) {
        var hash = new Hash('sha1');
        hash.hash(anything);
        return hash.getValue();
    },
    /**
     * Returns the MD5 hash of anything
     * @param anything
     */
    md5: function (anything) {
        var hash = new Hash('md5');
        hash.hash(anything);
        return hash.getValue();
    },
    /**
     * Returns the SHA256 hash of anything
     * @param anything
     */
    sha256: function (anything) {
        var hash = new Hash('sha256');
        hash.hash(anything);
        return hash.getValue();
    },
    /**
     * Returns the SHA512 hash of anything
     * @param anything
     */
    sha512: function (anything) {
        var hash = new Hash('sha512');
        hash.hash(anything);
        return hash.getValue();
    }
};
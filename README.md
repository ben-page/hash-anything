# hash-anything
Hash any Javascript primitive or object.

## Simple Usage

### sha1(anything)
```javascript
var sha1 = require('hash-anything').sha1;

var hash = sha1({
    a: 1,
    b: 2
});

console.log(hash); //a8fe01c7b160932d628ba94d8400b6615846e791
```

### md5(anything)
```javascript
var md5 = require('hash-anything').md5;

var hash = md5({
    a: 1,
    b: 2
});

console.log(hash); //f8761944960a318b27a1ee4104351f8a
```

### sha256(anything)
```javascript
var sha256 = require('hash-anything').sha256;

var hash = sha256({
    a: 1,
    b: 2
});

console.log(hash); //3c6d145329ac03391eb3db110935dbbc9e006af8c9da674f0c01b2c0e04f1fa6
```

### sha512(anything)
```javascript
var sha512 = require('hash-anything').sha512;

var hash = sha512({
    a: 1,
    b: 2
});

console.log(hash); //4f54bacd20498e42ca5c0f1c275032eb47b740e1a81db5af835d6310fc6b92ff678d09a9cb15c12e3f8780886c91c8ea242bd28de60618af8dd9b70620746fb6
```

##Advanced Usage

### Hash Object
```javascript
var Hash = require('hash-anything').Hash;

var hash = new Hash('sha1')
    .hash(1234)
    .hash('some text')
    .hash(new Date(2013, 1, 1))
    .hash(567.89)
    .hash(/regex/);

console.log(hash.getValue()); //2e3518275983ee7ad81cc9a68fdc634ea9777dfc
```

### Custom Hashing Algorithm
Use any hashing routine that can take a Buffer.
This example uses the [xxhash module](https://github.com/mscdex/node-xxhash). It implements [xxHash](https://github.com/Cyan4973/xxHash). xxHash is a fast, non-cryptographic hash algorithm. Do not use it for security, but it's great for comparing, caching, indexing, etc.
```javascript
var Hash = require('hash-anything').Hash;
var XXHash = require('xxhash');

var hash = new Hash(function(buf) {
    var hasher = new XXHash(0x6d4e9ec6); //random seed
    hasher.update(buf);
    return hasher.digest();
})
    .hash(1234)
    .hash('some text')
    .hash(new Date(2013, 1, 1))
    .hash(567.89)
    .hash(/regex/);

console.log(hash.getValue()); //3804156080
```
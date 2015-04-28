# hash-anything
Hash any Javascript primitive or object using [xxHash](https://github.com/Cyan4973/xxHash). xxHash is fast, but non-cryptographic, so do not use this module for security. It's for comparing, caching, indexing, etc.

## Usage

```javascript
var Hash = require('hash-anything').Hash;

var hash1 = new Hash()
    .hash(1234)
    .hash('some text')
    .hash(new Date(2013, 1, 1))
    .hash(567.89)
    .hash(/regex/);

var hash2 = new Hash()
    .hash(1234)
    .hash('some text')
    .hash(new Date(2013, 1, 1))
    .hash(567.89)
    .hash(/regex/);

console.log(hash1.getValue()); //3804156080
console.log(hash2.getValue()); //3804156080
```

or

```javascript
var hash = require('hash-anything').hash;

var hash1 = hash({
    a: 1,
    b: 2
});

var hash2 = hash({
    a: 1,
    b: 2
});

var hash3 = hash({
    a: 1,
    b: 2,
    c: 3
});

console.log(hash1); //410437237
console.log(hash2); //410437237
console.log(hash3); //2822873007
```
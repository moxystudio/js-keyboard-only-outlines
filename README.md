# keyboard-only-outlines

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

[npm-url]:https://npmjs.org/package/keyboard-only-outlines
[downloads-image]:https://img.shields.io/npm/dm/keyboard-only-outlines.svg
[npm-image]:https://img.shields.io/npm/v/keyboard-only-outlines.svg
[travis-url]:https://travis-ci.org/moxystudio/js-keyboard-only-outlines
[travis-image]:http://img.shields.io/travis/moxystudio/js-keyboard-only-outlines/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/js-keyboard-only-outlines
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/js-keyboard-only-outlines/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/js-keyboard-only-outlines
[david-dm-image]:https://img.shields.io/david/moxystudio/js-keyboard-only-outlines.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/js-keyboard-only-outlines?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/js-keyboard-only-outlines.svg
[greenkeeper-image]:https://badges.greenkeeper.io/moxystudio/js-keyboard-only-outlines.svg
[greenkeeper-url]:https://greenkeeper.io/

Disable outlines displayed when using navigation methods other than keyboard navigation (e.g.: tab).

You can see it working in the [demo](https://moxystudio.github.io/js-keyboard-only-outlines/demo/) page.

## Installation

```sh
$ npm install keyboard-only-outlines
```

This library is written in ES9 and is using ES modules. You must compile the source code to support older browsers.

More specifically, we are using arrow functions, object spread and Array#includes which might not be available in all browsers. If you are using a bundler, such as Webpack, compiling it through Babel should suffice.

## Usage

```js
import keyboardOnlyOutlines from 'keyboard-only-outlines'

const dispose = keyboardOnlyOutlines()
// dispose will be a function which deactivates this behaviour and can be called at any time

```

The function may also be invoked with the following options: 

```js
keyboardOnlyOutlines({ styles: ..., stylesheetTarget: ... })
```

Where `styles` represents the styles to apply when a focus event is caused by mouse navigation, and `stylesheetTarget` is the node which will receive the aforementioned style. The latter option is particularly useful when dealing with ShadowDOMs.

These options have the following default values: 

```js
const defaultOptions = {
    styles: "*:focus  { outline: none !important; }",
    styleSheetParent: document.head
}
```

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

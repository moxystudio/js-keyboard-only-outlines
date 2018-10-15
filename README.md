# keyboard-only-outlines

Disable outlines caused by navigation methods other than tab-navigation.

## Installation

```
$ npm install keyboard-only-outlines
```

## Usage

```
import keyboardOnlyOutlines from 'keyboard-only-outlines'

const dispose = keyboardOnlyOutlines()
/*
* dispose will be a function which deactivates this behaviour and can be called at any time
*/
```

The function may also be invoked with the following options: 

```
keyboardOnlyOutlines({styles: ..., styleSheetParent: ...})
```

Where `styles` represents the styles to apply when a focus event is caused by mouse navigation, and `styleSheetParent` is the node which will receive the aforementioned style. The latter option is particularly useful when dealing with ShadowDOMs.

These options have the following default values: 

```
const defaultOptions = {
    styles: "*:focus  { outline: none !important; }",
    styleSheetParent: document.head
}
```
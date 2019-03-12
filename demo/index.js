import keyboardOnlyOutlines from '../src/index.js';

let tearDown = keyboardOnlyOutlines();
let outlinesEnabled = false;
const stateNode = document.querySelector('#state');
const toggleButtonNode = document.querySelector('#toggle');

toggleButtonNode.addEventListener('click', () => {
    outlinesEnabled = !outlinesEnabled;

    if (outlinesEnabled) {
        tearDown();
        stateNode.innerText = 'off';
    } else {
        tearDown = keyboardOnlyOutlines();
        stateNode.innerText = 'on';
    }
});

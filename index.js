'use strict';

const defaultOptions = {
    styles: '*:focus  { outline: none !important; }',
    styleSheetParent: document.head,
};

const createStylesheet = (options) => {
    const style = document.createElement('style');
    const targetNode = options.styleSheetParent;

    style.innerText = options.styles;

    return {
        update: () => {
            targetNode.append(style);
        },
        destroy: () => {
            if (style.parentNode === targetNode) {
                targetNode.removeChild(style);
            }
        },
    };
};

const createListeners = (styleSheet) => {
    let outlinesEnabled = true;

    const handleKeydown = (ev) => {
        const acceptedKeyCodes = [9, 37, 38, 39, 40];

        if (!outlinesEnabled && acceptedKeyCodes.includes(ev.keyCode)) {
            outlinesEnabled = true;
        }
    };

    const handleMousedown = () => {
        outlinesEnabled = false;
    };

    const handleFocusin = () => {
        if (!outlinesEnabled) {
            styleSheet.update();
        } else {
            styleSheet.destroy();
        }
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMousedown);
    document.addEventListener('focusin', handleFocusin);

    return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('mousedown', handleMousedown);
        document.removeEventListener('focusin', handleFocusin);
    };
};

const keyboardOnlyOutlines = (options) => {
    options = { ...defaultOptions, ...options };

    const stylesheet = createStylesheet(options);
    const destroyListeners = createListeners(stylesheet);

    return () => {
        stylesheet.destroy();
        destroyListeners();
    };
};

module.exports = keyboardOnlyOutlines;

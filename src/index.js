const DEFAULT_OPTIONS = {
    styles: `
*:focus {
    outline: none !important;
}
*::-moz-focus-inner {
    border: none !important;
}`,
    stylesheetTarget: document.head,
};

const ACCEPTED_KEYS = [
    9, // Tab
    37, // ArrowLeft
    38, // ArrowTop
    39, // ArrowRight
    40, // ArrowDown
];

const createStylesheet = (options) => {
    const styleNode = document.createElement('style');
    const targetNode = options.stylesheetTarget;

    styleNode.innerText = options.styles;

    return {
        apply: () => {
            targetNode.append(styleNode);
        },
        unapply: () => {
            if (styleNode.parentNode === targetNode) {
                targetNode.removeChild(styleNode);
            }
        },
    };
};

const createListeners = (styleSheet) => {
    let usingKeyboard = false;

    const handleKeydown = (ev) => {
        if (!usingKeyboard && ACCEPTED_KEYS.includes(ev.keyCode)) {
            usingKeyboard = true;
        }
    };

    const handleMousedown = () => {
        usingKeyboard = false;
    };

    const handleFocusin = () => {
        if (!usingKeyboard) {
            styleSheet.apply();
        } else {
            styleSheet.unapply();
        }
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMousedown);
    document.addEventListener('focusin', handleFocusin);

    // Trigger the focus handler if there's a focused element
    if (document.activeElement &&
        document.activeElement.tagName !== 'BODY' &&
        document.activeElement.tagName !== 'HTML') {
        handleFocusin();
    }

    return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('mousedown', handleMousedown);
        document.removeEventListener('focusin', handleFocusin);
    };
};

const keyboardOnlyOutlines = (options) => {
    options = { ...DEFAULT_OPTIONS, ...options };

    const stylesheet = createStylesheet(options);
    const destroyListeners = createListeners(stylesheet);

    return () => {
        stylesheet.unapply();
        destroyListeners();
    };
};

export default keyboardOnlyOutlines;

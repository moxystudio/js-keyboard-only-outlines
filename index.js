const defaultOptions = {
    styles: '*:focus  { outline: none !important; }',
    stylesheetTarget: document.head,
};

const acceptedKeys = { Tab: 9, ArrowLeft: 37, ArrowTop: 38, ArrowRight: 39, ArrowDown: 40 };

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
    let outlinesEnabled = true;

    const handleKeydown = (ev) => {
        const acceptedKeyCodes = Object.keys(acceptedKeys).map((k) => acceptedKeys[k]);

        if (!outlinesEnabled && Object.values(acceptedKeyCodes).includes(ev.keyCode)) {
            outlinesEnabled = true;
        }
    };

    const handleMousedown = () => {
        outlinesEnabled = false;
    };

    const handleFocusin = () => {
        if (!outlinesEnabled) {
            styleSheet.apply();
        } else {
            styleSheet.unapply();
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
        stylesheet.unapply();
        destroyListeners();
    };
};

export default keyboardOnlyOutlines;

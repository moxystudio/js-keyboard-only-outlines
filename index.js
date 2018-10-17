const DEFAULT_OPTIONS = {
    styles: '*:focus  { outline: none !important; }',
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
    let outlinesEnabled = true;

    const handleKeydown = (ev) => {
        if (!outlinesEnabled && ACCEPTED_KEYS.includes(ev.keyCode)) {
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
    options = { ...DEFAULT_OPTIONS, ...options };

    const stylesheet = createStylesheet(options);
    const destroyListeners = createListeners(stylesheet);

    return () => {
        stylesheet.unapply();
        destroyListeners();
    };
};

export default keyboardOnlyOutlines;

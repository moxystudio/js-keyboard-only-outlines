import keyboardOnlyOutlines from '../src';

describe('keyboard.only-outlines', () => {
    let dispose;
    const defaultStyles = `
*:focus {
    outline: none !important;
}
*::-moz-focus-inner {
    border: none !important;
}`;

    afterEach(() => {
        dispose();
    });

    it('should add a style node to the document\'s head', () => {
        dispose = keyboardOnlyOutlines();

        expect(document.querySelector('style')).toBe(null);

        document.dispatchEvent(new MouseEvent('mousedown'));
        document.dispatchEvent(new FocusEvent('focusin'));

        expect(document.querySelector('style')).toBeTruthy();
        expect(document.querySelector('style').parentNode).toBe(document.head);
        expect(document.querySelector('style').innerText).toBe(defaultStyles);
    });

    it('should add a style node to the specified element', () => {
        dispose = keyboardOnlyOutlines({
            stylesheetTarget: document.body,
        });

        document.dispatchEvent(new MouseEvent('mousedown'));
        document.dispatchEvent(new FocusEvent('focusin'));

        expect(document.querySelector('style')).toBeTruthy();
        expect(document.querySelector('style').parentNode).toBe(document.body);
        expect(document.querySelector('style').innerText).toBe(defaultStyles);
    });

    it('should add a style tag with the speciifed rule to the document\'s head', () => {
        dispose = keyboardOnlyOutlines({
            styles: '*:focus {outline: 100px dotted green;}',
        });

        document.dispatchEvent(new MouseEvent('mousedown'));
        document.dispatchEvent(new FocusEvent('focusin'));

        expect(document.querySelector('style').parentNode).toBe(document.head);
        expect(document.querySelector('style').innerText).toBe('*:focus {outline: 100px dotted green;}');
    });

    it('should remove the added stylesheet from the document\'s head', () => {
        dispose = keyboardOnlyOutlines();

        document.dispatchEvent(new MouseEvent('mousedown'));
        document.dispatchEvent(new FocusEvent('focusin'));

        expect(document.querySelector('style')).toBeTruthy();
        expect(document.querySelector('style').parentNode).toBe(document.head);
        expect(document.querySelector('style').innerText).toBe(defaultStyles);

        document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 98 }));
        document.dispatchEvent(new FocusEvent('focusin'));

        expect(document.querySelector('style')).toBeTruthy();
        expect(document.querySelector('style').parentNode).toBe(document.head);
        expect(document.querySelector('style').innerText).toBe(defaultStyles);

        document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 9 }));
        document.dispatchEvent(new FocusEvent('focusin'));

        expect(document.querySelector('style')).toBe(null);
    });

    it('should add a style node to the document\'s head if there\'s an active element', () => {
        const div = document.createElement('div');

        div.setAttribute('tabIndex', 1);
        div.focus();
        document.body.appendChild(div);

        dispose = keyboardOnlyOutlines();

        expect(document.querySelector('style')).toBeTruthy();
        expect(document.querySelector('style').parentNode).toBe(document.head);
        expect(document.querySelector('style').innerText).toBe(defaultStyles);
    });
});

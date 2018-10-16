import keyboardOnlyOutlines from '../';

describe('keyboard.only-outlines', () => {
    let dispose;

    beforeAll(() => {
        const style = document.createElement('style');

        style.innerText = '*:focus {outline: 1 px solid red;}';
        document.head.append(style);

        document.body.innerHTML = '<button></button>' +
        '<input/>' +
        "<input type='radio' name='test'/>" +
        "<input type='radio' name='test'/>" +
        "<input type='radio' name='test'/>";
    });

    afterEach(() => {
        dispose();
    });

    it("should add a style node to the document's head", () => {
        dispose = keyboardOnlyOutlines();

        document.querySelector('button').dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        expect(document.head.children.length).toBe(1);

        document.dispatchEvent(new MouseEvent('mousedown'));
        document.querySelector('button').dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        expect(document.head.children.length).toBe(2);
        expect(document.head.children[1].localName).toBe('style');
        expect(document.head.children[1].innerText).toBe('*:focus  { outline: none !important; }');
    });

    it('should add a style node to the specified element', () => {
        dispose = keyboardOnlyOutlines({
            styleSheetParent: document.body,
        });

        document.dispatchEvent(new MouseEvent('mousedown'));

        const bodyChildren = document.body.children.length;

        document.querySelector('button').dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        expect(document.body.children.length).toBe(bodyChildren + 1);
        expect(document.body.children[bodyChildren].localName).toBe('style');
        expect(document.body.children[bodyChildren].innerText).toBe('*:focus  { outline: none !important; }');
    });

    it("should add a style tag with the speciifed rule to the document's head", () => {
        dispose = keyboardOnlyOutlines({
            styles: '*:focus {outline: 100px dotted green;}',
        });

        document.dispatchEvent(new MouseEvent('mousedown'));
        document.querySelector('button').dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        expect(document.head.children[1].localName).toBe('style');
        expect(document.head.children[1].innerText).toBe('*:focus {outline: 100px dotted green;}');
    });

    it("should remove the added stylesheet from the document's head", () => {
        dispose = keyboardOnlyOutlines();

        document.dispatchEvent(new MouseEvent('mousedown'));
        document.querySelector('button').dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        expect(document.head.children.length).toBe(2);
        expect(document.head.children[1].localName).toBe('style');
        expect(document.head.children[1].innerText).toBe('*:focus  { outline: none !important; }');

        document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 98 }));
        document.querySelector('button').dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        expect(document.head.children.length).toBe(2);
        expect(document.head.children[1].localName).toBe('style');
        expect(document.head.children[1].innerText).toBe('*:focus  { outline: none !important; }');

        document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 9 }));
        document.querySelector('button').dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

        expect(document.head.children.length).toBe(1);
    });
});

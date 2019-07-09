import { BlackListedKeyboardShortcutChecker } from './black-listed-key-bindings.library';

export interface IKeyboardShortcutListenerOptions { // defaults with ?
    /**
     * @property {KeyboardShortcutCombination}
     */
    keyBinding: KeyboardShortcutCombination;
    /**
     * @property {string} to explain to the user what the shortcut combination you made will do
     */
    description: string;
    /**
     * @property { number } the order of presedence when more than one key matches
     */
    priority?: number;
    /**
     * @property { boolean } if this is true, and you are inside a text box and do shortcut it wouldn't actually fire
     */
    passToLowerPriorities?: boolean;
    /**
     * @property { boolean } if this is true, and you are inside a text box and do shortcut it wouldn't actually fire
     */
    ignoreEventsFromInputElement?: boolean;
    /**
     * @property { boolean } if this is true it doesn't show in the help window
     */
    omitFromHelp?: boolean;
}

export interface IKeyboardShortcutListenerConstructorObject
    extends IKeyboardShortcutListenerOptions {
    handler: KeyboardShortcutHandler;
}

export interface IKeyboardShortcutListener {
    /**
     * @property {KeyboardShortcutCombination}
     */
    keyBinding: KeyboardShortcutCombination;
    /**
     * @property {string} to explain to the user what the shortcut combination you made will do
     */
    description: string;
    /**
     * @property {KeyboardShortcutHandler} 
     */
    handler: KeyboardShortcutHandler;
    /**
     * @property { number } the order of presedence when more than one key matches
     */
    priority: number;
    /**
     * @property {boolean} if this is true then pass down from prioritze low to high, if false do the opposite
     */
    passToLowerPriorities: boolean;
    /**
     * @property { boolean } if this is true, and you are inside a text box and do shortcut it wouldn't actually fire
     */
    ignoreEventsFromInputElement: boolean;
    /**
     * @property { string } representation of the keyboard combination normalized for processing
     */
    mappedKeyboardShortcutCombination: string;
    /**
     * @property { string } displays a printer friendly version of the key combination
     */
    displayShortcutCombination: string;
    /**
     * @property { boolean } if this is true it doesn't show in the help window
     */
    omitFromHelp: boolean;
}

export class KeyboardShortcutListener implements IKeyboardShortcutListener {
    /**
     * @property {KeyboardShortcutCombination}
     */
    keyBinding: KeyboardShortcutCombination;
    /**
     * @property {string} to explain to the user what the shortcut combination you made will do
     */
    description: string;
    /**
     * @property { number } the order of presedence when more than one key matches
     */
    priority: number;
    /**
     * @property {KeyboardShortcutHandler} 
     */
    handler: KeyboardShortcutHandler;
    /**
     * @property {boolean} if this is true then pass down from prioritze low to high, if false do the opposite
     */
    passToLowerPriorities: boolean;
    /**
     * @property { boolean } if this is true, and you are inside a text box and do shortcut it wouldn't actually fire
     */
    ignoreEventsFromInputElement: boolean;
    /**
     * @property { string } representation of the keyboard combination normalized for processing
     */
    mappedKeyboardShortcutCombination: string;
    /**
     * @property { string } displays a printer friendly version of the key combination
     */
    displayShortcutCombination: string;
    /**
     * @property { boolean } if this is true it doesn't show in the help window
     */
    omitFromHelp: boolean;

    constructor(
        listenerConstructorObject: IKeyboardShortcutListenerConstructorObject,
        blackListedKeyboardShortcutChecker?: BlackListedKeyboardShortcutChecker
    ) {
        // assign properties based on constructor and defaults
        let defaultListenerOptions = {
            ignoreEventsFromInputElement: false,
            omitFromHelp: false,
            passToLowerPriorities: true,
            priority: 0
        };
        Object.assign(this, defaultListenerOptions, listenerConstructorObject);

        // assign mapped keyboard shortcut combination
        this.mappedKeyboardShortcutCombination = mapKeyboardShortcutCombination(
            this.keyBinding
        );

        // assign display shortcut combination
        const copyOfKeyBinding = [...this.keyBinding];
        copyOfKeyBinding.sort((a, b) => {
            if (a.length > 1 && b.length === 1) {
                return -1;
            } else if (a.length === 1 && b.length > 1) {
                return 1;
            } else if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            } else {
                return 0;
            }
        });
        this.displayShortcutCombination = copyOfKeyBinding
            .map((kb) => kb.replace(/^\w/, (c) => c.toUpperCase()))
            .join(' + ');

        // check vs blacklist
        if (blackListedKeyboardShortcutChecker) {
            blackListedKeyboardShortcutChecker.check(this);
        }
    }
}
/**
 * @interface represents the handle of a listener
 */
export interface IListenerHandle {
    /**
     * @description removes this listener
     */
    remove(): void;
}
/**
 * @type { event: KeyboardEvent } it is handler to keep track of the listeners
 */
export type KeyboardShortcutHandler = (event: KeyboardEvent) => void;
/**
 * @enum this allows you to map special keys into your Keyboard Combination
 */
export enum KeyboardKeys {
    Ctrl = 'ctrl',
    Alt = 'alt',
    Shift = 'shift',
    Escape = 'escape'
}
/**
 * @type the combination of keys that will call the shortcut you use
 */
export type KeyboardShortcutCombination = (string | KeyboardKeys)[]; // not sure yet chris take care of this 
/**
 * @param bindings takes in the shortcut from KeyboardShortcutCombination which is an array of strings
 * @return {string} // look up
 */
export function mapKeyboardShortcutCombination(
    bindings: KeyboardShortcutCombination
): string {
    return JSON.stringify(bindings.map((key) => key.toLowerCase()).sort());
}

// Map to normalized keys across different browser implementations.
// https://github.com/angular/angular/blob/5.0.5/packages/platform-browser/src/browser/browser_adapter.ts#L25-L42
// tslint:disable:object-literal-sort-keys
/**
 * @constant
 * Map to convert some key or keyIdentifier values to what will be returned by getEventKey
 * This is also used to help browser compatibility and to match the W3C standard
 */
export const KEY_MAP = {
    '\b': 'backspace',
    '\t': 'tab',
    '\x1B': 'escape',
    '\x7F': 'delete',
    Del: 'delete',
    Esc: 'escape',
    Left: 'arrowleft',
    Right: 'arrowright',
    Up: 'arrowup',
    Down: 'arrowdown',
    Menu: 'contextMenu',
    Scroll: 'scrolllock',
    Win: 'os',
    ' ': 'space',
    '.': 'dot'
};
// tslint:enable:object-literal-sort-keys

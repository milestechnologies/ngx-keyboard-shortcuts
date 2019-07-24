import { BlackListedKeyboardShortcutChecker } from './black-listed-key-bindings.library';
import { IKeyboardShortcutConfig } from './keyboard-shortcut-configuration.library';
/**
 * @description represents an object that is used in the construction of a new listener
 */
export interface IKeyboardShortcutListenerOptions {
    /**
     * @property {KeyboardShortcutCombination}
     */
    keyBinding: KeyboardShortcutCombination;
    /**
     * @property {string} to explain to the user what the shortcut combination you made will do
     */
    description: string;
    /**
     * @property { number } the order of precedence when more than one key matches
     */
    priority?: number;
    /**
     * @property { boolean } if this is true, and more than one keybinding matches,
     * then after resolving the first keybinding it will be passed on to the next keybinding so it can also be resolved
     */
    passToLowerPriorities?: boolean;
    /**
     * @property { boolean } if this is true, and you are inside a text box and do a shortcut it wouldn't actually fire
     */
    ignoreEventsFromInputElement?: boolean;
    /**
     * @property { boolean } if this is true it doesn't show in the help window
     */
    omitFromHelp?: boolean;

    checkBlackList?: boolean;
}

export interface IKeyboardShortcutListenerConstructorObject
    extends IKeyboardShortcutListenerOptions {
    handler: KeyboardShortcutHandler;
}
/**
 * @description represents a shortcut listener object
 */
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
     * @property { number } the order of precedence when more than one key matches
     */
    priority: number;
    /**
     * @property {boolean} if this is true, and more than one keybinding matches,
     * then after resolving the first keybinding it will be passed on to the next keybinding so it can also be resolved
     */
    passToLowerPriorities: boolean;
    /**
     * @property { boolean } if this is true, and you are inside a text box and do a shortcut it wouldn't actually fire
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

    checkBlackList?: boolean;
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
     * @property { number } the order of precedence when more than one key matches
     */
    priority: number;
    /**
     * @property {KeyboardShortcutHandler}
     */
    handler: KeyboardShortcutHandler;
    /**
     * @property {boolean} if this is true, and more than one keybinding matches,
     * then after resolving the first keybinding it will be passed on to the next keybinding so it can also be resolved
     */
    passToLowerPriorities: boolean;
    /**
     * @property { boolean } if this is true, and you are inside a text box and do a shortcut it wouldn't actually fire
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

    checkBlackList?: boolean;

    constructor(
        listenerConstructorObject: IKeyboardShortcutListenerConstructorObject,
        config: IKeyboardShortcutConfig,
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
            let areWeChecking: boolean = null;
            // check listener
            if (this.checkBlackList === true) {
                areWeChecking = true;
            } else if (this.checkBlackList === false) {
                areWeChecking = false;
            }
            // if not set check config
            if (areWeChecking === null) {
                if (config.defaultCheckBlackList === true) {
                    areWeChecking = true;
                } else if (config.defaultCheckBlackList === false) {
                    areWeChecking = false;
                }
            }
            // if not set default
            if (areWeChecking === null) {
                areWeChecking = true;
            }
            // if true run check
            if (areWeChecking) {
                blackListedKeyboardShortcutChecker.check(this);
            }
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
 * @type { event: KeyboardEvent } the function that should be run when the keyboard combination is matched
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
 * @return {string}
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

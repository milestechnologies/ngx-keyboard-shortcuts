import { BlackListedKeyboardShortcutChecker } from './black-listed-key-bindings.library';

export interface IKeyboardShortcutListenerOptions {
    keyBinding: KeyboardShortcutCombination;
    description: string;
    priority?: number;
    passToLowerPriorities?: boolean;
    ignoreEventsFromInputElement?: boolean;
    omitFromHelp?: boolean;
}

export interface IKeyboardShortcutListenerConstructorObject extends IKeyboardShortcutListenerOptions {
    handler: KeyboardShortcutHandler;
}

export interface IKeyboardShortcutListener {
    keyBinding: KeyboardShortcutCombination;
    description: string;
    handler: KeyboardShortcutHandler;
    priority: number;
    passToLowerPriorities: boolean;
    ignoreEventsFromInputElement: boolean;
    mappedKeyboardShortcutCombination: string;
    displayShortcutCombination: string;
    omitFromHelp: boolean;
}

export class KeyboardShortcutListener implements IKeyboardShortcutListener {

    keyBinding: KeyboardShortcutCombination;
    description: string;
    priority: number;
    handler: KeyboardShortcutHandler;
    passToLowerPriorities: boolean;
    ignoreEventsFromInputElement: boolean;
    mappedKeyboardShortcutCombination: string;
    displayShortcutCombination: string;
    omitFromHelp: boolean;

    constructor(
        listenerConstructorObject: IKeyboardShortcutListenerConstructorObject,
        blackListedKeyboardShortcutChecker?: BlackListedKeyboardShortcutChecker,
    ) {
        // assign properties based on constructor and defaults
        let defaultListenerOptions = {
            ignoreEventsFromInputElement: false,
            omitFromHelp: false,
            passToLowerPriorities: true,
            priority: 0,
        };
        Object.assign(this, defaultListenerOptions, listenerConstructorObject);

        // assign mapped keyboard shortcut combination
        this.mappedKeyboardShortcutCombination = mapKeyboardShortcutCombination(this.keyBinding);

        // assign display shortcut combination
        const copyOfKeyBinding = [...this.keyBinding];
        copyOfKeyBinding.sort((a, b) => {
            if (a.length > 1 && b.length === 1) {
                return (-1);
            } else if (a.length === 1 && b.length > 1) {
                return (1);
            } else if (a > b) {
                return (1);
            } else if (a < b) {
                return (-1);
            } else {
                return (0);
            }
        });
        this.displayShortcutCombination = copyOfKeyBinding.map((kb) => kb.replace(/^\w/, (c) => c.toUpperCase())).join(' + ');

        // check vs blacklist
        if (blackListedKeyboardShortcutChecker) {
            blackListedKeyboardShortcutChecker.check(this);
        }

    }

}

export interface IListenerHandle {
    remove(): void;
}

export type KeyboardShortcutHandler = (event: KeyboardEvent) => void;

export enum KeyboardKeys {
    Ctrl = 'ctrl',
    Alt = 'alt',
    Shift = 'shift',
    Escape = 'escape',
}

export type KeyboardShortcutCombination = (string | KeyboardKeys)[];

export function mapKeyboardShortcutCombination(bindings: KeyboardShortcutCombination): string {
    return JSON.stringify(bindings.map((key) => key.toLowerCase()).sort());
}

// Map to normalized keys across different browser implementations.
// https://github.com/angular/angular/blob/5.0.5/packages/platform-browser/src/browser/browser_adapter.ts#L25-L42
// tslint:disable:object-literal-sort-keys
export const KEY_MAP = {
    '\b': 'backspace',
    '\t': 'tab',
    '\x1B': 'escape',
    '\x7F': 'delete',
    'Del': 'delete',
    'Esc': 'escape',
    'Left': 'arrowleft',
    'Right': 'arrowright',
    'Up': 'arrowup',
    'Down': 'arrowdown',
    'Menu': 'contextMenu',
    'Scroll': 'scrolllock',
    'Win': 'os',
    ' ': 'space',
    '.': 'dot',
};
// tslint:enable:object-literal-sort-keys

import { Injectable, isDevMode } from '@angular/core';
import { NgZone } from '@angular/core';

import {
    KeyboardShortcutHandler,
    IListenerHandle,
    mapKeyboardShortcutCombination,
    KeyboardKeys,
    IKeyboardShortcutListenerConstructorObject,
    KeyboardShortcutListener,
    IKeyboardShortcutListener,
    KEY_MAP
} from './libraries/listener.library';
import { BlackListedKeyboardShortcutChecker } from './libraries/black-listed-key-bindings.library';

@Injectable()
export class KeyboardShortcutsService {
    private _listeners: IKeyboardShortcutListener[] = [];
    private zone: NgZone;

    get listeners_read_only(): IKeyboardShortcutListener[] {
        return JSON.parse(JSON.stringify(this._listeners));
    }

    blackListedKeyboardShortcutChecker: BlackListedKeyboardShortcutChecker;

    constructor(zone: NgZone) {
        this.zone = zone;

        // Since we're going to create a root event-handler for the keydown event, we're
        // gonna do this outside of the NgZone. This way, we're not constantly triggering
        // change-detection for every key event - we'll only re-enter the Angular Zone
        // when we have an event that is actually being consumed by one of our components.
        this.zone.runOutsideAngular(
            (): void => {
                window.addEventListener('keydown', this.handleKeyboardEvent);
            }
        );

        // we only use this if isDevMode
        if (isDevMode()) {
            this.blackListedKeyboardShortcutChecker = new BlackListedKeyboardShortcutChecker();
        }
    }

    // setup a listener and return the listener
    public listen(
        listenerConstructorObject: IKeyboardShortcutListenerConstructorObject
    ): IListenerHandle {
        const listenerHandle = this.addListener(listenerConstructorObject);
        return listenerHandle;
    }

    private addListener(
        listenerConstructorObject: IKeyboardShortcutListenerConstructorObject
    ): IListenerHandle {
        const listener = new KeyboardShortcutListener(
            listenerConstructorObject,
            this.blackListedKeyboardShortcutChecker
        );

        const listenerHandle: IListenerHandle = {
            remove: (): void => {
                this.removeListener(listener);
            }
        };
        this._listeners.push(listener);
        this._listeners.sort(
            (
                a: IKeyboardShortcutListener,
                b: IKeyboardShortcutListener
            ): number => {
                if (a.priority < b.priority) {
                    return 1;
                } else if (a.priority > b.priority) {
                    return -1;
                } else {
                    return 0;
                }
            }
        );
        return listenerHandle;
    }

    // get the keyCombination from the given event
    private getKeyFromEvent(event: KeyboardEvent): string {
        const keyIdentifier = 'keyIdentifier';
        let key = event.key || event[keyIdentifier] || 'Unidentified';

        if (key.startsWith('U+')) {
            key = String.fromCharCode(parseInt(key.slice(2), 16));
        }

        let parts = [<string>(KEY_MAP[key] || key)];

        if (event.altKey) {
            parts.push(KeyboardKeys.Alt);
        }
        if (event.ctrlKey) {
            parts.push(KeyboardKeys.Ctrl);
        }
        if (event.shiftKey) {
            parts.push(KeyboardKeys.Shift);
        }

        return mapKeyboardShortcutCombination(parts);
    }

    // handle the keyboard events for the root handler (and delegate to the listeners).
    private handleKeyboardEvent(event: KeyboardEvent): void {
        let keyCombination = this.getKeyFromEvent(event);
        let isInputEvent = this.isEventFromInput(event);
        let handler: KeyboardShortcutHandler;

        // Iterate over the listeners in DESCENDING priority order.
        for (let listener of this._listeners) {
            if (listener.mappedKeyboardShortcutCombination === keyCombination) {
                handler = listener.handler;

                // Execute handler if this is NOT an input event that we need to ignore.
                if (!isInputEvent || !listener.ignoreEventsFromInputElement) {
                    // Right now, we're executing outside of the NgZone. As such, we
                    // have to re-enter the NgZone so that we can hook back into change-
                    // detection. Plus, this will also catch errors and propagate them
                    // through application properly.
                    this.zone.runGuarded(
                        (): boolean | void => {
                            return handler(event);
                        }
                    );

                    // If the handler returned an explicit False, we're going to treat
                    // this listener as Terminal, regardless of the original settings.
                    if (!listener.passToLowerPriorities) {
                        return;
                    } else {
                        continue;
                    }
                }
            }
        }
    }

    // used for testing
    sendKeyboardEventToHandler(event: KeyboardEvent): void {
        this.handleKeyboardEvent(event);
    }

    // determine if the given event originated from a form input element.
    private isEventFromInput(event: KeyboardEvent): boolean {
        if (event.target instanceof Node) {
            switch (event.target.nodeName) {
                case 'INPUT':
                case 'SELECT':
                case 'TEXTAREA':
                    return true;
                default:
                    return false;
            }
        }
        return false;
    }

    // remove the given listener from the internal collection.
    private removeListener(listenerToRemove: IKeyboardShortcutListener): void {
        this._listeners = this._listeners.filter(
            (listener: IKeyboardShortcutListener): boolean => {
                return listener !== listenerToRemove;
            }
        );
    }
}

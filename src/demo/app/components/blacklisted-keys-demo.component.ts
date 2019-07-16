import { Component, OnDestroy } from '@angular/core';
import {
    KeyboardShortcutService,
    KeyboardKeys,
    blacklistedKeyCombinations,
    IKeyboardShortcutListenerConstructorObject
} from '../../../../dist/';

@Component({
    templateUrl: './blacklisted-keys-demo.component.html'
})
export class BlacklistedShortcutsComponent implements OnDestroy {
    listeners = [];
    blacklistedKeys = blacklistedKeyCombinations;

    constructor(private keyboardShortcutService: KeyboardShortcutService) {}

    ngOnDestroy(): void {
        // destroys all the listeners when the component is destroyed
        for (let i of this.listeners) {
            i.listener.remove();
        }
    }

    // creates and adds listener object to array listeners
    addShortcut(): void {
        const kb = [KeyboardKeys.Ctrl, 's'];
        const badKeybindingConstructor: IKeyboardShortcutListenerConstructorObject = {
            description: 'new shortcut',
            handler: this.keyClicked.bind(kb),
            keyBinding: kb
        };
        const listenerHandle = this.keyboardShortcutService.listen(
            badKeybindingConstructor
        );
        this.listeners.push({
            listener: listenerHandle,
            output: kb[0] + ' + ' + kb[1]
        });
    }

    keyClicked(): void {
        console.log('You clicked Ctrl + S');
    }

    getKeyAsString(blackListedKey: string[]): string {
        switch (blackListedKey.length) {
            case 1:
                return `${blackListedKey[0]}`;
            case 2:
                return `${
                    blackListedKey[0]
                } + ${blackListedKey[1].toUpperCase()}`;
            case 3:
                return `${blackListedKey[0]} + ${
                    blackListedKey[1]
                } + ${blackListedKey[2].toUpperCase()}`;
            default:
                return '';
        }
    }
}

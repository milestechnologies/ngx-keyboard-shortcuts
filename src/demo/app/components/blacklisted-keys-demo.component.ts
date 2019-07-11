import { Component, OnInit } from '@angular/core';
import {
    KeyboardShortcutService,
    KeyboardKeys,
    blacklistedKeyCombinations,
    IKeyboardShortcutListenerConstructorObject,
    IKeyboardShortcutListenerOptions
} from '../../../../dist/';

@Component({
    templateUrl: './blacklisted-keys-demo.component.html'
})
export class BlacklistedShortcutsComponent implements OnInit {
    listeners: any[];
    blacklistedKeys = blacklistedKeyCombinations;
    badBinding: IKeyboardShortcutListenerOptions;

    constructor(private keyboardShortcutService: KeyboardShortcutService) {}

    ngOnInit(): void {
        this.listeners = [];
    }

    ngOnDestroy(): void {
        // destroys all the listeners when the component is destroyed
        for (let i of this.listeners) {
            i.listener.remove();
        }
    }

    // creates and adds listener object to array listeners
    addShortcut(): void {
        const newListenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
        const kb = [KeyboardKeys.Ctrl, 's'];
        Object.assign(
            newListenerConstructor,
            {
                handler: this.keyClicked.bind(kb)
            },
            {
                description: 'new shortcut',
                keyBinding: kb
            }
        );
        this.listeners.push({
            listener: this.keyboardShortcutService.listen(
                newListenerConstructor
            ),
            output: kb[0] + ' + ' + kb[1]
        });
    }

    keyClicked(): void {
        return console.log('You clicked Ctrl + S');
    }

    getKeyAsString(blackListedKey: string[]): string {
        if (blackListedKey.length === 1) {
            return `${blackListedKey[0]}`;
        }
        if (blackListedKey.length === 2) {
            return `${blackListedKey[0]} + ${blackListedKey[1].toUpperCase()}`;
        }
        if (blackListedKey.length === 3) {
            return `${blackListedKey[0]} + ${
                blackListedKey[1]
            } + ${blackListedKey[2].toUpperCase()}`;
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { blacklistedKeyCombinations } from '../../../libraries/black-listed-key-bindings.library';
import {
    KeyboardShortcutService,
    KeyboardKeys,
    IKeyboardShortcutListenerConstructorObject,
    IKeyboardShortcutListenerOptions
} from '../../../../dist/';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    templateUrl: './blacklisted-keys-demo.component.html'
})
export class BlacklistedShortcutsComponent implements OnInit {
    form = new FormGroup({
        key1: new FormControl(''),
        key2: new FormControl('')
    });
    listenerObjectStatus: string;
    outputArray = [];
    listeners: any[];
    blacklistedKeys = blacklistedKeyCombinations;
    badBinding: IKeyboardShortcutListenerOptions;

    constructor(private keyboardShortcutService: KeyboardShortcutService) {}

    makeStringy(object: any): string {
        return JSON.stringify(object);
    }

    ngOnInit(): void {
        this.listenerObjectStatus = '';
        this.listeners = [];
        this.outputArray = [];
        // populating element that displays current Keyboard Listeners
        this.populateOutputArray();
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
        this.populateOutputArray();
    }
    populateOutputArray(): void {
        this.outputArray = [];
        for (let i of this.listeners) {
            this.outputArray.push(i.output);
        }
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
            return `${blackListedKey[0]} + ${blackListedKey[1]} + ${blackListedKey[2].toUpperCase()}`;
        }
    }
}

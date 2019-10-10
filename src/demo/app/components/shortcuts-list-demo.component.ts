import { Component, OnInit } from '@angular/core';
import {
    KeyboardKeys,
    IKeyboardShortcutListenerConstructorObject,
    IKeyboardShortcutListenerOptions
} from '../../../../dist';
import { IKeyboardShortcutListener, KeyboardShortcutService } from '../../../../dist';

@Component({
    selector: 'app-shortcuts-list-demo',
    templateUrl: './shortcuts-list-demo.component.html'
})
export class ShortcutsListDemo implements OnInit {
    showShortcuts = false;
    sayHelloShortcutDef: IKeyboardShortcutListenerOptions;
    addOnePlusOneShortcutDef: IKeyboardShortcutListenerOptions;
    favoriteColorShortcutDef: IKeyboardShortcutListenerOptions;
    shortcuts: IKeyboardShortcutListener[];

    constructor(private keyboardShortcutService: KeyboardShortcutService) {}

    ngOnInit() {
        this.sayHelloShortcutDef = {
            description: 'Say Hello!',
            keyBinding: [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 'H']
        };

        this.addOnePlusOneShortcutDef = {
            description: 'Find out what 1 + 1 is!',
            keyBinding: [KeyboardKeys.Alt, 'A']
        };

        this.favoriteColorShortcutDef = {
            description: 'Find out my favorite color!',
            keyBinding: [KeyboardKeys.Shift, 'C']
        };
    }

    setAndShowShortcuts() {
        this.showShortcuts = true;

        this.shortcuts = this.keyboardShortcutService.listeners_read_only;
    }

    sayHello() {
        alert('Hello there!');
    }

    addOnePlusOne() {
        alert('1 + 1 = ' + (1+1));
    }
    
    favoriteColor() {
        alert('My favorite color is Blue!');
    }
}

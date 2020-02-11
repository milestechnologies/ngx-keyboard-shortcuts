import { Component, OnInit } from '@angular/core';
import {
    KeyboardKeys,
    IKeyboardShortcutListenerOptions
} from '../../../../dist';

@Component({
    selector: 'app-directive-button-demo',
    styles: [
        `
            pre code {
                background-color: #eee;
                border: 1px solid #999;
                display: block;
                padding: 20px;
            }
        `
    ],
    templateUrl: './directive-button-demo.component.html'
})
export class DirectiveButtonDemo implements OnInit {
    code_bit_2: string;
    code_bit_1: string;
    keyboardShortcutDef: IKeyboardShortcutListenerOptions = {
        description: 'simple, individual, demo shortcut',
        keyBinding: [KeyboardKeys.Ctrl, 'i']
    };
    constructor() {}
    ngOnInit(): void {
        this.code_bit_1 = `
      <button [keyboardShortcut]="keyboardShortcutDef" (click)="alertMessage()">
          Show the Message
      </button>
      `;
        this.code_bit_2 = `
      keyboardShortcutDef: IKeyboardShortcutListenerOptions = {
        description: 'simple, individual, demo shortcut',
        keyBinding: [KeyboardKeys.Ctrl, 'i'],
      };
    `;
    }
    alertMessage(): void {
        alert('Button Was Clicked!');
    }
}

import { Component, OnInit } from '@angular/core';
import {
    KeyboardShortcutService,
    IKeyboardShortcutListenerConstructorObject,
    KeyboardKeys,
    KeyboardShortcutCombination
} from '../../../../dist';

@Component({
    selector: 'app-single-keybinding-demo',
    templateUrl: './single-keybinding-demo.component.html'
})
export class SingleKeybindingDemoComponent implements OnInit {
    code_bit_1: string;
    code_bit_2: string;
    // global listener variable
    listener: any;
    info: string;
    constructor(private keyboardShortcutService: KeyboardShortcutService) {}

    ngOnInit(): void {
        this.code_bit_1 = `
        // global listener variable
        listener: any;
        `;
        this.code_bit_2 = `
        // creating empty constructor object
        const listenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
        // keypair
        const kb = [KeyboardKeys.Ctrl, 'm'];
        // assign properties
        Object.assign(
            listenerConstructor,
            { handler: this.alertMessage.bind(kb) },
            {
                description: 'simple, individual, demo shortcut',
                keyBinding: kb
            }
        );
        // assign to global variable
        this.listener = this.keyboardShortcutService.listen(
            listenerConstructor
        );
        `;
        // creating empty constructor object
        const listenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
        // keypair
        const kb = [KeyboardKeys.Ctrl, 'm'];
        // assign properties
        Object.assign(
            listenerConstructor,
            { handler: this.alertMessage.bind(kb) },
            {
                description: 'simple, individual, demo shortcut',
                keyBinding: kb
            }
        );
        // assign to global variable
        this.listener = this.keyboardShortcutService.listen(
            listenerConstructor
        );
        this.info = 'Active Keybinding [' + kb[0] + ' + ' + kb[1] + ']';
    }

    ngOnDestroy(): void {
        // destroys the listener OnDestroy
        this.listener.remove();
    }

    private alertMessage(): void {
        const keyboardCombo: KeyboardShortcutCombination = this as any;
        alert(
            'shortcut ' +
                keyboardCombo[0] +
                ' + ' +
                keyboardCombo[1] +
                ' successfully triggered'
        );
    }
}

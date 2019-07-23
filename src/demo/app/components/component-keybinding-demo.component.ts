import { Component, OnInit } from '@angular/core';
import {
    KeyboardShortcutService,
    IKeyboardShortcutListenerConstructorObject,
    KeyboardKeys,
    KeyboardShortcutCombination
} from '../../../../dist';
@Component({
    selector: 'app-component-keybinding-demo',
    templateUrl: './component-keybinding-demo.component.html'
})
export class ComponentKeybindingDemoComponent implements OnInit {
    listenerServiceCode = `
    ngOnInit(): void {
        // key combination
        const kb = [KeyboardKeys.Ctrl, 'm'];
        // constructor object
        const listenerConstructor = {
            description: 'simple, individual, demo shortcut',
            handler: this.alertMessage.bind(kb),
            keyBinding: kb,
        } as IKeyboardShortcutListenerConstructorObject;
        // assign to handler so we can destroy it later
        this.listener = this.keyboardShortcutService.listen(
            listenerConstructor
        );
    }
    `;
    destroyCode = `
    ngOnDestroy(): void {
        // destroys the listener OnDestroy
        this.listener.remove();
    }
    `;
    // global listener variable
    listener: any;
    kb = [KeyboardKeys.Ctrl, 'm'];
    info = 'Active Keybinding [' + this.kb[0] + ' + ' + this.kb[1] + ']';
    constructor(private keyboardShortcutService: KeyboardShortcutService) {}

    ngOnInit(): void {
        // constructor object
        const listenerConstructor = {
            description: 'simple, individual, demo shortcut',
            handler: this.alertMessage.bind(this.kb),
            keyBinding: this.kb
        } as IKeyboardShortcutListenerConstructorObject;
        // assign to handler so we can destroy it later
        this.listener = this.keyboardShortcutService.listen(
            listenerConstructor
        );
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

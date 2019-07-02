import { Component } from '@angular/core';
import { KeyboardKeys } from '../../../../dist';
import { IKeyboardShortcutListenerOptions } from '../../../libraries/listener.library';

@Component({
    selector: 'app-directive-button-demo',
    templateUrl: './directive-button-demo.component.html'
})
export class DirectiveButtonDemo {
    keyboardShortcutDef: IKeyboardShortcutListenerOptions = {
        description: 'simple, individual, demo shortcut',
        keyBinding: [KeyboardKeys.Ctrl, 'i'],
    };
    constructor() { }

    alertMessage(): void {
        alert(
            'Button Was Clicked!'
        );
    }

}

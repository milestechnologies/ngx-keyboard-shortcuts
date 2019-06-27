import { Component, OnInit } from '@angular/core';
import { KeyboardShortcutsService, IKeyboardShortcutListenerConstructorObject, KeyboardKeys, KeyboardShortcutCombination } from '../../../../dist';

@Component({
    selector: 'app-single-keybinding-demo',
    templateUrl: './single-keybinding-demo.component.html'
})
export class SingleKeybindingDemoComponent implements OnInit {
    listener: any;
    info: string;
    constructor(private keyboardShortcutService: KeyboardShortcutsService) {}

    ngOnInit() {
        const listenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
        const kb = [KeyboardKeys.Ctrl, '3'];
        Object.assign(
            listenerConstructor,
            { handler: this.alertMessage.bind(kb) },
            {
                keyBinding: kb,
                description: 'simple, individual, demo shortcut'
            }
        );
        this.listener = this.keyboardShortcutService.listen(listenerConstructor);
        this.info = 'LISTENER :: listening for [' + kb[0] + ' + ' + kb[1] + ']';
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

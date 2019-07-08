import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    KeyboardShortcutsService,
    IKeyboardShortcutListenerConstructorObject,
    KeyboardKeys
} from '../../../../dist';

@Component({
    selector: 'app-help-display-demo',
    templateUrl: './help-display-demo.component.html'
})
export class HelpDisplayDemoComponent implements OnInit, OnDestroy {
    // global listener array
    listeners: any[];
    help: any[];

    constructor(private keyboardShortcutsService: KeyboardShortcutsService) {}

    ngOnInit(): void {
        this.listeners = [];
        // creating empty constructor object
        const newListenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
        // keypair
        const kb = [KeyboardKeys.Ctrl, 's'];
        const d = 'this is the shortcut that saves';
        // assign properties
        Object.assign(
            newListenerConstructor,
            { handler: this.saveMessage.bind(kb) },
            {
                description: d,
                keyBinding: kb
            }
        );
        // push to listener array
        this.listeners.push({
            listener: this.keyboardShortcutsService.listen(
                newListenerConstructor
            ),
            output: { combo: kb[0] + ' + ' + kb[1], desc: d }
        });
        // creating empty constructor object
        const newListenerConstructor2 = {} as IKeyboardShortcutListenerConstructorObject;
        // keypair
        const kb2 = [KeyboardKeys.Ctrl, 'c'];
        const d2 = 'this is the shortcut that copies';
        // assign properties
        Object.assign(
            newListenerConstructor2,
            { handler: this.copyMessage.bind(kb2) },
            {
                description: d2,
                keyBinding: kb2
            }
        );
        // push to listener array
        this.listeners.push({
            listener: this.keyboardShortcutsService.listen(
                newListenerConstructor2
            ),
            output: { combo: kb2[0] + ' + ' + kb2[1], desc: d2 }
        });
        this.populateHelp();
    }

    ngOnDestroy(): void {
        // destroys all the listeners when the component is destroyed
        for (let i of this.listeners) {
            i.listener.remove();
        }
    }

    populateHelp(): void {
        this.help = [];
        for (let i of this.listeners) {
            this.help.push(i.output);
        }
    }

    copyMessage(): void {
        alert('copy');
    }

    saveMessage(): void {
        alert('save');
    }
}

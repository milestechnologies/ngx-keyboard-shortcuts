import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
    KeyboardShortcutsService,
    IKeyboardShortcutListenerConstructorObject,
    KeyboardShortcutCombination
} from '../../../../dist';

@Component({
    selector: 'app-shortcut-service-demo',
    templateUrl: './shortcut-service-demo.component.html'
})
export class ShortcutServiceDemoComponent implements OnInit {
    code_bit_1: string;
    code_bit_2: string;
    code_bit_3: string;
    form = new FormGroup({
        key1: new FormControl('', [Validators.required]),
        key2: new FormControl('', [Validators.required])
    });
    listenerObjectStatus: string;
    outputArray = [];
    listeners: any[];
    constructor(private keyboardShortcutsService: KeyboardShortcutsService) {}

    ngOnInit(): void {
        this.code_bit_1 = `
        listeners: any[];
        `;
        this.code_bit_2 = `
        form = new FormGroup({
            key1: new FormControl(''),
            key2: new FormControl('')
        });
        `;
        this.code_bit_3 = `
        const newListenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
        const kb = [this.form.value.key1, this.form.value.key2];
        Object.assign(
            newListenerConstructor,
            { handler: this.alertMessage.bind(kb) },
            {
                description: 'new shortcut',
                keyBinding: kb
            }
        );
        this.listeners.push({
            listener: this.keyboardShortcutsService.listen(
                newListenerConstructor
            ),
            output: kb[0] + ' + ' + kb[1]
        });
        `;
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
        if (this.form.valid) {
            const newListenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
            const kb = [this.form.value.key1, this.form.value.key2];
            Object.assign(
                newListenerConstructor,
                { handler: this.alertMessage.bind(kb) },
                {
                    description: 'new shortcut',
                    keyBinding: kb
                }
            );
            this.listeners.push({
                listener: this.keyboardShortcutsService.listen(
                    newListenerConstructor
                ),
                output: kb[0] + ' + ' + kb[1]
            });
            this.populateOutputArray();
        } else {
            // at least one field is marked invalid
            alert('at least one field in this form is invalid');
        }
    }

    // delete's listener object from array at index i
    deleteShortcut(i: number): void {
        this.listeners[i].listener.remove();
        this.listeners.splice(i, 1);
        this.populateOutputArray();
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

    populateOutputArray(): void {
        this.outputArray = [];
        for (let i of this.listeners) {
            this.outputArray.push(i.output);
        }
        this.listenerObjectStatus =
            'LISTENER OBJECT ACTIVE :: contains ' +
            this.outputArray.length +
            ' listeners';
    }
}

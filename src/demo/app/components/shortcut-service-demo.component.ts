import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
    KeyboardShortcutService,
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
    // global FormGroup variable
    form = new FormGroup({
        key1: new FormControl('', [Validators.required]),
        key2: new FormControl('', [Validators.required])
    });
    listenerObjectStatus: string;
    outputArray = [];
    // global listener array
    listeners: any[];
    constructor(private keyboardShortcutService: KeyboardShortcutService) {}

    ngOnInit(): void {
        this.code_bit_1 = `
        // global listener array
        listeners: any[];
        `;
        this.code_bit_2 = `
        // global FormGroup variable
        form = new FormGroup({
            key1: new FormControl(''),
            key2: new FormControl('')
        });
        `;
        this.code_bit_3 = `
        // creating empty constructor object
        const newListenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
        // keypair
        const kb = [this.form.value.key1, this.form.value.key2];
        // assign properties
        Object.assign(
            newListenerConstructor,
            { handler: this.alertMessage.bind(kb) },
            {
                description: 'new shortcut',
                keyBinding: kb
            }
        );
        // push to listener array
        this.listeners.push({
            listener: this.keyboardShortcutService.listen(
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
            // creating empty constructor object
            const newListenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
            // keypair
            const kb = [this.form.value.key1, this.form.value.key2];
            // assign properties
            Object.assign(
                newListenerConstructor,
                { handler: this.alertMessage.bind(kb) },
                {
                    description: 'new shortcut',
                    keyBinding: kb
                }
            );
            // push to listener array
            this.listeners.push({
                listener: this.keyboardShortcutService.listen(
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
            'Listeners Array Contains ' +
            this.outputArray.length +
            ' Listeners';
    }
}

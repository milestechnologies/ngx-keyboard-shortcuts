// import { Component, OnDestroy } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import {
//     KeyboardShortcutService,
//     IKeyboardShortcutListenerConstructorObject,
//     KeyboardShortcutCombination
// } from '../../../../dist';

// @Component({
//     styles: [
//         `
//             .margin-left-15 {
//                 margin-left: 15px;
//             }
//             .margin-bottom-0 {
//                 margin-bottom: 0;
//             }
//         `
//     ],
//     templateUrl: './shortcut-service-demo.component.html'
// })
// export class ShortcutServiceDemoComponent implements OnDestroy {
//     globalCode = `
//     // global listener array
//     listeners: any[];
//     `;
//     formGroupCode = `
//     // global FormGroup variable
//     form = new FormGroup({
//         key1: new FormControl(''),
//         key2: new FormControl('')
//     });
//     `;
//     listenerCode = `
//     // keypair
//     const kb = [this.form.value.key1, this.form.value.key2];
//     // creating object
//     const newListenerConstructor: IKeyboardShortcutListenerConstructorObject = {
//         description: 'new shortcut',
//         handler: this.alertMessage.bind(kb),
//         keyBinding: kb
//     };
//     // handle
//     const listenerHandle = this.keyboardShortcutService.listen(
//         newListenerConstructor
//     );
//     // push to listener array
//     this.listeners.push({
//         listener: listenerHandle,
//         output: kb[0] + ' + ' + kb[1]
//     });
//     `;
//     // global FormGroup variable
//     form = new FormGroup({
//         key1: new FormControl('', [Validators.required]),
//         key2: new FormControl('', [Validators.required])
//     });
//     get outputArray(): any[] {
//         return this.listeners;
//     }
//     get listenerObjectStatus(): string {
//         return `Listeners Array Contains ${this.outputArray.length} Listeners`;
//     }
//     // global listener array
//     listeners = [];
//     constructor(private keyboardShortcutService: KeyboardShortcutService) {}

//     ngOnDestroy(): void {
//         // destroys all the listeners when the component is destroyed
//         for (let i of this.listeners) {
//             i.listener.remove();
//         }
//     }

//     // creates and adds listener object to array listeners
//     addShortcut(): void {
//         // if not valid, then pop alert and dump out
//         if (!this.form.valid) {
//             alert('at least one field in this form is invalid');
//             return;
//         }
//         // keypair
//         const kb = [this.form.value.key1, this.form.value.key2];
//         // creating object
//         const newListenerConstructor: IKeyboardShortcutListenerConstructorObject = {
//             description: 'new shortcut',
//             handler: this.alertMessage.bind(kb),
//             keyBinding: kb
//         };
//         // handle
//         const listenerHandle = this.keyboardShortcutService.listen(
//             newListenerConstructor
//         );
//         // push to listener array
//         this.listeners.push({
//             listener: listenerHandle,
//             output: kb[0] + ' + ' + kb[1]
//         });
//     }

//     // delete's listener object from array at index i
//     deleteShortcut(i: number): void {
//         this.listeners[i].listener.remove();
//         this.listeners.splice(i, 1);
//     }

//     private alertMessage(): void {
//         const keyboardCombo: KeyboardShortcutCombination = this as any;
//         alert(
//             'shortcut ' +
//                 keyboardCombo[0] +
//                 ' + ' +
//                 keyboardCombo[1] +
//                 ' successfully triggered'
//         );
//     }
// }

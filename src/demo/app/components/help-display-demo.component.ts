// import { Component, OnInit, OnDestroy } from '@angular/core';
// import {
//     KeyboardShortcutService,
//     IKeyboardShortcutListenerConstructorObject,
//     KeyboardKeys
// } from '../../../../dist';

// @Component({
//     selector: 'app-help-display-demo',
//     templateUrl: './help-display-demo.component.html'
// })
// export class HelpDisplayDemoComponent implements OnInit, OnDestroy {
//     code_bit_1: string;
//     code_bit_2: string;
//     code_bit_3: string;
//     // global listener array
//     listeners: any[];
//     help: any[];

//     constructor(private keyboardShortcutService: KeyboardShortcutService) {}

//     ngOnInit(): void {
//         this.code_bit_1 = `
//         // global listener array
//         listeners: any[];
//         `;
//         this.code_bit_2 = `
//         // creating empty constructor object
//         const newListenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
//         // keypair
//         const kb = [KeyboardKeys.Ctrl, 's'];
//         const d = 'this is the shortcut that saves';
//         // assign properties
//         Object.assign(
//             newListenerConstructor,
//             { handler: this.saveMessage.bind(kb) },
//             {
//                 description: d,
//                 keyBinding: kb
//             }
//         );
//         // push to listener array
//         this.listeners.push({
//             listener: this.keyboardShortcutService.listen(
//                 newListenerConstructor
//             ),
//             output: { combo: kb[0] + ' + ' + kb[1], desc: d }
//         });
//         // creating empty constructor object
//         const newListenerConstructor2 = {} as IKeyboardShortcutListenerConstructorObject;
//         // keypair
//         const kb2 = [KeyboardKeys.Ctrl, 'c'];
//         const d2 = 'this is the shortcut that copies';
//         // assign properties
//         Object.assign(
//             newListenerConstructor2,
//             { handler: this.copyMessage.bind(kb2) },
//             {
//                 description: d2,
//                 keyBinding: kb2
//             }
//         );
//         // push to listener array
//         this.listeners.push({
//             listener: this.keyboardShortcutService.listen(
//                 newListenerConstructor2
//             ),
//             output: { combo: kb2[0] + ' + ' + kb2[1], desc: d2 }
//         });
//         `;
//         this.code_bit_3 = `
//         <label><h3>Help Window</h3></label>
//         <table cellpadding="8" style="border: groove black;width: 500px;">
//             <tr>
//                 <th>Key Combination</th>
//                 <th>Shortcut</th>
//             </tr>
//             <tr *ngFor="let e of help">
//                 <td>
//                     {{ e.combo }}
//                 </td>
//                 <td>
//                     {{ e.desc }}
//                 </td>
//             </tr>
//         </table>
//         `;
//         this.listeners = [];
//         // creating empty constructor object
//         const newListenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
//         // keypair
//         const kb = [KeyboardKeys.Ctrl, 's'];
//         const d = 'this is the shortcut that saves';
//         // assign properties
//         Object.assign(
//             newListenerConstructor,
//             { handler: this.saveMessage.bind(kb) },
//             {
//                 description: d,
//                 keyBinding: kb
//             }
//         );
//         // push to listener array
//         this.listeners.push({
//             listener: this.keyboardShortcutService.listen(
//                 newListenerConstructor
//             ),
//             output: { combo: kb[0] + ' + ' + kb[1], desc: d }
//         });
//         // creating empty constructor object
//         const newListenerConstructor2 = {} as IKeyboardShortcutListenerConstructorObject;
//         // keypair
//         const kb2 = [KeyboardKeys.Ctrl, 'c'];
//         const d2 = 'this is the shortcut that copies';
//         // assign properties
//         Object.assign(
//             newListenerConstructor2,
//             { handler: this.copyMessage.bind(kb2) },
//             {
//                 description: d2,
//                 keyBinding: kb2
//             }
//         );
//         // push to listener array
//         this.listeners.push({
//             listener: this.keyboardShortcutService.listen(
//                 newListenerConstructor2
//             ),
//             output: { combo: kb2[0] + ' + ' + kb2[1], desc: d2 }
//         });
//         this.populateHelp();
//     }

//     ngOnDestroy(): void {
//         // destroys all the listeners when the component is destroyed
//         for (let i of this.listeners) {
//             i.listener.remove();
//         }
//     }

//     populateHelp(): void {
//         this.help = [];
//         for (let i of this.listeners) {
//             this.help.push(i.output);
//         }
//     }

//     copyMessage(): void {
//         alert('copy');
//     }

//     saveMessage(): void {
//         alert('save');
//     }
// }

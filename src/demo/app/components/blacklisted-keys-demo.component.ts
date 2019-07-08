import { Component, OnInit } from '@angular/core';
import { blacklistedKeyCombinations } from '../../../libraries/black-listed-key-bindings.library';
import {
  KeyboardShortcutsService,
  KeyboardKeys,
  IKeyboardShortcutListenerConstructorObject
} from '../../../../dist/';
import { FormGroup, FormControl } from '@angular/forms';
import { IKeyboardShortcutListenerOptions } from '../../../libraries/listener.library';

@Component({
  templateUrl: './blacklisted-keys-demo.component.html'
})
export class BlacklistedShortcutsComponent implements OnInit {
  form = new FormGroup({
    key1: new FormControl(''),
    key2: new FormControl('')
  });
  listenerObjectStatus: string;
  outputArray = [];
  listeners: any[];
  blacklistedKeys = blacklistedKeyCombinations;
  badBinding: IKeyboardShortcutListenerOptions;

  constructor(private keyboardShortcutsService: KeyboardShortcutsService) {}

  makeStringy(object: any): string {
    return JSON.stringify(object);
  }

  ngOnInit(): void {
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
    const newListenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
    const kb = [KeyboardKeys.Ctrl, 's'];
    Object.assign(
        newListenerConstructor,
        {
          handler: this.keyClicked.bind(kb),
        },
        {
          description: 'new shortcut',
          keyBinding: kb
        }
      );
    this.listeners.push({
        listener: this.keyboardShortcutsService.listen(newListenerConstructor),
        output: kb[0] + ' + ' + kb[1]
      });
    this.populateOutputArray();
  }
  populateOutputArray(): void {
    this.outputArray = [];
    for (let i of this.listeners) {
      this.outputArray.push(i.output);
    }
  }
  keyClicked (): void{
    return console.log('You clicked Ctrl + S');
  }
}

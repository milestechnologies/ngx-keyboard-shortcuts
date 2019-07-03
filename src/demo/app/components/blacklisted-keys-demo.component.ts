import { Component, OnInit } from '@angular/core';
import {
  IKeyboardShortcutListenerConstructorObject
} from '../../../libraries/listener.library';
import { blacklistedKeyCombinations } from '../../../libraries/black-listed-key-bindings.library';
import {
  KeyboardShortcutsService,
  KeyboardShortcutCombination
} from '../../../../dist/';
import { FormGroup, FormControl } from '@angular/forms';
import { BlackListedKeyboardShortcutChecker } from '../../../libraries/black-listed-key-bindings.library';

@Component({
  template: `
    <div>
      <br />
      <h2 strong style="text-decoration: underline;">Blacklisting</h2>
      <label>
        Some key shortcuts are 'blacklisted' to protect functionality.
        Ctrl + 's', for example, is a traditional save shortcut.
        When a blacklisted shortcut is created you will be given an
        warning in console, but the key will still be added.
        <br />
        <br />
        <img src="demo/assets/img/error1.PNG" />
      </label>
      <br />
      <br />
      <ul style="list-style-type: none;">
        <li *ngFor="let elem of outputArray; let i = index">
          <h3>{{ elem }}</h3>
          <button
            (click)="deleteShortcut(i)"
            style="background-color: black; color: red; font-size: 22px;"
          >
            <strong>delete</strong>
          </button>
        </li>
      </ul>

      <br />
      <br />
      <div>
        <form [formGroup]="form">
          <select
            name="key1selector"
            formControlName="key1"
            style="margin-left: 2%; width: 10%; height: 25px;"
          >
            <option value="ctrl">Ctrl</option>

          </select> <select
          name="key2selector"
          formControlName="key2"
          style="margin-left: 2%; width: 3%; height: 25px;"
        >
          <option value="s">s</option>

        </select>
          <button
            (click)= "addShortcut()" (click)= "alertMessage()"
            style="margin-left: 2%; width: 10%;"
          >
            Add KeyCombo
          </button>
        </form>
      </div>

  `
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
      listener: this.keyboardShortcutsService.listen(newListenerConstructor),
      output: kb[0] + ' + ' + kb[1]
    });
    this.populateOutputArray();
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
      'Warning, shortcut is blacklisted!'
    );
  }

  populateOutputArray(): void {
    this.outputArray = [];
    for (let i of this.listeners) {
      this.outputArray.push(i.output);
    }
  }
}

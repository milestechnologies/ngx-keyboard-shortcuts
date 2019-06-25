import { Component } from '@angular/core';
import {
  KeyboardShortcutCombination,
  KeyboardKeys,
  IKeyboardShortcutListenerOptions,
  IKeyboardShortcutListenerConstructorObject
} from '../../libraries/listener.library';
import { ToastrService } from 'ngx-toastr';
import { BlackListedKeyboardShortcutChecker } from '../../libraries/black-listed-key-bindings.library';

@Component({
  template: `
    <div>
      <h1>Demo Component</h1>
      <br />

      <h2 strong style="text-decoration: underline;">Blacklisting</h2>
      <label>
        Some key shortcuts are blacklisted to protect browser functionality.
        Ctrl + 's', for example, is a traditional save shortcut in all browsers.
        Attempting to create this combination will result in an error:
        <br />
        <br />
        <img src="demo/assets/img/error1.PNG" />
        <br />
        <br />
        **CAUTION** Ignoring this error will result in a non-working shortcut.
        It is also recommended that these shortcuts remain unchanged to ensure
        proper app and browser functionality.
      </label>
      <br />
      <br />
      <button [keyboardShortcut]="kslo" (click)="save()">
        Create Shortcut
      </button>
    </div>
  `
})
export class DemoComponent {
  badBinding: IKeyboardShortcutListenerOptions;

  kslo: IKeyboardShortcutListenerOptions = {
    keyBinding: [KeyboardKeys.Ctrl, 'S'],
    description: 'test save'
  };
  setKeyboardKeys: string;
  blacklistedBindings: [];

  constructor() {}

  createBinding() {
    this.badBinding = {
      keyBinding: [KeyboardKeys.Ctrl, 's'],
      description: 'test S'
    };
    console.log(this.badBinding);
    // tslint:disable-next-line: no-unused-expression
  }

  save(): void {}
}

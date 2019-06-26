import { Component, OnInit } from '@angular/core';
import {
  KeyboardKeys,
  IKeyboardShortcutListenerOptions
} from '../../libraries/listener.library';
import { blacklistedKeyCombinations } from '../../libraries/black-listed-key-bindings.library';

@Component({
  template: `
    <div>
      <h1>ngx-keyboard-shortcuts Demo</h1>
      <br />
      <h2 strong style="text-decoration: underline;">About</h2>
      <label>
        ngx-keyboard-shortcuts package provides easy setup and management of
        (custom and widely used) keyboard shortcuts in Angular 2+
        <br />
        <br />
        Git Repo Url:
      </label>
      <label strong style="text-decoration: underline;">
        https://github.com/milestechnologies/ngx-keyboard-shortcuts
      </label>
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
        **Note** Ignoring this error will result in a non-working shortcut. It
        is also recommended that these shortcuts remain unchanged to ensure
        proper app and browser functionality.
      </label>
      <br />
      <br />
      <h3 strong style="text-decoration: underline;">
        List of Blacklisted Shortcuts
      </h3>
      <label>
        All shortcuts below are currently unavailable for custom binding (Keys,
        Use):
      </label>
      <div *ngFor="let b of blacklistedKeys">
        <li>
          <span>
            <label>
              {{ makeStringy(b) | uppercase }}
            </label>
          </span>
        </li>
      </div>
    </div>
  `
})
export class DemoComponent {
  badBinding: IKeyboardShortcutListenerOptions;
  setKeyboardKeys: string;
  constructor() {}
  blacklistedKeys = blacklistedKeyCombinations;
  key: string;
  createBadBinding() {
    this.badBinding = {
      keyBinding: [KeyboardKeys.Ctrl, 's'],
      description: 'test S'
    };
    console.log(this.badBinding);
  }
  save(): void {}
  makeStringy(object: any): string {
    return JSON.stringify(object);
  }
}

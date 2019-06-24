import { Component } from '@angular/core';
import { KeyboardShortcutsService } from '../../../dist/keyboard-shortcut.service';

@Component({
  template: `
    <h1>template</h1>
  `
})
export class DemoComponent {
  constructor(
    // private ngxKeyboardShortcutModule: NgxKeyboardShortcutModule,
    private keyboardShortcutService: KeyboardShortcutsService
  ) {}
}

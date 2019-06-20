import { Component } from '@angular/core';

@Component({
  template: `
    <h2>Demo Component</h2>

    <a [keyboardShortcut]="shortcutKeyCombination" (click)="save()">
      <strong style="text-decoration: underline;">S</strong>ave
    </a>
  `
})
export class DemoComponent {
  constructor() {}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyboardShortcutsService } from './keyboard-shortcut.service';
import { KeyboardShortcutDirective } from './keyboard-shortcut.directive';
import { KeyboardShortcutHelpWindowService } from './keyboard-shortcut-help-window.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [KeyboardShortcutDirective],
  exports: [KeyboardShortcutDirective],
  imports: [CommonModule, SweetAlert2Module.forRoot()]
})
export class NgxKeyboardShortcutModule {
  static forRoot(): any {
    return {
      ngModule: NgxKeyboardShortcutModule,
      providers: [KeyboardShortcutsService, KeyboardShortcutHelpWindowService]
    };
  }
}

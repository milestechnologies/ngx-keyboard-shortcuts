import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyboardShortcutService } from './keyboard-shortcut.service';
import { KeyboardShortcutDirective } from './keyboard-shortcut.directive';

@NgModule({
    declarations: [KeyboardShortcutDirective],
    exports: [KeyboardShortcutDirective],
    imports: [CommonModule]
})
export class NgxKeyboardShortcutModule {
    static forRoot(): any {
        return {
            ngModule: NgxKeyboardShortcutModule,
            providers: [
                KeyboardShortcutService
            ]
        };
    }
}

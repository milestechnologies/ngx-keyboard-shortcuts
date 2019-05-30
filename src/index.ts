import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyboardShortcutsService } from './keyboard-shortcut.service';

@NgModule({
    imports: [CommonModule],
    providers: [KeyboardShortcutsService],
})
export class NgxKeyboardShortcutsModule {
    static forRoot(): any {
        return {
            ngModule: NgxKeyboardShortcutsModule,
        };
    }
}

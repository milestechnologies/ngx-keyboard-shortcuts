import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyboardShortcutService } from './keyboard-shortcut.service';
import { KeyboardShortcutDirective } from './keyboard-shortcut.directive';
import { IKeyboardShortcutConfig } from './libraries/keyboard-shortcut-configuration.library';

@NgModule({
    declarations: [KeyboardShortcutDirective],
    exports: [KeyboardShortcutDirective],
    imports: [CommonModule]
})
export class NgxKeyboardShortcutModule {
    static forRoot(config: IKeyboardShortcutConfig = {}): any {
        return {
            ngModule: NgxKeyboardShortcutModule,
            providers: [
                KeyboardShortcutService,
                { provide: 'keyboard_shortcut_module_config', useValue: config}
            ]
        };
    }
}

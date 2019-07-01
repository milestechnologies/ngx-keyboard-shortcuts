import {
    Injectable,
    ComponentRef,
    ViewContainerRef,
    ComponentFactoryResolver
} from '@angular/core';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

import { KeyboardShortcutsService } from './keyboard-shortcut.service';
import {
    KeyboardShortcutCombination,
    KeyboardKeys
} from './libraries/listener.library';

@Injectable()
export class KeyboardShortcutHelpWindowService {
    private swalRef: ComponentRef<SwalComponent>;
    public swalInstance: SwalComponent;

    options: SweetAlertOptions = {
        html: '',
        showCancelButton: false,
        showCloseButton: false,
        showConfirmButton: false,
        title: 'Keyboard Shortcuts'
    };

    get helpWindowAvailable(): boolean {
        return this.swalInstance ? true : false;
    }

    public constructor(
        private readonly resolver: ComponentFactoryResolver,
        private readonly keyboardShortcutsService: KeyboardShortcutsService
    ) {}

    public setViewContainerRef(
        viewContainerRef: ViewContainerRef,
        helpKeyBinding?: KeyboardShortcutCombination
    ): void {
        // bypass if already initialized
        if (this.swalInstance) {
            return;
        }

        // create the swal
        this.createSwal(viewContainerRef);

        // add binding to show the help window
        const defaultBinding: KeyboardShortcutCombination = [
            KeyboardKeys.Alt,
            KeyboardKeys.Shift,
            'h'
        ];
        const keyBinding = helpKeyBinding || defaultBinding;
        this.keyboardShortcutsService.listen({
            description: null,
            handler: this.showHelpWindow.bind(this),
            keyBinding: keyBinding,
            omitFromHelp: true
        });
    }

    public showHelpWindow(): void {
        if (this.swalInstance) {
            this.options.html = this.buildHtml();
            this.swalInstance.options = this.options;
            this.swalInstance.show();
        } else {
            console.warn(
                'KeyboardShortcutHelpWindowService: Failed to show help window since swalInstance was not found.  Ensure setViewContainerRef has been called'
            );
        }
    }

    private createSwal(viewContainerRef: ViewContainerRef): void {
        const factory = this.resolver.resolveComponentFactory(SwalComponent);
        this.swalRef = viewContainerRef.createComponent(factory);
        this.swalInstance = this.swalRef.instance;
    }

    private buildHtml(): string {
        let html = `
        <br/>
        <div style="text-align: left; margin-left: 30px;">
        `;
        const shortcutsToShow = this.keyboardShortcutsService.listeners_read_only.filter(
            (ks) => !ks.omitFromHelp
        );
        shortcutsToShow.forEach((s) => {
            html += `
            <div style="margin-bottom: 25px"><strong class="well well-sm">${
                s.displayShortcutCombination
            }</strong><span style="margin-left: 15px">${
                s.description
            }</span></div>
            `;
        });
        html += `
        </div>
        <br/>
        `;
        return html;
    }
}

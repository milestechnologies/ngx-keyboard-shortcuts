import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ElementRef
} from '@angular/core';

import { KeyboardShortcutsService } from './keyboard-shortcut.service';
import {
  IListenerHandle,
  IKeyboardShortcutListenerOptions,
  IKeyboardShortcutListenerConstructorObject
} from './libraries/listener.library';

@Directive({
  selector: '[keyboardShortcut]'
})
export class KeyboardShortcutDirective implements OnInit, OnDestroy {
  @Input() public keyboardShortcut: IKeyboardShortcutListenerOptions;
  @Input() public fireClickEventOnKeyboardShortcut = true;
  @Output() public onKeyboardShortcut = new EventEmitter<KeyboardEvent>();

  private listener: IListenerHandle;

  public constructor(
    private elRef: ElementRef,
    private keyboardShortcutService: KeyboardShortcutsService
  ) {}

  public ngOnInit(): void {
    if (this.keyboardShortcut) {
      let listenerConstructor = {} as IKeyboardShortcutListenerConstructorObject;
      Object.assign(
        listenerConstructor,
        { handler: this.keyboardShortcutHandler.bind(this) },
        this.keyboardShortcut
      );
      this.listener = this.keyboardShortcutService.listen(listenerConstructor);
    }
  }

  private keyboardShortcutHandler(event: KeyboardEvent): void {
    if (this.fireClickEventOnKeyboardShortcut) {
      if (
        this.elRef &&
        this.elRef.nativeElement &&
        this.elRef.nativeElement.click
      ) {
        this.elRef.nativeElement.click();
      }
    }
    this.onKeyboardShortcut.emit(event);
  }

  public ngOnDestroy(): void {
    if (this.listener) {
      this.listener.remove();
    }
  }
}

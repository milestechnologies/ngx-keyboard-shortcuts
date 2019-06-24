import { isDevMode } from '@angular/core';

import {
  KeyboardKeys,
  KeyboardShortcutCombination,
  mapKeyboardShortcutCombination,
  IKeyboardShortcutListener
} from './listener.library';

export class BlackListedKeyboardShortcutChecker {
  private blackListedKeyBindings: KeyboardShortcutCombination[] = [
    [KeyboardKeys.Ctrl, 'd'], // bookmark
    [KeyboardKeys.Ctrl, 'f'], // find
    [KeyboardKeys.Ctrl, 'g'], // find next
    [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 'g'], // find previous
    [KeyboardKeys.Ctrl, 'h'], // history
    [KeyboardKeys.Ctrl, 'j'], // downloads
    [KeyboardKeys.Ctrl, 'o'], // open file
    [KeyboardKeys.Ctrl, 's'], // save
    [KeyboardKeys.Ctrl, 'p'], // print
    [KeyboardKeys.Ctrl, 'u'], // view source
    [KeyboardKeys.Ctrl, 'n'], // open in new window
    [KeyboardKeys.Ctrl, 't'], // open in new tab
    [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 't'], // open recently closed tab
    [KeyboardKeys.Ctrl, 'c'], // copy
    [KeyboardKeys.Ctrl, 'x'], // cut
    [KeyboardKeys.Ctrl, 'v'], // paste
    [KeyboardKeys.Alt, 'f'], // show menu bar
    [KeyboardKeys.Escape] // stop
  ];

  private mappedBlackListedKeyBindings = this.blackListedKeyBindings.map(blkb =>
    mapKeyboardShortcutCombination(blkb)
  );

  check(listener: IKeyboardShortcutListener): void {
    // should only get checked in DevMode
    if (!isDevMode()) {
      return;
    }
    for (let blkb of this.mappedBlackListedKeyBindings) {
      if (blkb === listener.mappedKeyboardShortcutCombination) {
        const warningMessage = `Keyboard Shortcut [${
          listener.displayShortcutCombination
        }] is blacklisted as a common browser keyboard shortcut.  Consider changing your keybinding for this shortcut.`;
        console.warn(warningMessage);
        return;
      }
    }
  }
}

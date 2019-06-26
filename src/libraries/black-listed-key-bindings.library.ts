import { isDevMode } from '@angular/core';

import {
  KeyboardKeys,
  KeyboardShortcutCombination,
  mapKeyboardShortcutCombination,
  IKeyboardShortcutListener
} from './listener.library';

export const blacklistedKeyCombinations = [
  [KeyboardKeys.Ctrl, 'd', 'Bookmark Page'], // bookmark
  [KeyboardKeys.Ctrl, 'f', 'Find'], // find
  [KeyboardKeys.Ctrl, 'g', 'Find Next'], // find next
  [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 'g', 'Find Previous'], // find previous
  [KeyboardKeys.Ctrl, 'h', 'History'], // history
  [KeyboardKeys.Ctrl, 'j', 'Downloads'], // downloads
  [KeyboardKeys.Ctrl, 'o', 'Open File'], // open file
  [KeyboardKeys.Ctrl, 's', 'Save'], // save
  [KeyboardKeys.Ctrl, 'p', 'Print'], // print
  [KeyboardKeys.Ctrl, 'u', 'View Sorce'], // view source
  [KeyboardKeys.Ctrl, 'n', 'Open in New Window'], // open in new window
  [KeyboardKeys.Ctrl, 't', 'Open in New Tab'], // open in new tab
  [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 't', 'Open Recently Closed Tab'], // open recently closed tab
  [KeyboardKeys.Ctrl, 'c', 'Copy'], // copy
  [KeyboardKeys.Ctrl, 'x', 'Cut'], // cut
  [KeyboardKeys.Ctrl, 'v', 'Paste'], // paste
  [KeyboardKeys.Alt, 'f', 'Show Menu Bar'], // show menu bar
  [KeyboardKeys.Escape, 'Stop'] // stop
];

export class BlackListedKeyboardShortcutChecker {
  private blackListedKeyBindings: KeyboardShortcutCombination[] = blacklistedKeyCombinations;

  private mappedBlackListedKeyBindings = this.blackListedKeyBindings.map(blkb =>
    mapKeyboardShortcutCombination(blkb)
  );
  static blackListedKeyBindings: string[];

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

import { Injectable } from '@angular/core';

@Injectable()
export class KeyboardShortcutsService {
  constructor() {}

  goDoSomething(): void {
      console.log('I did something');
  }

}

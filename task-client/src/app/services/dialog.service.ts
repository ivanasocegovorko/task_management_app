import { Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  showPrompt(message: string): Observable<string> {
    return from(Dialog.prompt({
        message
    })).pipe(map(result => {
        return result.value;
    }));
  };
}

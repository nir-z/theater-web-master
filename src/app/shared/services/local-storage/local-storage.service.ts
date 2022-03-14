import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class LocalStorageService {

  setToStorage(storageKey: string, dataToSet: Object | string): void {
    const dataString = typeof dataToSet === 'object' ? JSON.stringify(dataToSet) : dataToSet;
    localStorage.setItem(storageKey, dataString);
  }

  removeFromStorage(storageKey: string): void {
    localStorage.removeItem(storageKey);
  }

  getFromStorage<T>(storageKey: string, parse: boolean = true) {
    const storageData = localStorage.getItem(storageKey);
    if (!storageData)  {
      return null;
    } else {
      return parse ?  JSON.parse(storageData) : storageData;
    }
  }

  clearStorage(): void {
    localStorage.clear();
  }

}

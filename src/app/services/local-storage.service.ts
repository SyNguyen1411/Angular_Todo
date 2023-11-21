import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storage !: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  setObject(key: string, value: any): void {
    if (!value) {
      return;
    }

    this.storage[key] = JSON.stringify(value);
  }

  getValue<T>(key: string): T {
    const obj = JSON.parse(this.storage[key] || null);
    return obj;
  }
}

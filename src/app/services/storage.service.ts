import { Injectable } from '@angular/core';

import { EStorage } from '@enums/storage.enum';
import { IStorage } from '@interfaces/storage.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStoragePrefix = 'mcpy_';

  constructor() { }

  get(key: EStorage): any {

    const storage = localStorage.getItem(this.localStoragePrefix + key);
    const { data } = storage ? JSON.parse(storage) : { data: null };
    return data;

  }

  getWithMeta(key: EStorage): IStorage {

    const storage = localStorage.getItem(this.localStoragePrefix + key);
    return storage ? JSON.parse(storage) : null;

  }

  set(key: EStorage, data: any): void {

    const storage = this.getWithMeta(key);
    if (storage){
      storage.updated = new Date().getTime();
      storage.data = data;
      localStorage.setItem(this.localStoragePrefix + key, JSON.stringify(storage));
    } else {
      const updatedStorage: IStorage = {
        created: new Date().getTime(),
        data
      };
      localStorage.setItem(this.localStoragePrefix + key, JSON.stringify(updatedStorage));
    }

  }

  remove(key: EStorage): void {

    localStorage.removeItem(this.localStoragePrefix + key);

  }

  clear(): void {

    localStorage.clear();

  }

}

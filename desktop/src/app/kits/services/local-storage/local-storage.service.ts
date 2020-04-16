import { Injectable } from '@angular/core';

const ls = localStorage

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get<T>(key: string) {
    return JSON.parse(ls.getItem(key)) as T;
  }
  public getList<T>(key: string) {
    const before = ls.getItem(key)
    return before ? (JSON.parse(before) as T[]) : [];
  }
  public set<T>(key: string, value: any): void {
    if (!value && value === undefined) return
    const arr = JSON.stringify(value)
    ls.setItem(key, arr)
  }

  public remove(key: string) {
    return ls.removeItem(key);
  }

}

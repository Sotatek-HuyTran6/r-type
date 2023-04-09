import { Session } from 'types/common';

export enum StorageKey {
  SESSION = 'SESSION',
}

export class StorageUtils {
  static save(key: StorageKey, value: string): void {
    localStorage.setItem(key, value);
  }

  static get(key: StorageKey): string | null {
    return localStorage.getItem(key);
  }

  static remove(key: StorageKey): void {
    return localStorage.removeItem(key);
  }

  static getObject(key: StorageKey) {
    const value = localStorage?.getItem(key);
    if (value && value !== 'undefined') {
      const object = JSON?.parse(value);
      return object;
    }
    return null;
  }

  static saveObject<T>(key: StorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static clear(): void {
    localStorage.clear();
  }
}

export const setSession = (session: Session | null) => {
  StorageUtils.saveObject(StorageKey.SESSION, session);
};

export const getSession = () => {
  const session = StorageUtils.getObject(StorageKey.SESSION);
  if (session) {
    return session;
  } else {
    StorageUtils.remove(StorageKey.SESSION);
    return null;
  }
};

export const deleteSession = () => {
  StorageUtils.remove(StorageKey.SESSION);
};

export const getTokenStatus = () => {
  const session: Session = getSession();
  return session?.accessToken ? true : false;
};

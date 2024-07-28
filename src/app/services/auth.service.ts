import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root' //singleton
})
export class AuthService {

  constructor(private auth: Auth,
    private storage : StorageService
  ) {}

  async register({ email, password }: {email: string; password: string}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.storage.set('userId', user.user.uid);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }: {email: string; password: string}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.storage.set('userId', user.user.uid);
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    this.storage.set('userId', null);
    this.storage.set('userSettings', null);
    return signOut(this.auth);
  }
}
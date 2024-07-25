import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root' //singleton
})
export class AuthService {

  public userId: string = '';

  constructor(private auth: Auth) {}

  async register({ email, password }: {email: string; password: string}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.userId = user.user.uid!;
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }: {email: string; password: string}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.userId = user.user.uid!;
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    this.userId = '';
    return signOut(this.auth);
  }
}
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userEmail: string = '';

  constructor(private auth: Auth) {}

  async register({ email, password }: {email: string; password: string}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }: {email: string; password: string}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.userEmail = user.user.email!;
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    this.userEmail = '';
    return signOut(this.auth);
  }

  setUserEmail(email: string){
    this.userEmail = email;
  }
}
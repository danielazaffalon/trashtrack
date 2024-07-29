import { Injectable } from '@angular/core';
import { IUser, UserAuth } from '../model/interfaces';
import { Firestore, collection, doc, deleteDoc, updateDoc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private firestore: Firestore,
    private authService: AuthService,
    private storage : StorageService
  ) { }

  getUserSettings(id: string, callback: () => void): void {
    const userDocRef = doc(this.firestore, `users/${id}`);
    const user = docData(userDocRef,{idField: 'id'});
    user.subscribe(async userSettings => {
      await this.storage.set('userSettings',userSettings);
      callback();
    });
  }

  async addUserSettings(user: IUser, authU: UserAuth) {
    const authUser = await this.authService.register(authU);
    if(authUser){
      this.storage.set('userSettings',user);
      const usersRef = collection(this.firestore, 'users');
      return setDoc(doc(usersRef, authUser?.user.uid), user);
    }
    else throw new Error('Error creating user');
    
  }

  deleteUserSettings(id: string) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocRef);
  }

  async updateUserSettings(user: IUser) {
    const userId = await this.storage.get('userId');
    const userDocRef = doc(this.firestore, `users/${userId}`);
    await updateDoc(userDocRef, { ...user });
    this.storage.set('userSettings',user);
  }
}

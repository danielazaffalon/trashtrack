import { Injectable } from '@angular/core';
import { IUser } from '../model/interfaces';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private firestore: Firestore) { }

  getUserSettings(id: string): Observable<IUser> {
    const usersRef = collection(this.firestore, `users`);
    const q = query(usersRef,where('userId','==',id));
    const user = collectionData(q).pipe(
      map(users => users.length > 0 ? users[0] : null)
    );
    return user as Observable<IUser>;
  }

  addUserSettings(user: IUser) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef, user);
  }

  deleteUserSettings(id: string) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocRef);
  }

  updateUserSettings(user: IUser) {
    const userDocRef = doc(this.firestore, `users/${user.userId}`);
    return updateDoc(userDocRef, { ...user });
  }
}

import { Injectable } from '@angular/core';
import { IUser, UserAuth } from '../model/interfaces';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, query, where, setDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private firestore: Firestore,
    private authService: AuthService,
  ) { }

  getUserSettings(id: string): Observable<IUser> {
    const usersRef = collection(this.firestore, `users`);
    const q = query(usersRef,where('userId','==',id));
    const user = collectionData(q).pipe(
      map(users => users.length > 0 ? users[0] : null)
    );
    return user as Observable<IUser>;
  }

  async addUserSettings(user: IUser, authU: UserAuth) {
    const authUser = await this.authService.register(authU);
    if(authUser){
      const usersRef = collection(this.firestore, 'users');
      return setDoc(doc(usersRef, authUser?.user.uid), user);
    }
    else throw new Error('Error creating user');
    
  }

  deleteUserSettings(id: string) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocRef);
  }

  updateUserSettings(user: IUser) {
    const userDocRef = doc(this.firestore, `users/${this.authService.userId}`);
    return updateDoc(userDocRef, { ...user, userId:this.authService.userId });
  }
}

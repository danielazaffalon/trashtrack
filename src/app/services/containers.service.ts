import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Container, ContainerType} from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {
  constructor(private firestore: Firestore) { }

  getContainers(types: ContainerType[] = []) {
    const containersRef = collection(this.firestore, `containers`);
    if (types?.length) {
      const q = query(containersRef, where('type','in', types));
      return collectionData(q, { idField: 'id'}) as Observable<Container[]>;
    }
    return collectionData(containersRef, { idField: 'id'}) as Observable<Container[]>;
  }
}

import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Container } from '../model/interfaces';
import { IncidentsService } from './incidents.service';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {

  constructor(private firestore: Firestore, private incidentsService: IncidentsService) { }

  getContainers(): Observable<Container[]> {
    const containersRef = collection(this.firestore, `containers`);
    return collectionData(containersRef, { idField: 'id'}) as Observable<Container[]>;
  }
}

import { Injectable } from '@angular/core';
import { Incident } from '../model/interfaces';
import { Firestore, collection, collectionData, addDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  constructor(private firestore: Firestore, private auth: Auth) { }

  getAllIncidents(): Observable<Incident[]> {
    const incidentsRef = collection(this.firestore, `incidents`);
    return collectionData(incidentsRef, { idField: 'id'}) as Observable<Incident[]>;
  }

  getUserIncidents(): Observable<Incident[]> {
    const incidentsRef = collection(this.firestore, `incidents`);
    const q = query(incidentsRef,where('userId','==', this.auth.currentUser?.uid));
    const incidents = collectionData(q);
    return incidents as Observable<Incident[]>;
  }

  addIncident(incident: Incident) {
    incident.userId = this.auth.currentUser?.uid!;
    const usersRef = collection(this.firestore, 'incidents');
    return addDoc(usersRef, incident);
  }
}

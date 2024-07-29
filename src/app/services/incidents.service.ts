import { Injectable } from '@angular/core';
import { Incident } from '../model/interfaces';
import { Firestore, collection, collectionData, addDoc, updateDoc, query, where, doc, docData } from '@angular/fire/firestore';
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
    const incidents = collectionData(q, { idField: 'id' });
    return incidents as Observable<Incident[]>;
  }

  getIncidentById(id: string): Observable<Incident> {
    const userDocRef = doc(this.firestore, `incidents/${id}`);
    const incident = docData(userDocRef,{idField: 'id'});
    return incident as Observable<Incident>;
  }

  addIncident(incident: Incident) {
    incident.userId = this.auth.currentUser?.uid!;
    const usersRef = collection(this.firestore, 'incidents');
    return addDoc(usersRef, incident);
  }

  async updateIncident(incidentId: string, incident: Incident) {
    incident.userId = this.auth.currentUser?.uid!;
    const userDocRef = doc(this.firestore, `incidents/${incidentId}`);
    await updateDoc(userDocRef, { ...incident });
  }

  getIncidentByContainer(containerId: string): Observable<Incident[]>{
    const incidentsRef = collection(this.firestore, `incidents`);
    const q = query(incidentsRef,where('containerId','==', containerId));
    const incidents = collectionData(q, { idField: 'id' });
    return incidents as Observable<Incident[]>;
  }
}

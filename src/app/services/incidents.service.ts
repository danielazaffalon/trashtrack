import { Injectable } from '@angular/core';
import { Incident } from '../model/interfaces';
import { Firestore, collection, collectionData, addDoc, updateDoc, query, where, doc, docData, deleteDoc } from '@angular/fire/firestore';
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
    const incidentDocRef = doc(this.firestore, `incidents/${id}`);
    const incident = docData(incidentDocRef,{idField: 'id'});
    return incident as Observable<Incident>;
  }

  addIncident(incident: Incident) {
    incident.userId = this.auth.currentUser?.uid!;
    const incidentsRef = collection(this.firestore, 'incidents');
    return addDoc(incidentsRef, incident);
  }

  async updateIncident(incidentId: string, incident: Incident) {
    incident.userId = this.auth.currentUser?.uid!;
    const incidentDocRef = doc(this.firestore, `incidents/${incidentId}`);
    await updateDoc(incidentDocRef, { ...incident });
  }

  removeIncident(id: string) {
    const incidentDocRef = doc(this.firestore, `incidents/${id}`);
    return deleteDoc(incidentDocRef);
  }

  getIncidentByContainer(containerId: string): Observable<Incident[]>{
    const incidentsRef = collection(this.firestore, `incidents`);
    const q = query(incidentsRef,where('containerId','==', containerId));
    const incidents = collectionData(q, { idField: 'id' });
    return incidents as Observable<Incident[]>;
  }
}

import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonRow, IonCol, IonImg, IonIcon, IonGrid, IonButton } from '@ionic/angular/standalone';
import { Container, Incident } from 'src/app/model/interfaces';
import { ContainersService } from 'src/app/services/containers.service';
import { IncidentsService } from 'src/app/services/incidents.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { addIcons } from 'ionicons';
import { close, pencil } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonButton, IonGrid, IonIcon, IonImg, IonCol, IonRow, IonList, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, HeaderComponent, IonItem, IonSelect, IonSelectOption, CommonModule],
})
export class Tab3Page {

  @ViewChild('select') selectEl!: HTMLIonSelectElement;

  containers: Container[] = [];
  incidents: Incident[] = [];
  incidentsSubscription: any; 

  constructor(
    private containersService: ContainersService,
    private incidentsService: IncidentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.containersService.getContainers().subscribe(containers => {
      this.containers = containers;
    });
    addIcons({
      close,
      pencil
    });
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      const containerId = params['containerId'] || null;
      if(containerId) {
        this.selectEl.value = containerId;
        this.containerSelection(containerId);
      }
    });
  }

  containerSelection(containerId: string){
    this.incidentsSubscription = this.incidentsService.getIncidentByContainer(containerId).subscribe(incidents => {
      this.incidents = incidents;
    });
  }
  
  editIncident(incident: Incident){
    this.router.navigate(['/tabs/tab1', {id: incident.id}]);
  }

  clear() {
    this.selectEl.value = undefined;
    this.incidents = [];
  }

  ionViewWillLeave(){
    this.incidentsSubscription?.unsubscribe();
    this.clear();
  }
}

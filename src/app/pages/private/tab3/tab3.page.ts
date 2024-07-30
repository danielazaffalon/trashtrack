import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonRow, IonCol, IonImg, IonIcon, IonGrid, IonButton } from '@ionic/angular/standalone';
import { Container, Incident, IUser, Role } from 'src/app/model/interfaces';
import { ContainersService } from 'src/app/services/containers.service';
import { IncidentsService } from 'src/app/services/incidents.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { addIcons } from 'ionicons';
import { close, pencil, trash } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

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
  operator: boolean = false;
  userId: string = '';

  constructor(
    private containersService: ContainersService,
    private incidentsService: IncidentsService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService
  ) {
    this.containersService.getContainers().subscribe(containers => {
      this.containers = containers;
    });
    addIcons({
      close,
      pencil,
      trash
    });
  }

  ionViewWillEnter() {
    this.storage.get('userSettings').then((user: IUser) => {
      this.operator = user.role === Role.operator;
    });
    this.storage.get('userId').then(id => {
      this.userId = id;
    })

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
  
  editIncident(id: string){
    this.router.navigate(['/tabs/tab1', { id }]);
  }

  removeIncident(id: string){
    this.incidentsService.removeIncident(id);
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

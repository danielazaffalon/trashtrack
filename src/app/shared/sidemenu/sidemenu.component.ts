import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonMenu, IonTitle, IonContent, IonItem, IonList, IonListHeader, IonIcon, IonLabel, IonMenuToggle } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { map, settings } from 'ionicons/icons';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  imports: [IonListHeader, IonList, IonItem, IonContent, IonMenu, IonTitle, IonToolbar, IonHeader, IonList, IonListHeader, IonIcon, IonLabel, IonMenuToggle],
})
export class SidemenuComponent {

  constructor() {
    addIcons({ map, settings });
  }

}

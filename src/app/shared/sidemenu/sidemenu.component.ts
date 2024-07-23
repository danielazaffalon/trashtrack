import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonMenu, IonTitle, IonContent, IonItem, IonList, IonIcon, IonLabel, IonMenuToggle, IonRouterLink } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { map, settings } from 'ionicons/icons';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  imports: [RouterModule, IonRouterLink, IonList, IonItem, IonContent, IonMenu, IonTitle, IonToolbar, IonHeader, IonIcon, IonLabel, IonMenuToggle],
})
export class SidemenuComponent {

  constructor() {
    addIcons({ map, settings });
  }

}

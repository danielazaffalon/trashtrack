import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonMenu, IonTitle, IonContent, IonItem, IonList, IonIcon, IonLabel, IonMenuToggle, IonRouterLink } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { map, settings, logOutOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  imports: [RouterModule, IonRouterLink, IonList, IonItem, IonContent, IonMenu, IonTitle, IonToolbar, IonHeader, IonIcon, IonLabel, IonMenuToggle],
})
export class SidemenuComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ map, settings, "log-out-outline": logOutOutline });
  }

  logOut(){
    this.authService.logout().then(()=>{
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }
}

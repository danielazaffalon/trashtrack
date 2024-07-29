import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentFormComponent } from 'src/app/shared/incident-form/incident-form.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, IonContent, IncidentFormComponent, HeaderComponent],
})
export class Tab1Page implements OnInit {
  containerId: string | null = null;
  incidentId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.containerId = params['containerId'] || null;
      this.incidentId = params['id'] || null;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { IncidentFormComponent } from 'src/app/shared/incident-form/incident-form.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IncidentFormComponent],
})
export class Tab1Page {

}

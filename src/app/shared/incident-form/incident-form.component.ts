import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTextarea, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons, IonItem, IonInput, IonNote } from '@ionic/angular/standalone';
import { Container, IncidentType } from 'src/app/model/interfaces';
import { ContainersService } from 'src/app/services/containers.service';
import { IncidentsService } from 'src/app/services/incidents.service';
import { HeaderPage } from 'src/app/shared/header/header.page';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss'],
  standalone: true,
  imports: [IonTextarea, IonSelect, IonSelectOption, IonNote, IonInput, IonItem, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, HeaderPage, CommonModule, ReactiveFormsModule],
})
export class IncidentFormComponent  implements OnInit {

  @Input() inputContainerId: string | null = null;
  incident!: FormGroup;
  types: IncidentType[] = ['damage', 'full', 'moved'];
  containers: Container[] = [];

  constructor(
    private fb: FormBuilder,
    private containersService: ContainersService,
    private incidentsService: IncidentsService,
    private activateRoute: ActivatedRoute
  ) {
    this.containersService.getContainers().subscribe(containers => {
      this.containers = containers;
    });
  }

  ngOnInit() {
    // const id = this.activateRoute.snapshot.paramMap.get('id')!;
    
		this.incident = this.fb.group({
      containerId: [{value: this.inputContainerId || '', disabled: this.inputContainerId}, [Validators.required]],
			type: ['',[Validators.required]],
			description: ['',[Validators.required]],
		});  
	}

  save() {
    //TO DO: Add photo/image loading and storage service.
    const {containerId, type, description} = this.incident.value;
    this.incidentsService.addIncident({
      containerId,
      type,
      description
    });
  }

}

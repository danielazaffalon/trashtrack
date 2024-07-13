import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonTextarea, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons, IonItem, IonInput, IonNote } from '@ionic/angular/standalone';
import { Container, IncidentType } from 'src/app/model/interfaces';
import { ContainersService } from 'src/app/services/containers.service';
import { IncidentsService } from 'src/app/services/incidents.service';
import { HeaderPage } from 'src/app/shared/header/header.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonSelect, IonSelectOption, IonNote, IonInput, IonItem, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, HeaderPage, CommonModule, ReactiveFormsModule],
})
export class Tab1Page implements OnInit {
  incident!: FormGroup;
  types: IncidentType[] = ['damage', 'full', 'moved'];
  containers: Container[] = [];

  constructor(
    private fb: FormBuilder,
    private containersService: ContainersService,
    private incidentsService: IncidentsService
  ) {
    this.containersService.getContainers().subscribe(containers => {
      this.containers = containers;
    });
  }

  get firstName() {
		return this.incident.get('type');
	}

  get lastName() {
		return this.incident.get('containerId');
	}

  get email() {
		return this.incident.get('description');
	}

  ngOnInit() {
		this.incident = this.fb.group({
      containerId: ['', [Validators.required]],
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

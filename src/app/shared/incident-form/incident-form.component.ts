import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonTextarea, IonSelect, IonSelectOption, IonButton, IonItem, IonInput } from '@ionic/angular/standalone';
import { Container, IncidentType } from 'src/app/model/interfaces';
import { ContainersService } from 'src/app/services/containers.service';
import { IncidentsService } from 'src/app/services/incidents.service';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss'],
  standalone: true,
  imports: [IonTextarea, IonSelect, IonSelectOption, IonInput, IonItem, IonButton, CommonModule, ReactiveFormsModule],
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
  ) {
    this.containersService.getContainers().subscribe(containers => {
      this.containers = containers;
    });
  }

  ngOnInit() {
    
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

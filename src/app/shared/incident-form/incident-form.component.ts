import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonTextarea, IonSelect, IonSelectOption, IonButton, IonItem, IonInput, IonIcon, IonFabButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { Container, IncidentType, IPhoto } from 'src/app/model/interfaces';
import { ContainersService } from 'src/app/services/containers.service';
import { IncidentsService } from 'src/app/services/incidents.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss'],
  standalone: true,
  imports: [IonImg, IonCol, IonRow, IonGrid, IonFabButton, IonIcon, IonTextarea, IonSelect, IonSelectOption, IonInput, IonItem, IonButton, CommonModule, ReactiveFormsModule],
})
export class IncidentFormComponent implements OnInit {

  @Input() inputContainerId: string | null = null;
  incident!: FormGroup;
  types: IncidentType[] = ['damage', 'full', 'moved'];
  containers: Container[] = [];
  photos: IPhoto[] = [];

  constructor(
    private fb: FormBuilder,
    private containersService: ContainersService,
    private incidentsService: IncidentsService,
    public photoService: PhotoService,
    private router: Router
  ) {
    addIcons({ camera })
    this.containersService.getContainers().subscribe(containers => {
      this.containers = containers;
    });
  }

  ngOnInit() {
    
		this.incident = this.fb.group({
      containerId: [{value: this.inputContainerId || '', disabled: this.inputContainerId}, [Validators.required]],
			type: ['',[Validators.required]],
			description: ['',[Validators.required]],
      photos: [this.photos, []]
		});  
	}

  async save() {
    const {containerId, type, description, photos} = this.incident.value;
    await this.incidentsService.addIncident({
      containerId: containerId?? this.inputContainerId,
      type,
      description,
      images: photos.map((photo: IPhoto) => photo.base64Data)
    });
    this.router.navigate(['/tabs/tab2']);
  }

  async addPhotoToGallery() {
    const newPhoto = await this.photoService.takePhoto();
    this.photos.push(newPhoto);
    this.incident.patchValue({
      photos: this.photos
    });
  }
}

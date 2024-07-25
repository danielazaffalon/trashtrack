import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonInput, IonSelect, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonSelectOption, IonButton, IonIcon, IonTextarea, IonButtons, IonNote } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { settings } from 'ionicons/icons';
import { UserSettingsService } from 'src/app/services/user-settings.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.page.html',
  styleUrls: ['./usersettings.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonItem, IonSelect, IonNote, IonButtons, IonIcon, IonButton, IonItem, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, IonTextarea, IonInput]
})
export class UsersettingsPage implements OnInit {

  userSettings!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userSettingService: UserSettingsService,
    private storage : StorageService
  ){ 
    addIcons({
      "settings": settings
    });
  }

  ngOnInit() {
		this.userSettings = this.fb.group({
      firstName: ['',[Validators.required]],
			lastName: ['',[Validators.required]], 
			role: ['',[Validators.required]],
      img:['',[]]
		});
	}

  async ionViewWillEnter(){
    const {firstName, lastName, role, img} = await this.storage.get('userSettings');
    this.userSettings.patchValue({
      firstName,
      lastName,
      role,
      img: img?? null});
  }

  save() {
    const {firstName, lastName, role, img} = this.userSettings.value;
    this.userSettingService.updateUserSettings({firstName, lastName, role, img});
  }

}

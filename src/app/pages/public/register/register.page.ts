import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonNote, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { settings } from 'ionicons/icons';
import { UserSettingsService } from 'src/app/services/user-settings.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonSelect, IonSelectOption, IonButton, IonNote, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, FormsModule, IonInput]
})
export class RegisterPage implements OnInit {
  credentials!: FormGroup;

  constructor(
    	private fb: FormBuilder,
		private authService: AuthService,
		private userSettingsService: UserSettingsService,
		private router: Router
  ) {
  }

  // Easy access for form fields
	get firstName() {
		return this.credentials.get('firstName');
	}

  	get lastName() {
		return this.credentials.get('lastName');
	}

  	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

  	get role() {
		return this.credentials.get('role');
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			firstName: ['',[Validators.required]],
			lastName: ['',[Validators.required]], 
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			role: ['',[Validators.required]], 
		});
	}

	async register() {

		const {firstName, lastName, email, role, password} = this.credentials.value;

		const user = await this.authService.register({email, password});

		if (user) {
			this.userSettingsService.addUserSettings({userId: user.user.uid,
				firstName,
				lastName,
				email,
				role
			});
			this.router.navigateByUrl('/tabs', { replaceUrl: true });
		} else {
			console.log('Registration failed', 'Please try again!');
		}
	}

}

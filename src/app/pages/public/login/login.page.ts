import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserSettingsService } from 'src/app/services/user-settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonInput]
})
export class LoginPage implements OnInit {
	credentials!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private userSettings: UserSettingsService
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}

	async login() {

		const user = await this.authService.login(this.credentials.value);
		if (user) {
			this.userSettings.getUserSettings(user.user.uid);
			this.router.navigateByUrl('/tabs', { replaceUrl: true });
		} else {
			console.log('Login failed', 'Please try again!');
		}
	}
}
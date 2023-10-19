import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeaturesService } from 'src/app/services/features.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup
  formLogin!: FormGroup
  visible: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private featuresService: FeaturesService) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      emailLogin: ['', [Validators.required, Validators.email]],
      passwordLogin: ['', Validators.required]
    });
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: ''
    });
  }

  submitLogin() {
    this.featuresService.loginUser(this.form.value).subscribe(
      (response) => {
        console.log("Login successful", response);

        localStorage.setItem('token', response.token);


        this.router.navigate(['shared/department']);
      },
      (error) => {
        console.error("Login failed", error);

      }
    );
  }
  submit() {
    console.log(this.form.getRawValue()); // Log the payload before sending
    this.featuresService.registerUser(this.form.getRawValue()).subscribe(
      (response) => {
        console.log("User registered successfully", response);
      },
      (error) => {
        console.error("Registration failed", error);
      }
    );
  }
  showDialog() {
    this.visible = true;
  }

  navigateToDashboard() {
    // this.router.navigate(['/shared/dashboard']);
  }
}

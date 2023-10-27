import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FeaturesService } from 'src/app/services/features.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;
  formLogin!: FormGroup;
  visible: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private featuresService: FeaturesService
  ) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      emailLogin: [''],
      passwordLogin: [''],
    });
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
    const token = localStorage.getItem('token');
  }

  submitLogin() {
    this.featuresService.loginUser(this.form.value).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['shared/designation']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  submit() {
    console.log(this.form.value);
    this.featuresService.registerUser(this.form.value).subscribe(
      (response) => {
        console.log('User registered successfully', response);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
    this.visible = false;
  }
  // submitLogin() {
  //   this.featuresService.loginUser(this.form.value).subscribe(
  //     (response) => {
  //       console.log('Login successful', response);
  //       localStorage.setItem('token', response.token);
  //       this.router.navigate(['shared/designation']);
  //     },
  //     (error) => {
  //       console.error('Login failed', error);
  //     }
  //   );
  // }

  // submit() {
  //   console.log(this.form.getRawValue());
  //   this.featuresService
  //     .registerUser(this.form.getRawValue())
  //     .pipe(
  //       switchMap((registrationResponse) => {
  //         console.log('User registered successfully', registrationResponse);
  //         // After successful registration, attempt to log in
  //         return this.featuresService.loginUser(this.form.getRawValue());
  //       })
  //     )
  //     .subscribe(
  //       (loginResponse) => {
  //         console.log('Login successful', loginResponse);
  //         localStorage.setItem('token', loginResponse.token);
  //         this.router.navigate(['shared/designation']);
  //       },
  //       (error) => {
  //         console.error('Login failed', error);
  //       }
  //     );
  //   this.visible = false;
  // }
  showDialog() {
    this.visible = true;
  }

  navigateToDashboard() {
    // this.router.navigate(['/shared/dashboard']);
  }
}

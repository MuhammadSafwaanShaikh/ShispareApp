import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service'; 





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';
  showPassword: boolean = false;
  registrationError: string = '';
  name:string=''
 

  constructor(private router: Router, private dataService: DataService) { }

  loginUser() {
    
    if (!this.email || !this.password) {
      this.loginError = 'Please provide both email and password.';
      return;
    }

    this.dataService.login(this.email, this.password).subscribe(
      (response: any) => {
        // Successful login, navigate to the dashboard or handle as needed
        localStorage.setItem('token', response.token);
        this.router.navigate(['/shared/dashboard']);
      },
      (error: any) => {
        // Handle login failure, e.g., display an error message
        this.loginError = 'Login failed. Please check your credentials.';
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  openModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  registerUser() {
    // Check if email and password are not empty
    if (!this.email || !this.password) {
      this.registrationError = 'Please provide both email and password.';
      return;
    }
    // Call the registration API endpoint using DataService
    this.dataService.register(this.name, this.email, this.password).subscribe(
      (response: any) => {
        // Successful registration
        this.closeModal();
        // You can optionally navigate to the login page or handle it as needed
        this.router.navigate(['']);
        console.log(response);
      },
      (error: any) => {
        // Handle registration failure, e.g., display an error message
        console.error('Registration failed:', error);
        // You can also log the response error details for more information
        console.error('Error details:', error.error);
        this.registrationError = 'Registration failed. Please try again.';
      }
    );
  }
  

}

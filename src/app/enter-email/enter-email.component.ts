import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css']
})
export class EnterEmailComponent implements OnInit{

  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  formInvalid = false;
  isSubmitting = false;
  validationAttempted = false;


  constructor(
    private formBuilder: FormBuilder,
    public backendService: BackendService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      userId: ['']
    }, { validators: this.atLeastOneFieldValidator });
  }
  
  ngOnInit(): void {
    // Initialize form

    this.validationAttempted = false;
  }

  atLeastOneFieldValidator(group: FormGroup): {[key: string]: any} | null {
    const email = group.get('email')?.value;
    const userId = group.get('userId')?.value;
    
    return (email || userId) ? null : { 'atLeastOneRequired': true };
  }

  onSubmit() {
    this.submitted = true;
    this.formInvalid = false;
    this.errorMessage = '';
    this.validationAttempted = false;

    const email = this.loginForm.get('email')?.value;
    const userId = this.loginForm.get('userId')?.value;

    if (!email && !userId) {
      this.formInvalid = true;
      return;
    }
    
    // If the form validations pass
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.backendService.validateCredentials(email, userId)
        .subscribe(
          (response) => {
            this.isSubmitting = false;
            this.validationAttempted = true;
            // Handle success - redirect to success page
            console.log('Validation response : ', response);
           if (this.backendService.credentialsValid === true) {
            setTimeout(() => {
              console.log('Redirecting to success page...');
              window.location.href = 'assets/done.html';
            }, 100);
          }
        },
          (error) => {
            this.isSubmitting = false;
            this.validationAttempted = true;
            console.error('Validation failed', error);
          }
        );
      }
  }
}



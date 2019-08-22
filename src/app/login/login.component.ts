import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AlertService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    accountNumber: any;
    returnUrl: string;
    data1: any;
    userId: any;
    password: any;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: Router,
        private http: HttpClient
    ) {
       
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userId: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        console.log("in submit")
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        console.log(this.loginForm);
        var reqObj1 = {
            "userId": this.loginForm.value.userId,
            "password": this.loginForm.value.password
        };
        
          this.http.post(environment.baseUrl+'/maggieBreach/api/login',reqObj1).subscribe((response) => {
            if (response) {
      
              console.log(response);
              sessionStorage.setItem('roleId', response['roleId']);
              alert(response['message']);
              if(response['roleId'] === 5) {
                this.route.navigate(['/breach-form']);
              } else {
                this.route.navigate(['/dashboard']);
              }
            }
      
          });

    }
}

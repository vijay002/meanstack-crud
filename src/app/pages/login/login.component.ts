import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ConfigService } from '../../../shared/config/config.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService,ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { Router } from '@angular/router';
import { User } from '../../../shared/services/userservice.service';
import { } from '@shared/services/'
//import { ValidationService } from '../shared/utils/validation.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  submitted: boolean = false;
  blockedDocument: boolean = false;
  message: String;
  user: User;
  user_status: boolean;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private configService: ConfigService,
    private toasterService: ToasterService,
    private fb: FormBuilder) { 
      this.initForm();
    }

  ngOnInit() {
  }

  public toasterconfig : ToasterConfig = 
  new ToasterConfig({
      showCloseButton: true, 
      tapToDismiss: false, 
      timeout: 0
  });
// ValidationService.emailValidator
  initForm() {
    this.loginForm = this.fb.group({
        email: ['', [Validators.required ]],
        password: ['', Validators.required]
    });
    this.submitted = false;
}


loginUser(){
  this.submitted = true;
  if (!this.loginForm.valid)
           return;

  this.authenticationService.loginUser(this.loginForm.value).subscribe( res => {
    console.log('LOGIN USER ');
    let body = JSON.parse(res['_body']);
    this.user_status = body.data['success']; 
    if(body.data['success'] == true) 
    {
      this.authenticationService.setUser(body.data['user']);
      this.router.navigate(['/dashboard']);
    } else {
      this.message = body.data['message'];
    }
  },
  error => {
    this.toasterService.pop('error', 'Error', error);
});


}


//   login() {
//     this.submitted = true;
  
//     if (!this.loginForm.valid)
//         return;

//     this.blockedDocument = true;
//     this.authenticationService.login(this.loginForm)
//         .subscribe((result: any) => {
//             this.blockedDocument = false;
            
//             if (!result.success && result.message) {
//                 this.toasterService.pop('error', 'Warning', result.message);
//             }
//             else {
                
//                 //if (this.authenticationService.userHasRole('SuperAdmin') || this.authenticationService.userHasRole('Admin')) {
//                 //    this.router.navigate(['dashboard']);
//                 //}
//                 //else {
//                 //    this.router.navigate(['jobsheets']);
//                 //}
                
//             }
//             this.router.navigate(['dashboard']);
//         }, error => {
//             this.blockedDocument = false;
//             this.toasterService.pop('error', 'Error', error);
//             this.initForm();
//         });
// }

}

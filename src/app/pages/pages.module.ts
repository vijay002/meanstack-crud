import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { P404Component } from './404.component';
// import { P500Component } from './500.component';
 import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register.component';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { ToasterModule } from 'angular2-toaster';
// import { BlockUIModule } from 'primeng/primeng';
// import { ControlMessagesModule } from '../shared/control-messages/control-messages.module';
// import { LaddaModule } from 'angular2-ladda';
 import { PagesRoutingModule } from './pages-routing.module';
// import { ForgotPasswordComponent } from './forgotpassword.component';
//import { ResetPasswordComponent } from './resetpassword.component';

@NgModule({
    imports: [
        PagesRoutingModule,
        ToasterModule,
        FormsModule,
        ReactiveFormsModule
    ],
  declarations: [
    LoginComponent
    
    //  ResetPasswordComponent
  ],
  providers: [ToasterService]
})
export class PagesModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Pages'
      },
      children: [
        {
          path: 'login',
          component: LoginComponent,
          data: {
            title: 'Login'
          }
        }
        
        // {
        //   path: 'register',
        //   component: RegisterComponent,
        //   data: {
        //     title: 'Register'
        //   }
        // },
        // {
        //     path: 'forgotpassword',
        //     component: ForgotPasswordComponent,
        //     data: {
        //         title: 'Forgot Password'
        //     }
        // }
        // {
        //     path: 'resetpassword',
        //     component: ResetPasswordComponent,
        //     data: { title : 'Reset Password' }
        // }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule {}
import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    )
    { }

    canActivate(route) {
        
        if (tokenNotExpired('id_token')) {
            // if (route.data.Module != undefined && route.data.Permission != undefined) {
            //     if (!this.authenticationService.userHasPermission(route.data.Module, route.data.Permission)) {
            //         // not authorized redirect to unauthorize page                    
            //         this.router.navigate(['unauthorize']);
            //         return false;
            //     }
            // }
            return true;
        }
        // console.log('Token check ');
        // console.log(tokenNotExpired('id_token'));

        // if (localStorage.getItem('currentUser')) {
        //     // logged in so return true
        //     return true;
        // }

        // not logged in so redirect to login page
        this.router.navigate(['pages/login']);
        return false;
    }
}
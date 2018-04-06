import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import {  ConfigService } from '../../shared/config/config.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
    
  })
  export class FullLayoutComponent implements OnInit {
    profile: any;
    _baseUrl: string = '';
    _profilePicURL: string = 'assets/img/avatars/7.jpg';
    sendEmailForm: any;
    displayDialog: boolean;
    blockedDocument: boolean = false;
    config: any;

    constructor(private authService: AuthenticationService,
        private router: Router,
        private fb: FormBuilder,
        private toasterService: ToasterService,
        private configService: ConfigService, ) {
        this._baseUrl = configService.getApiURI();
        let data = localStorage.getItem('profile');
        if (data) {
            this.profile = JSON.parse(data);
            if (this.profile.ProfileImage != null) {
                //this._profilePicURL = this.configService.getProfileImg(this.profile.ProfileImage);
            }
        }
    }

    ngOnInit(): void { }
  

}
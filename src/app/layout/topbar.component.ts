import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'top-bar',
  templateUrl: './topbar.component.html'

})
export class TopbarComponent implements OnInit {

  constructor( private authservice : AuthenticationService) { }

  ngOnInit() {
  }


  logout() {
    this.authservice.logout();
    window.location.reload();
  }

}

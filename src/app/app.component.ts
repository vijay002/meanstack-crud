import { Component } from '@angular/core';
import { DataService } from './data.service';
import { UserserviceService } from './../shared/services/userservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  users: any;
  constructor(private _dataService: DataService, private _userservice : UserserviceService ) {

    // this._dataService.getUsers()
    //   .subscribe(res  => 
    //     {
    //       //this.users = res; 
    //       console.log(res.data);  
    //     });
     
    
    

  }
      
     

  }


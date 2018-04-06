import { Component, Injector, ViewChild } from '@angular/core';
import { UserserviceService } from '../../shared/services/userservice.service';

import { DataTable } from 'primeng/primeng';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

// import { appModuleAnimation } from '@shared/animations/routerTransition';
// import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
// import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
 import { CreateUserComponent } from "./create-user.component";
 import { EditUserComponent } from "./edit-user.component";
// import { EditUserComponent } from "app/users/edit-user/edit-user.component";

@Component({
    templateUrl: './users.component.html',
    animations: []
})
export class UsersComponent  {
    users : any;
    userForm: any; //for form

    @ViewChild('createUserModal') createUserModal: CreateUserComponent;
    @ViewChild('editUserModal') editUserModal: EditUserComponent;

    constructor( private _userservice : UserserviceService,
    private toasterService : ToasterService )
    {
        //this._userservice.getUsersList().subscribe(res => {this.users = res.data ; console.log(res);  });
    }

    loadUserList(event) {
        //this._userservice.getUsersList().subscribe(res => {this.users = res.data ; console.log(res);  });
        this._userservice.getAllUsers().subscribe(res => { this.users = res;  });
    }


    onRowSelect(event) {
        //this.submitted = false;
        //this.isAdd = false;
        //this.group = event.data;
        //debugger;
        this._userservice.getUserbyId(event.data._id).subscribe((res: any) => {
            this.userForm.setValue(res);
            //this.displayDialog = true;
        }, error => {
            this.toasterService.pop('error', 'Error', error);
        });
    }


    createUser() :void
    {
      this.createUserModal.show();
    }

    updatesUser(input: any): void 
    {
        //console.log(" Update User " + input);
        this.editUserModal.show(input);
    }


    // editUser()
    // {
    //   if(this.selectedaddress.length > 0 )  
    //   {
    //     this.editAddressModal.show(this.selectedaddress[0].id);
    //   }
    // }


    refresh(){
       this.loadUserList(null);
    }

   

    deleteUser(input : any ) : void {
        this._userservice.deleteUser(input).subscribe((res) => 
        {
            this.toasterService.pop('success', 'Success', 'User Deleted successfully.');
            this.refresh();
        },
        error => {
            this.toasterService.pop('error', 'Error', error);
            console.log(error);
        });
    }
  

}
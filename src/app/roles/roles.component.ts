import { Component, Injector, ViewChild } from '@angular/core';


import { DataTable } from 'primeng/primeng';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

 import { CreateRoleComponent } from "./create-role/create-role.component";
 import { EditRoleComponent } from "./edit-role/edit-role.component";
import { RoleService } from '../../shared/services/roleservice.service';

@Component({
    templateUrl: './roles.component.html'
})

export class RolesComponent  {
    roles : any;
    roleForm : any;
    gridParams: any; //for grid reload
    totalRecords: number; //for grid pager
    blockedDocument: boolean = false;

    @ViewChild('createRoleModal') createRoleModal: CreateRoleComponent;
    @ViewChild('editRoleModal') editRoleModal: EditRoleComponent;
    @ViewChild('dtRoles') dtTable : DataTable; //Datatable Grid

    constructor(private _roleService : RoleService, private toasterService : ToasterService )
    {
    }

    loadRoleList(event) {
        this.gridParams = event;
        this.blockedDocument = true;

        this._roleService.getAllRoles(event).subscribe(res => 
            {
                this.roles = res.rows;  
                this.totalRecords = res.records;
                this.blockedDocument = false;
            } 
            , error => { this.toasterService.pop('error', 'Error', error); } );
    }

    refresh(){
        this.loadRoleList(null);
     }

    onRowSelect(event) {
        this._roleService.getUserbyId(event.data._id).subscribe((res: any) => {
            this.roleForm.setValue(res);
        }, error => {
            this.toasterService.pop('error', 'Error', error);
        });
    }

    createRole(){
        this.createRoleModal.show();
    }

    updatesRole(input: any): void 
    {
        this.editRoleModal.show(input);
    }

    deleteRole(input : any ) : void {
        this._roleService.deleteRole(input).subscribe((res) => 
        {
            this.toasterService.pop('success', 'Success', 'Role Deleted successfully.');
            this.refresh();
        },
        error => {
            this.toasterService.pop('error', 'Error', error);
            console.log(error);
        });
    }

    //Trigger DataTable filter
    gridfilter(event)
    {
        if(event[2] === 'clear')
        {
            this.dtTable.filter('cleartext', event[1], event[2]);
        }
        else {
            this.dtTable.filter(event[0], event[1], event[2]);
        }
    }

}
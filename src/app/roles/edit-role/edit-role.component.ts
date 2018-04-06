import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../shared/services/roleservice.service';
import { ToasterService } from 'angular2-toaster';
//import { RoleServiceProxy, RoleDto, ListResultDtoOfPermissionDto } from '@shared/service-proxies/service-proxies';
//import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'edit-role-modal',
    templateUrl: './edit-role.component.html'
})
export class EditRoleComponent  implements OnInit   {
    @ViewChild('editRoleModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    roleForm : FormGroup;

    active: boolean = false;
    saving: boolean = false;
    constructor(
        private fb: FormBuilder,
        private _roleservice : RoleService,
        private toasterService : ToasterService
      ) {
        
      }

      ngOnInit() {
        // this.setDropdowns();
        this.roleForm = this.fb.group({
           _id :[''],
           roleName: ['', Validators.required],
           loweredRoleName:[''],
           description : [''],
           isTechnician: [null],
           isEndUser:[null],
           isEditHelp :[null]
         });
       }

    show(id: string): void {
        this._roleservice.getUserbyId(id).subscribe((result) => {
        this.roleForm.patchValue(result);
            this.active = true;
            this.modal.show();
        });
      }

      close(): void {
        this.active = false;
        this.modal.hide();
      }

      save(): void {
        this.saving = true;
        if (!this.roleForm.valid)
          return;
    
          this._roleservice.updateRole(this.roleForm.value).subscribe((res) => 
       {
           this.roleForm.reset();
           this.saving = false;
           this.close();
           this.toasterService.pop('success', 'Success', 'Role updated successfully.');
           this.modalSave.emit(null);
       },
       error => {
           this.toasterService.pop('error', 'Error', error);
       });
      }

}
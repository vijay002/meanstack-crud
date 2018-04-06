import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormControl , FormArray,  ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import 'rxjs/add/operator/map';
import { RoleService } from '../../../shared/services/roleservice.service';


@Component({
    selector: 'create-role-modal',
    templateUrl: './create-role.component.html'
})
export class CreateRoleComponent  implements OnInit  {
    @ViewChild('createRoleModal') modal: ModalDirective;
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


    show(): void {
        this.active = true;
        this.modal.show();
        this.roleForm.reset();
        //this.user = new CreateAddressDto();
      }
 
      close(): void {
        this.active = false;
        this.modal.hide();
      }

      save(): void {
        this.saving = true;
        if (!this.roleForm.valid)
          return;
         let input = new FormData();
       input.append('rolefrmData', JSON.stringify(this.roleForm.value));
       this._roleservice.insertRole(this.roleForm.value).subscribe((res) => 
       {
           this.roleForm.reset();
           this.saving = false;
           this.close();
           this.toasterService.pop('success', 'Success', 'Role save successfully.');
           this.modalSave.emit(null);
       },
       error => {
           this.toasterService.pop('error', 'Error', error);
       });


      }




}
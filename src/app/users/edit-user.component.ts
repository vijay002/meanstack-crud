import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
//import { AddressServiceProxy, CreateAddressDto,  RegionServiceProxy, RegionDto } from '@shared/service-proxies/service-proxies';
//import { AppComponentBase } from '@shared/app-component-base';
import { FormControl , FormArray,  ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import 'rxjs/add/operator/map';
import { UserserviceService } from '../../shared/services/userservice.service';
import { Role, RoleService } from '../../shared/services/roleservice.service';

@Component({
    selector: 'edit-user-modal',
    templateUrl: './edit-user.component.html',
  })

  export class EditUserComponent implements OnInit  
  {
    @ViewChild('editUserModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    userForm : FormGroup;
    roles : Role[];
    active: boolean = false;
    saving: boolean = false;

    constructor(
        private fb: FormBuilder,
        private _userservice : UserserviceService,
        private _roleservice : RoleService,
        private toasterService : ToasterService
      ) { 
        
      }


    ngOnInit(): void {
        this._roleservice.getAll().subscribe((result : any ) => 
        {
          this.roles = result;
          console.log(this.roles);
        }, error => {
          this.toasterService.pop('error', 'Error', error);
        });

        this.userForm = this.fb.group({
            _id :[''],
            name: [''],
            email: [''],
            password: [''],
            role:[]
          });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
      }


      show(id: string): void {
        console.log('edit shoe GUID : ' + id);
        this._userservice.getUserbyId(id).subscribe((result) => {
        this.userForm.patchValue(result);
            this.active = true;
            this.modal.show();
        });
      }

       

save(): void {
    this.saving = true;
    if (!this.userForm.valid)
      return;

      this._userservice.updateUser(this.userForm.value).subscribe((res) => 
   {
       this.userForm.reset();
       this.saving = false;
       this.close();
       this.toasterService.pop('success', 'Success', 'User updated successfully.');
       this.modalSave.emit(null);
   },
   error => {
       this.toasterService.pop('error', 'Error', error);
   });

  }
  

}
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
    selector: 'create-user-modal',
    templateUrl: './create-user.component.html',
  })

  export class CreateUserComponent implements OnInit  
  {
    @ViewChild('createUserModal') modal: ModalDirective;
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

      ngOnInit() {
       // this.setDropdowns();
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


      show(): void {
        this.active = true;
        this.modal.show();
        this.userForm.reset();
        //this.user = new CreateAddressDto();
      }

      // edit(id) : void {
      //   this.active = true;
      //   this.modal.show();
      //   this.userForm = 

      // }
    
      close(): void {
        this.active = false;
        
        this.modal.hide();
      }


      save(): void {
        this.saving = true;
        if (!this.userForm.valid)
          return;
    
       
       //this.address = new CreateAddressDto(this.addressForm.value);
       let input = new FormData();
       input.append('userfrmData', JSON.stringify(this.userForm.value));


       //this._userservice.insertUser(this.userForm.value).subscribe(res => { console.log('save')  });
       //console.log(this.userForm);
       this._userservice.insertUser(this.userForm.value).subscribe((res) => 
       {
           console.log( 'save componentn');
           console.log( res);
           this.userForm.reset();
           this.saving = false;
           this.close();
           //alert('save successfully');
           this.toasterService.pop('success', 'Success', 'User save successfully.');
           this.modalSave.emit(null);
       },
       error => {
           this.toasterService.pop('error', 'Error', error);
       });


      //  this._userservice.insertUser(input)
      //  .map((res: Response) => {
      //       return res;
      //   }).catch();
       
            // .subscribe(() => {
            //     //this.notify.info(this.l('SavedSuccessfully'));
            //     alert('save successfully');
            //     //this.userForm.reset();
            //     this.saving = false;
            //     this.close();
            //     this.modalSave.emit(null);
            // });

          //  this.saving = false;

      }
   



  }
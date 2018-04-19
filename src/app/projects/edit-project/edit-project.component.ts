import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormControl , FormArray,  ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import 'rxjs/add/operator/map';
import { ProjectService  } from '../../../shared/services/project.service';
import { UserserviceService , User } from '../../../shared/services/userservice.service';
//import { User } from '../../../shared/services/authentication.service';

@Component({
    selector: 'edit-project-modal',
    templateUrl: './edit-project.component.html'
})

export class EditProjectComponent implements OnInit  {
    @ViewChild('editProjectModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    projectForm : FormGroup;

    active: boolean = false;
    saving: boolean = false;

    //private variable
    nameList : User[];
    selectedUser : User;

    

    constructor(
        private fb: FormBuilder,
        private _projectservice : ProjectService,
        private _userservice : UserserviceService,
        private toasterService : ToasterService
      ) {
        
      }

      ngOnInit() {
        // this.setDropdowns();
       // this._userservice.getAllUsers();
       this.getNameList();

        this.projectForm = this.fb.group({
           _id :[''],
           title: ['', Validators.required],
           startingDate :[null],
           endingDate :[null],
           categoryID :[null],
           statusId :[null],
           users : []
         });
       }

       getNameList() {  
        this._userservice.getAllUsers().subscribe(data => {  
            this.nameList = data;  

        });  
      }  

       show(id: string): void {

        this._projectservice.getProjectbyId(id).subscribe((result) => {
          this.projectForm.patchValue(result);
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
        if (!this.projectForm.valid)
          return;

        let input = new FormData();
        //this.projectForm.value.users.push()
       // var alex = new User();
        console.log(this.projectForm.value);


       input.append('projectfrmData', JSON.stringify(this.projectForm.value));
       this._projectservice.insertProject(this.projectForm.value).subscribe((res) => 
       {
           this.projectForm.reset();
           this.saving = false;
           this.close();
           this.toasterService.pop('success', 'Success', 'Project Updated successfully.');
           this.modalSave.emit(null);
       },
       error => {
           this.toasterService.pop('error', 'Error', error);
       });

      }


}
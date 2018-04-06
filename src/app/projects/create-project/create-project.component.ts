import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormControl , FormArray,  ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import 'rxjs/add/operator/map';
import { ProjectService  } from '../../../shared/services/project.service';

@Component({
    selector: 'create-project-modal',
    templateUrl: './create-project.component.html'
})

export class CreateProjectComponent implements OnInit  {
    @ViewChild('createProjectModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    projectForm : FormGroup;

    active: boolean = false;
    saving: boolean = false;

    constructor(
        private fb: FormBuilder,
        private _projectservice : ProjectService,
        private toasterService : ToasterService
      ) {
        
      }

      ngOnInit() {
        // this.setDropdowns();
        this.projectForm = this.fb.group({
           _id :[''],
           title: ['', Validators.required],
           startingDate :[null],
           endingDate :[null],
           categoryID :[null],
           statusID :[null]
         });
       }

       show(): void {
        this.active = true;
        this.modal.show();
        this.projectForm.reset();
        //this.user = new CreateAddressDto();
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
       input.append('projectfrmData', JSON.stringify(this.projectForm.value));
       this._projectservice.insertProject(this.projectForm.value).subscribe((res) => 
       {
           this.projectForm.reset();
           this.saving = false;
           this.close();
           this.toasterService.pop('success', 'Success', 'Project save successfully.');
           this.modalSave.emit(null);
       },
       error => {
           this.toasterService.pop('error', 'Error', error);
       });

      }


}
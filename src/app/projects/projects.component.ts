import { Component, Injector, ViewChild } from '@angular/core';


import { DataTable } from 'primeng/primeng';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { ConfigService } from '../../shared/config/config.service';

import { Router } from '@angular/router';

 import { CreateProjectComponent } from "./create-project/create-project.component";
 //import { EditRoleComponent } from "./edit-project/edit-project.component";
import { ProjectService } from '../../shared/services/project.service';

@Component({
    templateUrl: './projects.component.html'
})
export class ProjectsComponent  {
    projects : any;
    projectForm : any;
    gridParams: any; //for grid reload
    totalRecords: number; //for grid pager
    blockedDocument: boolean = false;


    @ViewChild('createProjectModal') createProjectModal: CreateProjectComponent;
   // @ViewChild('editProjectModal') editRoleModal: EditRoleComponent;
    @ViewChild('dtProjects') dtTable : DataTable; //Datatable Grid

    constructor(injector: Injector,
        private _router: Router,
        private _configservice : ConfigService,
        private _projectservice : ProjectService,
        private toasterService : ToasterService
        )
   { 
      
   }

loadProjectList(event) {
        this.gridParams = event;
        this.blockedDocument = true;

        this._projectservice.getAllProjects(event).subscribe(res => 
            {
                this.projects = res.rows;  
                console.log('project list');
                console.log(res);

                this.totalRecords = res.records;
                this.blockedDocument = false;
            } 
            , error => { this.toasterService.pop('error', 'Error', error); } );
    }

    refresh(){
        this.loadProjectList(null);
     }

    onRowSelect(event) {
        this._projectservice.getProjectbyId(event.data._id).subscribe((res: any) => {
            this.projectForm.setValue(res);
        }, error => {
            this.toasterService.pop('error', 'Error', error);
        });
    }
    
    createProject()
    {
        this.createProjectModal.show();
    }
    

    updatesProject()
    {
        
    }

    
}
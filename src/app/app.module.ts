import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppComponent } from './app.component';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy, Location } from '@angular/common';

//service 
import { DataService } from './data.service';
import { UserserviceService } from '../shared/services/userservice.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { RoleService  } from '../shared/services/roleservice.service';
import { ProjectService }  from '../shared/services/project.service';
import { AppRoutingModule } from './app-routing.module';


//external 
import {DataTableModule,SharedModule, TieredMenuModule, MenuModule,  ContextMenuModule } from 'primeng/primeng';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

//Component
//import { LayoutComponent } from './layout/layout.component';
import { TopbarComponent } from './layout/topbar.component';
import { SidebarComponent } from './layout/sidebar.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AboutComponent } from './about/about.component';
import { CreateUserComponent  } from "./users/create-user.component";
import { EditUserComponent  } from './users/edit-user.component';
import {  ConfigService } from '../shared/config/config.service';

import { RolesComponent } from './roles/roles.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { CreateRoleComponent } from './roles/create-role/create-role.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';

// Layouts
import { FullLayoutComponent } from './layout/full-layout.component';
import { SimpleLayoutComponent } from './layout/simple-layout.component';
import { AuthGuard } from '../shared/utils/auth.guard';

import { FilterStringComponent } from '../shared/gridfilter/filter-string.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
	return new AuthHttp(new AuthConfig({
        headerName: 'Authorization', headerPrefix: 'bearer',
		tokenName: 'token',
		tokenGetter: (() => localStorage.getItem('id_token')),
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent, 
    SimpleLayoutComponent,
    TopbarComponent,
    SidebarComponent,FilterStringComponent,
    HomeComponent,
    AboutComponent,
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
    RolesComponent , CreateRoleComponent, EditRoleComponent,
    ProjectsComponent, CreateProjectComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    ToasterModule,
    AppRoutingModule,
    DataTableModule , SharedModule, TieredMenuModule,  MenuModule,  ContextMenuModule
  ],
  providers:
   [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy}, 
    
    ConfigService,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
  
    },
     AuthGuard, 
     AuthenticationService,
     DataService,
    UserserviceService, RoleService, ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

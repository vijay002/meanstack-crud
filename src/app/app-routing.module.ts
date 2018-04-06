import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Layouts
import { FullLayoutComponent } from './layout/full-layout.component';
import { SimpleLayoutComponent } from './layout/simple-layout.component';


//import compoenent
import { UsersComponent } from './users/users.component';
import { HomeComponent  } from '../app/home/home.component';
import { AboutComponent } from './about/about.component';

//import {MasterComponent } from './master/master.component';

//Authgurd
import { AuthGuard } from '../shared/utils/auth.guard';
import { RolesComponent } from './roles/roles.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes : Routes = [
    {
        path :'',
        redirectTo : 'dashboard' ,
        pathMatch : 'full'
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: { title: 'Home' },
        children :
        [
           {
                path: 'dashboard',
                canActivate: [AuthGuard],
                component : HomeComponent
            },
            { 
                path: 'project',
                canActivate:[AuthGuard],
                component: ProjectsComponent
            },
            { 
                path: 'user',
                canActivate:[AuthGuard],
                component: UsersComponent
            },
            { 
                path: 'role',
                canActivate:[AuthGuard],
                component: RolesComponent
            },
            {
                 path: 'about', 
                 canActivate:[AuthGuard],
                 component: AboutComponent 
            }
        ]
    },
    {
        path: 'pages',
        component: SimpleLayoutComponent,
        data: {
          title: 'Pages'
        },
        children: [
          {
            path: '',
            loadChildren: './pages/pages.module#PagesModule',
          }
        ]
    }
]

// RouterModule.forRoot([
//     {
//         path: '',
//         canActivate: [],
//         children: [
//             { path: '', redirectTo: 'home', pathMatch: 'full' },
//             { path: 'home', component: HomeComponent },
//             { path: 'about', component: AboutComponent },
//             { path: 'user', component: UsersComponent }
//         ]
//     }
// ])
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
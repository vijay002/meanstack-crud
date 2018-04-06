import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';

import { Subject } from 'rxjs/Subject';
import { error } from 'util';
import { AuthHttp } from 'angular2-jwt';

export class Project {
    _id : string;
    title: string;
    startingDate: Date;
    endingDate : Date;
    categoryId : number;
    statusId : number;
    
    constructor()
    {
      this.title = '';
      this.startingDate = new Date();
      this.endingDate= null;
      this.categoryId = 0;
      this.statusId =0 ;
    }
  
}

@Injectable()
export class ProjectService {
    _baseUrl: string = '';
    authHeader: any;
    token: string;
    private projectSource = new Subject<Project>();
    project$ = this.projectSource.asObservable();
  
    constructor(
        private _authHttp: AuthHttp,
        private _config : ConfigService
        ) {
        // set token if saved in local storage
        this._baseUrl = _config.getApiURI();
        this.authHeader = _config.getAuthHeaders();
    }

    getAllProjects(event) {
        var qry = this._config.getGridQuery(event);
        return this._authHttp.get(this._baseUrl + 'projects/' + qry).map((res: Response) => {
            return res.json();
          }).catch(this._config.handleError);;
    }

    getAll(): Observable<Project[]> {
        return this._authHttp.get(this._baseUrl + 'projects/getall').map((res: Response) => {
            return res.json();
          }).catch(this._config.handleError);;
    }

    getProjectbyId(id: string): Observable<Project> {
        return this._authHttp.get(this._baseUrl +'projects/' + id).map((res: Response) => {
          return res.json();
        }).catch(this._config.handleError);;
      }

    insertProject(data: Project): Observable<Project> {
        console.log(data);
        return this._authHttp.post(this._baseUrl + 'projects/', data).map((res : Response )=> {
          return res.json();
        }).catch(this._config.handleError);
    }

    updateProject(data: Project): Observable<Project> {
        return this._authHttp
             .put(this._baseUrl +'projects/' + data._id, JSON.stringify(data))
             .map(res => res.json())
    }

    deleteProject(id: any) {
        return this._authHttp.delete(this._baseUrl + 'projects/' + id).map((res: Response) => {
          return res;
        }).catch((error: any ) => Observable.throw(error || 'Server Error'));
    }

}
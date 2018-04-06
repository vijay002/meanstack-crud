import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';

import { Subject } from 'rxjs/Subject';
import { error } from 'util';
import { AuthHttp } from 'angular2-jwt';

export class Role {
    _id : string;
    roleName: string;
    loweredRoleName : string;
    description : string;
    isTechnician : string;
    isEndUser : string;
    isEditHelp: string;
    
    constructor()
    {
      this.roleName = '';
      this.loweredRoleName = '';
      this.description ='';
      this.isTechnician = '';
      this.isEndUser ='';
      this.isEditHelp ='';
    }
  
}
  
@Injectable()

export class RoleService {
    _baseUrl: string = '';
    authHeader: any;
    token: string;
    private roleSource = new Subject<Role>();
    role$ = this.roleSource.asObservable();
  
    constructor(
        private _authHttp: AuthHttp,
        private _config : ConfigService
        ) {
        // set token if saved in local storage
        this._baseUrl = _config.getApiURI();
        this.authHeader = _config.getAuthHeaders();
    }

    getAllRoles(event) {
        var qry = this._config.getGridQuery(event);
        return this._authHttp.get(this._baseUrl + 'roles/' + qry).map((res: Response) => {
            console.log(res);
            return res.json();
          }).catch(this._config.handleError);;
      }


      //bck
    // getAllRoles(): Observable<Role[]> {
    //      return this._authHttp.get(this._baseUrl + 'roles').map((res: Response) => {
    //          return res.json();
    //        }).catch(this._config.handleError);;
    //    }
 

    getAll(): Observable<Role[]> {
        return this._authHttp.get(this._baseUrl + 'roles/getall').map((res: Response) => {
            return res.json();
          }).catch(this._config.handleError);;
      }
    
    
      getUserbyId(id: string): Observable<Role> {
        return this._authHttp.get(this._baseUrl +'roles/' + id).map((res: Response) => {
          return res.json();
        }).catch(this._config.handleError);;
      }

      insertRole(data: Role): Observable<Role> {
        console.log(data);
        //return this._http.post<User>(this._baseUrl +'/users/', data);
        return this._authHttp.post(this._baseUrl + 'roles/', data).map((res : Response )=> {
          return res.json();
        }).catch(this._config.handleError);
      }
    
      updateRole(data: Role): Observable<Role> {
        //return this._authHttp.put<Role>(this._baseUrl +'/roles/' + data._id, data);
        return this._authHttp
             .put(this._baseUrl +'roles/' + data._id, JSON.stringify(data))
             .map(res => res.json())
      }


      deleteRole(id: any) {
        //return this._http.delete(this._baseUrl +'/users/' + id, id);
        return this._authHttp.delete(this._baseUrl + 'roles/' + id).map((res: Response) => {
          return res;
        }).catch((error: any ) => Observable.throw(error || 'Server Error'));
      }



}
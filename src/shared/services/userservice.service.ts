import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';
import { AuthHttp } from 'angular2-jwt';

import { Observer } from 'rxjs/Observer';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw'
import { Response } from '@angular/http/src/static_response';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import { error } from 'util';
import { importExpr } from '@angular/compiler/src/output/output_ast';

export interface User {
  _id : any,
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UserserviceService {
  _baseUrl: string = '';
  constructor(
    private _http:  HttpClient,
    private _authHttp: AuthHttp,
    private config : ConfigService
  ) { 
    this._baseUrl = config.getApiURI();
  }

  // getUsersList() {
  //   console.log('getUsers');
  //   return this._http.get("/api/users")
  //     .map((res : Response) =>  
  //       {
  //          return res;
  //        })
  //        .catch(err => {
  //         console.log(err)
  //         return Observable.of(err)
  //       });
  // }

  getAllUsers(): Observable<User[]> {
    //return this._http.get<User[]>( this._baseUrl + '/users');
    console.log('getAllUsers');
    return this._authHttp.get(this._baseUrl + '/users').map((res: Response) => {
        return res.json();
      }).catch(this.config.handleError);;
  }

  getUserbyId(id: string): Observable<User> {
    //return this._http.get<User>(this._baseUrl +'/users/' + id);
    return this._authHttp.get(this._baseUrl +'/users/' + id).map((res: Response) => {
      return res.json();
    }).catch(this.config.handleError);;

  }

  insertUser(data: User): Observable<User> {
    //return this._http.post<User>(this._baseUrl +'/users/', data);
    return this._authHttp.post(this._baseUrl + 'users/', data).map((res : Response )=> {
      return res.json();
    }).catch(this.config.handleError);
  }

  updateUser(data: User): Observable<void> {
    return this._http.put<void>(this._baseUrl +'/users/' + data._id, data);
  }

  deleteUser(id: any) {
    //return this._http.delete(this._baseUrl +'/users/' + id, id);
    return this._http.delete(this._baseUrl + '/users/' + id).map((res: Response) => {
      return res;
    }).catch((error: any ) => Observable.throw(error || 'Server Error'));
  }

  // createUser(input) {
  //   let headers = new Headers();
  //   // var token = localStorage.getItem('id_token');
  //   // if (token) {
  //   //     headers.append('Authorization', 'bearer ' + token);
  //   // }
  //   return this._http.post('/api/user', input)
  //       .map((res: Response) => {
  //           return res;
  //       }).
  //       catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  // }



  createOrUpdateUser(input) {
    //const content_ = JSON.stringify(input ? input.toJS() : null);
    console.log('Data');
    //console.log(input);

    return this._http.post( this._baseUrl+ '/user', input)
    .map((res: Response) => {
        console.log('response ' + res);
        return res;
    },  (error) => {
         console.log("onGetResponseInfo" + error);
    });
 }







}

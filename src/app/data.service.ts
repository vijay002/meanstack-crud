import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: HttpClient) { }

  getUsers() {
    console.log('getUsers');
    return this._http.get("/api/users")
      .map((res : Response) =>  
        {
           this.result = res;
           console.log(res);
         });
  }

}

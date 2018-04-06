import { Injectable } from '@angular/core';

import { Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { isJSON } from '../utils/commonfs';



@Injectable()
export class ConfigService {
  _apiURI: string;

    constructor() {
        this._apiURI = 'http://localhost:3000/api/';                // 'http://localhost:8081/CoreAPI/api/'; 
    }

    getApiURI() {
        return this._apiURI;
    }

    getApiHost() {
        return this._apiURI.replace('api/', '');
    }

    getAuthHeaders() {
        
        let headers = new Headers();
        let authToken = localStorage.getItem('id_token');
        if (authToken)
        {
            headers.append('Authorization', `Bearer ${authToken}`);
        }
        return headers;
    }

    getGridQuery(event) {
        var qry = "";
        if (event) {
            qry = "?first=" + (event.first ? event.first : "");
            qry += "&rows=" + (event.rows ? event.rows : "");
            qry += "&sortField=" + (event.sortField ? event.sortField : "");
            qry += "&sortOrder=" + event.sortOrder;
            qry += "&filters=" + (event.filters ? JSON.stringify(event.filters) : "");
        }
        return qry;
    }

    handleError(error: any) {
        debugger;
        var applicationError = error.headers.get('Application-Error');
        var serverError = isJSON(error._body) ? error.json() : error;//error._body;
        var modelStateErrors: string = '';

        if (!serverError.type) {
           for (var key in serverError) {
               if (serverError[key])
                   modelStateErrors += serverError[key] + '\n';
           }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }


}

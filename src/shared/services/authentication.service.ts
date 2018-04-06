import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';

import { Subject } from 'rxjs/Subject';
import { error } from 'util';


export class User {
    email: string;
    password: string;
  
    constructor()
    {
      this.email = '';
      this.password = '';
    }
  
  }

  
@Injectable()
export class AuthenticationService {
    _baseUrl: string = '';
    authHeader: any;
    token: string;
    private userSource = new Subject<User>();
    user$ = this.userSource.asObservable();
  
    constructor(private http: Http, private configService: ConfigService) {
        // set token if saved in local storage
        this._baseUrl = configService.getApiURI();
        this.authHeader = configService.getAuthHeaders();
    }

    userHasPermission(Module, Permission) {
        var permissions = JSON.parse(localStorage.getItem('userPermissions'));
        if (permissions) {
            for (var i = 0; i < permissions.length; i++) {
                if (permissions[i].Module == Module && permissions[i].Permission == Permission)
                    return true;
            }
            return false;
        }
    }

    userHasRole(role) {
        var p = localStorage.getItem('profile');
        var profile = p ? JSON.parse(p) : null;
        return profile ? profile.RoleName == role : false;
    }


    loginUser(user): Observable<Object> {
        
        let body = JSON.stringify(user);
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
    
        // return this.http.post(`${this._baseUrl}user/login`, body, options).map( 
        //     (res) =>  this.setToken(res) 
        // );
        
        
        return this.http.post(`${this._baseUrl}account/authenticate`, body, options).map(
            (res : Response ) => {
                console.log(res);
                this.setToken(res);
                return res;
            },
            (error) => {
                console.log("Login Error " + error);
            }
        );
      }
    
      logout() {
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('id_token');
        //localStorage.removeItem('profile');
        //localStorage.removeItem('userPermissions');
      }
    

      //Other Methods

      setUser(user: User) {
          console.log('SETUSER');
        this.userSource.next(user);
      }

      verify(): Observable<Object> {
        let currUser = JSON.parse(localStorage.getItem('currentUser')); 
        let token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
        //let headers = new Headers({ 'x-access-token': token });
        let headers = new Headers({ 'Authorization': token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`${this._baseUrl}/check-state`, options).map( res => this.parseRes(res) );
      }

      setToken(res){
        let body = JSON.parse(res['_body']);
       // console.log(body);
       // console.log(body.data['success']);
        if( body.data['success'] == true ){
          this.token = body.data['token'];
         //console.log(this.token);
          localStorage.setItem('currentUser', JSON.stringify({ 
            email: body.data['user']['email'], 
            token: this.token 
          }));

          localStorage.setItem('id_token', this.token);

        //if (data.profile) {
        //     localStorage.setItem('profile', data.profile);
        // }
        // if (data.permissions) {
        //     localStorage.setItem('userPermissions', JSON.stringify(data.permissions));
        // }

    

        }
        return body;
      }

      parseRes(res){
        let body = JSON.parse(res['_body']);
        return body;
      }


    // login(user): Observable<boolean> {
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     var body = 'Email=' + user.value.email + '&password=' + user.value.password;
    //     return this.http.post(this._baseUrl + 'Account/Login', body, { headers: headers })
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let data = response.json();
    //             if (data.access_token) {
    //                 // store username and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('id_token', data.access_token);

    //                 if (data.profile) {
    //                     localStorage.setItem('profile', data.profile);
    //                 }
    //                 if (data.permissions) {
    //                     localStorage.setItem('userPermissions', JSON.stringify(data.permissions));
    //                 }
    //             }
    //             return response.json();
    //         }).catch(this.configService.handleError);
    // }




}
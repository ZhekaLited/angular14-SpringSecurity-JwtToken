import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '@environments/environment';
import {User} from '@app/_models';
import {Observable, retry, throwError, BehaviorSubject, map} from 'rxjs';
import {Roles} from '@app/_models/Roles';
import {AuthenticationRequestDto} from '@app/_models/AuthenticationRequestDto';
import {ActivatedRoute, Router } from '@angular/router';



@Injectable({providedIn: 'root'})

export class UserService {
  result: any;
  [x: string]: any;
  protected route: Router;


  constructor(private http: HttpClient,private router: Router) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  getAllRoles() {
    return this.http.get<Roles[]>('http://localhost:8080/users/listRole')
  }



  setResultFromRest(jsString: any) {
    jsString.value
    this.result = jsString.toString();
  }

  getAll() {
    return this.http.get<User[]>('http://localhost:8080/users/list');
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  CreateBug(data: any): Observable<User> {
    return this.http
      .post<User>('http://localhost:8080/users/add',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1));
  }

  UpdateBug(id: any, users: any): Observable<User> {
    return this.http
      .put<User>(`http://localhost:8080/users/edit?id=${id}`,
        JSON.stringify(users),
        this.httpOptions
      )
      .pipe(retry(1));
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}


import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '@environments/environment';
import {User} from '@app/_models';
import { Observable, retry, throwError } from 'rxjs';
import { Roles } from '@app/_models/Roles';


@Injectable({providedIn: 'root'})
export class UserService {
    [x: string]: any;
  constructor(private http: HttpClient) {
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  getAllRoles() {
    return this.http.get<Roles[]>('http://localhost:8080/users/listRole')
  }

  getAll() {
    return this.http.get<User[]>('http://localhost:8080/users/list');
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
   CreateBug(data:any):Observable <User> {
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
}


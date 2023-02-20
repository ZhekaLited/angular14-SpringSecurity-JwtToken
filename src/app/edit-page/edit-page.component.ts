import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_models';
import { Roles } from '@app/_models/Roles';
import { UserService } from '@app/_services';
import { PrimeNGConfig } from 'primeng/api';
import { first, Observable, retry } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  user: any = {};
  users: User[] = [];
  updateusersForm!: FormGroup;
  cities: any[];
  selectedRoles: Roles[] = [];
  roles: any[] = [];


  ngOnInit() {
    this.updateForm()
    this.userService.getAllRoles().pipe(first()).subscribe(roles => {
      roles.forEach( r => {
        this.roles.push(new Roles(r.name,r.name,r.id))
      }
    )
  })}

  constructor(private primengConfig: PrimeNGConfig, private http: HttpClient, public fb: FormBuilder, private ngZone: NgZone,
              private router: Router, public userService: UserService, private actRoute: ActivatedRoute,) {

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.getUserById(id).subscribe((user) => {
      this.updateusersForm = this.fb.group({
        id:[user.id],
        login:[user.login],
        password:[user.password],
        salary:[user.salary],
        name:[user.name],
        birthday:[user.birthday],
        roles:[this.selectedRoles]
      })
      user.roles.forEach(t => this.selectedRoles.push(new Roles(t.name,t.name,t.id)))
      console.log(this.selectedRoles)
      console.log(this.roles)
    })

    this.cities = [
      this.getAllRoles()
    ];
  }
    updateForm() {
      this.updateusersForm = this.fb.group({
        id:[''],
        login: [''],
        password: [''],
        salary:[''],
        name:[''],
        birthday:[''],
        roles:['']
      });
    }
  submitForm(){
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.UpdateBug(id, this.updateusersForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/admin'))
    })
  }
  getAllRoles() {
    return this.http.get<User[]>('http://localhost:8080/users/listRole')
  }
  getUserById(id: string | null): Observable<User> {
    return this.http
      .get<User>(`http://localhost:8080/users/userById?id=${id}`)
      .pipe(retry(1));
  }
  takeRole(str: any) {
    let strEmp = "";
    for (let i = 0; i<str.length; i++) {
      if (i < str.length - 1) {
        strEmp += str[i].name + ", "
      }
      else {
        strEmp += str[i].name
      }
    }
    return strEmp;
  }
}


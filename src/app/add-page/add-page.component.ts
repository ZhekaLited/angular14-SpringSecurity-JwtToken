import {HttpClient} from '@angular/common/http';
import {Component, NgZone, OnInit} from '@angular/core';
import {User} from '@app/_models';
import {SelectItem, PrimeNGConfig} from "primeng/api";
import {FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { first } from 'rxjs';
import { Roles } from '@app/_models/Roles';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {

  usersForm!: FormGroup;
  users: User[] = [];

  selectedCountries1: string[] = [];

  cities: any[];

  roles: Roles[] = [];


  constructor(
    private primengConfig: PrimeNGConfig, private http: HttpClient,public fb: FormBuilder,private ngZone: NgZone,
    private router: Router,public userService:UserService

  ) {

    this.cities = [
      this.getAllRoles()
    ];
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.addIssue();
    this.userService.getAllRoles().pipe(first()).subscribe(roles => {
      roles.forEach( r => {
          this.roles.push(new Roles(r.name,r.name,r.id))
        }
      )
    });
  }

  addIssue() {
    this.usersForm = this.fb.group({
      login: [''],
      password: [''],
      salary:[''],
      name:[''],
      birthday:[''],
      roles:['']
    });
  }
  submitForm() {
    this.userService.CreateBug(this.usersForm.value).subscribe((res) => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/admin'));
    });
  }
  getAllRoles() {
    return this.http.get<User[]>('http://localhost:8080/users/listRole')
  }
}

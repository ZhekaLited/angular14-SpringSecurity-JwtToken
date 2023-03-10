import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

import {TranslateService} from "@ngx-translate/core";
import { Global } from "src/app/globals";
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'admin.component.html' ,
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    [x: string]: any;
    loading = false;
    users: User[] = [];

    constructor(
      private userService: UserService,
      private translate: TranslateService,
      private http: HttpClient) {

      translate.setDefaultLang(Global.language);
      translate.use(Global.language);
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
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

  useLanguage(language: string): void {
    Global.language = language;
    this.translate.use(Global.language);
  }
  deleteUser(login: string) {
    return this.http.delete(`http://localhost:8080/users/remove?login=${login}`).subscribe();
  }

  ViewuserDetail(user_id : any){
    this.router.navigate(['editPage', user_id]);
  }
}

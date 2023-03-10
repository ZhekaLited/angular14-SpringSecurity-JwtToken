import {Component} from '@angular/core';
import {first} from 'rxjs/operators';

import {User} from '@app/_models';
import {UserService, AuthenticationService} from '@app/_services';
import {TranslateService} from "@ngx-translate/core";
import {Global} from "src/app/globals";
import {AppComponent} from 'src/app/app.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Roles} from '@app/_models/Roles';
import {Router} from '@angular/router';


@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loading = false;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private appComponent: AppComponent,
    private http: HttpClient,
    protected router: Router,
  ) {
    translate.setDefaultLang(Global.language);
    translate.use(Global.language);
  }

  ngOnInit() {
    this.loading = true;
    this.loading = false;
    this.getUser(this.appComponent.loginFromForm);
  }

  getUser(login: any) {
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post('http://localhost:8080/api/v1/auth/user', {login: login}, {headers}, )
      .subscribe(rsp => {
        this.setVisiblePanel(rsp as string);
      });
  }

  setVisiblePanel(jsonString: string) {
    let jsonObj = JSON.parse(JSON.stringify(jsonString)); // string to "any" object first
    let employee = jsonObj as User;

    let isAdmin = this.isAdminRole(employee.roles);

    this.appComponent.panelIsVisible = true;
    this.appComponent.isAdminRole = isAdmin;
    window.localStorage.setItem('access_admin', String(isAdmin));
  }

  isAdminRole(roles: Roles[]) {
    let result: boolean;
    result = false;

    for (let role of roles) {
      if (role.name == "ADMIN") {
        result = true;
        break;
      }
    }
    return result;
  }

  useLanguage(language: string): void {
    Global.language = language;
    this.translate.use(Global.language);
  }
}

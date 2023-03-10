import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';

import {AuthenticationService} from './_services';
import {User} from './_models';

import {TranslateService} from "@ngx-translate/core";
import {Global} from "src/app/globals";
import {HttpClient} from '@angular/common/http';
import {AuthenticationRequestDto} from './_models/AuthenticationRequestDto';
import {Roles} from './_models/Roles';
import {UserService} from "src/app/_services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent implements OnInit, OnDestroy {
  [x: string]: any;

  currentUser!: AuthenticationRequestDto;

  user!: User;
  panelIsVisible!: boolean;
  isAdminRole: boolean;
  loginFromForm:string;

  constructor(private UserService: UserService, private authenticationService: AuthenticationService, private translate: TranslateService) {
    translate.setDefaultLang(Global.language);
    translate.use(Global.language);
  }

  ngOnInit() {
    //Во время загрузки страницы
    const recoveryLogin = window.localStorage.getItem("access_login");
    if (recoveryLogin != null && recoveryLogin != "") {
      this.loginFromForm = recoveryLogin;

      const recoveryIsAdmin = window.localStorage.getItem("access_admin");
      if (recoveryIsAdmin != null && recoveryLogin !== "") {
        this.isAdminRole = recoveryIsAdmin === "true";
        if(this.isAdminRole) {
          this.panelIsVisible = true;
        }
      }
    }
  }

  ngOnDestroy() {
    window.localStorage.removeItem('access_login');
    window.localStorage.removeItem('access_admin');
  }
  
  logOut() {
    window.localStorage.setItem('access_login', this.loginFromForm);
    this.UserService.logout();
  }

  useLanguage(language: string): void {
    Global.language = language;
    this.translate.use(Global.language);
  }
}

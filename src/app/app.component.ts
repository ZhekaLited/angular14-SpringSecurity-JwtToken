import {Component, Inject} from '@angular/core';

import {AuthenticationService} from './_services';
import {User, Role} from './_models';

import {TranslateService} from "@ngx-translate/core";
import {Global} from "src/app/globals";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  //providers: [/* other providers, */ {provide: 'languageType', useValue: 'en'}]

})
export class AppComponent {
  user?: User | null;

  constructor(private authenticationService: AuthenticationService, private translate: TranslateService,
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
    translate.setDefaultLang(Global.language);
    translate.use(Global.language);
  }
  
  

  get isAdmin() {
    return this.user?.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }

  useLanguage(language: string): void {
    Global.language = language;
    this.translate.use(Global.language);
  }
}

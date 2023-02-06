import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import {TranslateService} from "@ngx-translate/core";
import { Global } from "src/app/globals";



@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    loading = false;
    user: User;
    userFromApi?: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private translate: TranslateService,
    ) {
        this.user = <User>this.authenticationService.userValue;
        translate.setDefaultLang(Global.language);
        translate.use(Global.language);
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
  useLanguage(language: string): void {
    Global.language = language;
    this.translate.use(Global.language);
  }
}

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, takeUntil} from 'rxjs/operators';

import {AuthenticationService} from '@app/_services';

import {TranslateService} from "@ngx-translate/core";
import {Global} from "src/app/globals";
import {AuthenticationRequestDto} from '@app/_models/AuthenticationRequestDto';
import { EntityDetailsComponent } from 'src/app/_services/EntityDetailsComponent';
import { AppComponent } from 'src/app/app.component';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends EntityDetailsComponent implements OnInit {
  public hidePassword: boolean = true;

  @ViewChild("passwordInput", {static: false})
  private passwordInput!: ElementRef;
  errors = '';
  submittted = false;


  constructor(private translate: TranslateService,
              route: ActivatedRoute, fb: FormBuilder, private authenticationService: AuthenticationService, router: Router,
              private appComponent: AppComponent) {
    super(route, fb, router);
  }


  public changePasswordVisibilityClickedHandler(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.hidePassword = !this.hidePassword;

    this.setCaretToPosition(this.passwordInput, this.passwordInput.nativeElement.value.length);
  }

  protected saveInternal() {
    const loginDTO: AuthenticationRequestDto = this.detailsForm.getRawValue();

    this.appComponent.loginFromForm = this.detailsForm.value.login;
    window.localStorage.setItem('access_login', this.appComponent.loginFromForm);

    this.authenticationService.login(this.detailsForm.getRawValue())
      .subscribe((token) => {
        if (token) {
          localStorage.setItem("access_token", token);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        }
        errors: errors => {
          this.errors = errors;
        }
      });
  }

  get f() { return this.detailsForm.controls; }

  onSubmit() {
    this.submittted = true;

    // stop here if form is invalid
    if (this.detailsForm.invalid) {
      return;
    }
  }


  ngOnInit(): void {
    this.createForm();
  }


  private createForm() {
    this.detailsForm = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  useLanguage(language: string): void {
    Global.language = language;
    this.translate.use(Global.language);
  }
}


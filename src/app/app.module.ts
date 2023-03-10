import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from "primeng/divider";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { JwtInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AddPageComponent } from './add-page/add-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '@app/_services';
import { EditPageComponent } from './edit-page/edit-page.component';




export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

// @ts-ignore
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        PasswordModule,
        DividerModule,
        DialogModule,
        MultiSelectModule,
        InputTextModule,
        ButtonModule,
        TableModule,
      BrowserAnimationsModule,
       TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        AddPageComponent,
        EditPageComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
          UserService,
      
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}

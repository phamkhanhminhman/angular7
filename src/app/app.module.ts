import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {LoginService} from './services/login.service';
import {HttpService} from './services/http.service';
import {CheckLoginGuard} from './guards/check-login.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ListuserComponent } from './components/listuser/listuser.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { ImportComponent } from './components/import/import.component';
import {HttpIntercept} from './interceptor/http.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    NotfoundComponent,
    ListuserComponent,
    EdituserComponent,
    ChangepassComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginService, CheckLoginGuard, HttpService,{provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

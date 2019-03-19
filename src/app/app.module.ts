import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {LoginService} from './services/login.service';
import {HttpService} from './services/http.service';
import {CheckLoginGuard} from './guards/check-login.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ListuserComponent } from './listuser/listuser.component';
import { EdituserComponent } from './edituser/edituser.component';
 
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
    EdituserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [LoginService, CheckLoginGuard, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

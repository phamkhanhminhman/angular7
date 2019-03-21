import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {CheckLoginGuard} from './guards/check-login.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { ListuserComponent } from './components/listuser/listuser.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { ImportComponent } from './components/import/import.component';

const routes: Routes = [
  {path: '',  component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [CheckLoginGuard]},
  {path: 'list', component: ListuserComponent, canActivate: [CheckLoginGuard]},
  {path: 'edit/:id', component: EdituserComponent, canActivate: [CheckLoginGuard]},
  {path: 'changepass', component: ChangepassComponent, canActivate: [CheckLoginGuard]},
  {path: 'import', component: ImportComponent},
  {path: '**', component: NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


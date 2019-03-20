import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {CheckLoginGuard} from './guards/check-login.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ListuserComponent } from './listuser/listuser.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { ImportComponent } from './import/import.component';

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
export const routingComponents = [LoginComponent]

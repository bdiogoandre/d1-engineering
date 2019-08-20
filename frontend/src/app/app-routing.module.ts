import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  {path: '', component: WelcomeScreenComponent},
  {path: 'create', component: CreateUserComponent},
  {path: 'list', component: ListUsersComponent},
  {path: 'edit/:id', component: CreateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

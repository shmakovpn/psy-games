import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from '../authentication/auth.module';
import { AuthGuard } from '../authentication/auth.guard';

import { LoginComponent } from '../authentication/login.component';
import { HelloComponent } from '../hello/hello.component';
import { NavbarComponent } from '../navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent},
  { path: '**', component: HelloComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [AuthModule, RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}

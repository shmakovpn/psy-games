import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from '../authentication/auth.module';
import { AuthGuard } from '../authentication/auth.guard';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';

import { LoginComponent } from '../authentication/login.component';
import { HelloComponent } from '../hello/hello.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent as JwtLoginComponent } from '../jwt-auth/login/login.component';

const routes: Routes = [
  { path: 'jwt', component: JwtLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: '**', component: HelloComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [AuthModule, JwtAuthModule, RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}

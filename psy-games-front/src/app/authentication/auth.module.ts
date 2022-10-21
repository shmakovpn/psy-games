import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ServiceModule } from '../service/service.module';
import { LoginComponent } from './login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [BrowserModule, FormsModule, ServiceModule],
  providers: [AuthService, AuthGuard],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthModule {}

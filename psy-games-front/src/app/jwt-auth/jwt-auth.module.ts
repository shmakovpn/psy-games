import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { JwtAuthService } from './jwt-auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  providers: [JwtAuthService],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
  exports: [LoginComponent],
})
export class JwtAuthModule {}

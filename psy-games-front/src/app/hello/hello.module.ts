import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HelloComponent } from './hello.component';

@NgModule({
  imports: [BrowserModule],
  providers: [],
  declarations: [HelloComponent],
  exports: [HelloComponent],
})
export class HelloModule {}

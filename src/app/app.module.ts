import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Module exports
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule
    ,AppRoutingModule
    ,PagesModule
    ,SharedModule
    ,AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SitebarComponent } from './sitebar/sitebar.component';

@NgModule({
  declarations: [BreadcrumsComponent, SitebarComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [BreadcrumsComponent, SitebarComponent, HeaderComponent],
})
export class SharedModule {}

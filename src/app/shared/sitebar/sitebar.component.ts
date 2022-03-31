import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sitebar',
  templateUrl: './sitebar.component.html',
  styles: [],
})
export class SitebarComponent implements OnInit {
  menuItems: any[] = [];
  constructor(private sidebarService: SidebarService) {
    this.menuItems = sidebarService.menu
  }

  ngOnInit(): void {}
}

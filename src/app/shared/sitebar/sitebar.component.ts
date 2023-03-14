import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sitebar',
  templateUrl: './sitebar.component.html',
  styles: [],
})

export class SitebarComponent implements OnInit {
  public usuario: Usuario;
  menuItems: any[] = [];
  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService,) {
    this.menuItems = sidebarService.menu
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {}
}

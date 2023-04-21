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
  constructor(public sidebarService: SidebarService, private usuarioService: UsuarioService,) {
    // SE QUITA ESTA IMPLEMENTACION PORQUE AHORA SE LLAMA DIRECTAMENTE AL sidebarService.MENU DESDE EL HTML DE ESTE COMPONENTE
    //this.menuItems = sidebarService.menu
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {}
}

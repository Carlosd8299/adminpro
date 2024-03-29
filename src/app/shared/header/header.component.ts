import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario!: Usuario;

  constructor(private usuarioService: UsuarioService,
    private router: Router) {
    this.usuario = usuarioService.usuario;
  }



  ngOnInit(): void {
  }
  logOut() {
    this.usuarioService.logOut();
    this.router.navigateByUrl('/login');
  }
  buscar(word: string) {
    if (word.length === 0)
      this.router.navigateByUrl(`/dashboard`);

    this.router.navigateByUrl(`/dashboard/buscar/${word}`);
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs?: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;


  constructor(private _usuarioService: UsuarioService, private _busquedaService: BusquedasService, private _imageService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this._imageService.isNuevaImagen.pipe(delay(100)).subscribe(img => this.cargarUsuarios());
  }

  cambiarPagina(desde: number) {
    this.desde += desde;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= desde;
    }
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;

      this.cargando = false;
    });
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this._busquedaService.buscar('usuarios', termino).subscribe((resultado: any[]) => {
      this.usuarios = resultado.map(user => new Usuario(user.nombre, user.email, '', user.google, user.rol, user.img, user.uid))
    })
    return this.usuarios
  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this._usuarioService.usuario.uid) {
      return Swal.fire('Error', `No puede borrarse a si mismo`, 'error')
    }
    return;
    Swal.fire({
      title: '¿Borrar este usuario?',
      text: "Estas a punto de borrar",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.eliminarUsuario(usuario).subscribe(resp => {
          Swal.fire('Usuario borado', `${usuario.nombre} fue eliminado`, 'success')
          this.cargarUsuarios();
        }
        );
      }
    })

  }

  cambiarRol(usuario: Usuario) {

    this._usuarioService.actualizarUsuario(usuario).subscribe(resp => {
      console.log(resp);

    });
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this._imageService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }

}

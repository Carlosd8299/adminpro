import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { map, tap, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios-interface';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;
  constructor(private http: HttpClient) { }

  logOut() {
    localStorage.removeItem('token'); localStorage.removeItem('menu');
    //TODO: Borrar Menu

  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  get role(): 'ADMIN_ROL'|'USER_ROL' {
    return  this.usuario.rol!;
  }
  get token() {
    return localStorage.getItem('token') || '';
  }
  get uid() {
    return this.usuario.uid || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }
  validarToken(): Observable<boolean> {

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            email, nombre, rol, google, uid, password, img
          } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', google, rol, img, uid)

          this.guardarLocalStorage(resp.token, resp.menu);

          return true;
        }),
        catchError(error =>
          of(false)
        )
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }
  // Se recomienda crear la nterfaz . Pero {} tambien se puede pedir datos
  actualizarPerfil(data: { email: string, nombre: string, rol: string }) {
    data = { ...data, rol: this.usuario.rol! }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${this.uid}`, usuario, this.headers);
  }

  login(formData: Login) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        delay(1000),
        map(resp => {
          const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email, '', user.google, user.rol, user.img, user.uid))
          return {
            total: resp.total,
            usuarios
          };
        })
      );
  }
  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers)
  }
}

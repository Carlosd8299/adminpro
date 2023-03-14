import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public Usuario?: Usuario;
  public profileForm!: FormGroup;
  public imagenSubir?: File;
  public imgTemp?: any;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fileService: FileUploadService) {
    this.Usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.Usuario?.nombre, Validators.required,],
      email: [this.Usuario?.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.profileForm.value).subscribe(res => {
      const { nombre, email } = this.profileForm.value;
      this.Usuario!.nombre = nombre;
      this.Usuario!.email = email;

      Swal.fire('Guardado', 'Sus cambios ha sido guardados', 'success')
    }, (err) => {
      Swal.fire('Ha ocurrido un error al intentar guardar', err.error.msg, 'error')


    })
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileService.actualizarFoto(this.imagenSubir!, 'usuarios', this.Usuario?.uid!)
      .then(img => {
        this.Usuario!.img = img
        Swal.fire('Guardado', 'Sus cambios ha sido guardados', 'success')
      }).catch(error => {
        Swal.fire('Ha ocurrido un error al intentar guardar', error.error.msg, 'error')
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public imagenSubir?: File;
  public imgTemp?: any;

  constructor(public imageService: ModalImagenService, private fileService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarmodal() {
    this.imgTemp = null;
    this.imageService.cerrarModal();
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
    const id = this.imageService.id;
    const tipo = this.imageService.tipo;

    this.fileService.actualizarFoto(this.imagenSubir!, tipo, id)
      .then(img => {
        this.imageService.isNuevaImagen.emit(img);
        Swal.fire('Guardado', 'Sus cambios ha sido guardados', 'success')
        this.cerrarmodal()
      }).catch(error => {
        Swal.fire('Ha ocurrido un error al intentar guardar', error.error.msg, 'error')
      });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medicos';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos!: Medico[];
  public medicosTemp?: Medico[];
  public isCargando!: boolean;
  public imgSubs?: Subscription;

  constructor(private medicoService: MedicoService, private _imageService: ModalImagenService,
    private _busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this._imageService.isNuevaImagen.pipe(delay(100)).subscribe(img => this.cargarMedicos());
  }

  cargarMedicos() {
    this.isCargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.isCargando = false
        this.medicos = medicos;
        this.medicosTemp = this.medicos;
      }
      );
  }
  abrirModal(medico: Medico) {
    this._imageService.abrirModal('medicos', medico._id!, medico.img);
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      this.medicos = this.medicosTemp!;
    }
    this._busquedaService.buscar('medicos', termino).subscribe((resultado: any[]) => {
      this.medicos = resultado.map(medico => new Medico(medico.nombre, medico._id, medico.img, undefined, undefined))
    })
    return this.medicos
  }

  borrarMedico(uid: string) {
    Swal.fire({
      title: '¿Borrar este usuario?',
      text: "Estas a punto de borrar",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.medicoService.eliminarMedico(uid).subscribe(resp => {
          Swal.fire('Usuario borado', `Medico fue eliminado`, 'success')
          this.cargarMedicos();
        }
        );
      }
    })
  }





}

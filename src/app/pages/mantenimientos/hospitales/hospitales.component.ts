import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales!: Hospital[];
  public hospitalesTemp?: Hospital[];
  public isCargando!: boolean;
  public imgSubs?: Subscription;

  constructor(private hospitalService: HospitalService,
    private _imageService: ModalImagenService,
    private _busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarhospitales();
    this.imgSubs = this._imageService.isNuevaImagen.pipe(delay(100)).subscribe(img => this.cargarhospitales());
  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  cargarhospitales() {
    this.isCargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.isCargando = false
        this.hospitales = hospitales;
        this.hospitalesTemp = this.hospitales;
      }
      );
  }
  abrirModal(hospital: Hospital) {
    this._imageService.abrirModal('hospitales', hospital._id!, hospital.img);
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Guardado', hospital.nombre, 'success')
      })
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id!)
      .subscribe(resp => {
        this.cargarhospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success')
      })
  }

  async abrirAlertCrear() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      title: 'Crear nuevo hospital',
      inputLabel: 'Nombre del nuevo hospital',
      inputPlaceholder: 'Ej: Hospital del norte',
      showCancelButton: true
    })

    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital(value!)
        .subscribe((resp: any) => this.hospitales.push(resp.hospital));
    }

  }


  buscar(termino: string) {

    if (termino.length === 0) {
      this.hospitales = this.hospitalesTemp!;
    }
    this._busquedaService.buscar('hospitales', termino).subscribe((resultado: any[]) => {
      this.hospitales = resultado.map(hospital => new Hospital(hospital.nombre, hospital.uid, undefined, hospital.img))
    })
    return this.hospitales
  }


}

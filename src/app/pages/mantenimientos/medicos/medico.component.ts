import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medicos';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitalList: Hospital[] = [];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado: any;

  constructor(
    private fb: FormBuilder,
    private _hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hospital: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    //Para obetener el id que esta en la URl me tengo que suscribir o escuchar los cambios de la url por si en algun momento cambia el medico
    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));
    this.cargarHospitales();
    this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalid => {

      this.hospitalSeleccionado = this.hospitalList.find(h => h._id === hospitalid);
    });

  }
  guardarMedico() {

    if (this.medicoSeleccionado) {
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data).subscribe(resp => { Swal.fire('Medico actualizado', `Se ha actualizado el medico ${this.medicoSeleccionado.nombre}`, 'success') })
    } else {
      //crear
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe({
          next: (exito) => {
            Swal.fire('Medico creado', `Se ha creado el medico ${exito.medico.nombre}`, 'success')

          },
          error(err) {
            Swal.fire('Medico no creado', `error creando el medico ${err}`, 'error')
          },
        });
    }

  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((hospitales: Hospital[]) => {
      this.hospitalList = hospitales;
    })
  }

  cargarMedico(id: string) {

    if (id === 'crear') {
      return;
    }

    this.medicoService.getMedicoById(id).pipe(delay(100)).subscribe(medico => {

      if (medico === undefined) {
        return this.router.navigateByUrl(`/dashboard/medicos`)
      }

      this.medicoSeleccionado = medico;
      //desestructurando la respuesta del medicobyid
      const { nombre, hospital: { _id }, email } = medico;
      this.medicoForm.setValue({ nombre, email, hospital: _id, });
      return;
    });
  }

}

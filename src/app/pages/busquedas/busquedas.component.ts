import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medicos';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, private _busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      console.log(termino);
      this.busquedaBlobal(termino);
    })
  }

  busquedaBlobal(termino: string) {
    this._busquedasService.busquedaglobal(termino).subscribe(resp => {
      this.medicos = resp.medicos.map(medico => new Medico(medico.nombre, medico._id, medico.img, undefined, undefined));
      this.hospitales = resp.hospitales.map(hospital => new Hospital(hospital.nombre, hospital.uid, undefined, hospital.img));
      this.usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email, '', user.google, user.rol, user.img, user.uid));
    })
  }

}

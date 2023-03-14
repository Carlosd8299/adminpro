import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${baseUrl}/uploads/${tipo}/${id}`
      // FormData es para enviar info al backend en la peticion fetch que se esta haciendo
      const formData = new FormData()
      //
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token')!
        }, body: formData
      })


      const data = await resp.json();

      if(data.ok){
        return data.nombreArchivo;
      }{
        return false;
      }

      console.log(data);
      return data;
    } catch (Error) {
      return false;
    }
  }



}

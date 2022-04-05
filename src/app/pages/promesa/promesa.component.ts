import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [],
})
export class PromesaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject)=>{
    //   if(false){
    //     resolve('Hola mundo');
    //   }else{
    //     reject("Error");
    //   }
    // });
    // promesa.then((mensaje)=>{
    //   console.log(mensaje);
    // }).catch((error)=>{
    //   console.log(error);
    // })
    // console.log('Fin del init');
    this.getUsuario().then(usuario => console.log(usuario));
  }

  getUsuario() {
    const promise = new Promise((resolve) => {
      fetch('https://reqres.in/api/users?page=2', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });

    return promise;
  }
}

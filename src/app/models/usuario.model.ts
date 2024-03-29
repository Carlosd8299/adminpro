import { environment } from "src/environments/environment";

const base_url = environment.base_url;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public rol?: 'ADMIN_ROLE'|'USER_ROLE',
    public img?: string,
    public uid?: string
  ) {}


  get imageUrl(){
    if(this.img){
      return `${base_url}/uploads/usuarios/${this.img}`;
    }else{
      return `${base_url}/uploads/usuarios/no`;
    }

  }
}

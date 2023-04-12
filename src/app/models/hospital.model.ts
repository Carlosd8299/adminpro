import { environment } from "src/environments/environment";

interface _hospitalUser {
  _id: string,
  usuario: string,
  img: string,
}

const base_url = environment.base_url;
export class Hospital {
  constructor(
    public nombre: string,
    public _id?: string,
    public Usuario?: _hospitalUser,
    public img?: string,
  ) { }

}

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public rol?: string,
    public img?: string,
    public uid?: string
  ) {}
}

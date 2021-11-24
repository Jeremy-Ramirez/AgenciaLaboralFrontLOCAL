export class EmpresaView {
  id: number;
  ruc_cedula: String;
  nombrecomercial: String;
  razonsocial: String;
  estado : number;
  
  constructor( id?:number, ruc_cedula?: string, nombrecomercial?: string,    
    razonsocial?: string,estado?:number) {
    this.id = id;
    this.ruc_cedula = ruc_cedula;
    this.nombrecomercial = nombrecomercial;
    this.razonsocial = razonsocial;
    this.estado = estado;
  }
  
}
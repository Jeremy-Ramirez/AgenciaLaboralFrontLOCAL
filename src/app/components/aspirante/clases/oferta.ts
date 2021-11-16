export class OfertaView {
  id: number;
  cargo: String;
  profesion: String;
  descripcioncargo: String;
  nivelestudios: String;
  jornada: String;
  licencia: String;
  idiomas: String;
  discapacidad: String;
  posibilidadviajar: String;
  posibilidadcambioresidencia: String;
  nombreEmpresa: String;
  fechainicio: String;
  fechacierre: String;
  estado : number;
  
  constructor( id?:number, cargo?: string, profesion?: string, 
    descripcioncargo?: string, nivelestudios?: string, jornada?: string,
    licencia?: string, idiomas?: string, discapacidad?: string, posibilidadviajar?: string,
    posibilidadcambioresidencia?: string,nombreEmpresa?: string,
    fechainicio?: string,fechacierre?: string,estado?:number) {
    this.id = id;
    this.cargo = cargo;
    this.profesion = profesion;
    this.descripcioncargo = descripcioncargo;
    this.nivelestudios = nivelestudios;
    this.jornada = jornada;
    this.licencia = licencia;
    this.idiomas = idiomas;
    this.discapacidad = discapacidad;
    this.posibilidadviajar = posibilidadviajar;
    this.posibilidadcambioresidencia = posibilidadcambioresidencia;
    this.nombreEmpresa = nombreEmpresa;
    this.fechainicio = fechainicio;
    this.fechacierre = fechacierre;
    this.estado = estado;
  }
  
}
export class OfertaView {
  id: number;
  aniosexperiencia: number;
  rangoedad: String;
  experticia: String;
  sueldo: number;
  provincia: String;
  ciudad: String;
  fechainicio: String;
  fechacierre: String;
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
  estado : number;
  
  constructor( id?:number,aniosexperiencia?:number, rangoedad?: string,experticia?: string,sueldo?: number,
    provincia?: string,ciudad?: string,cargo?: string, profesion?: string, 
    descripcioncargo?: string, nivelestudios?: string, jornada?: string,
    licencia?: string, idiomas?: string, discapacidad?: string, posibilidadviajar?: string,
    posibilidadcambioresidencia?: string,nombreEmpresa?: string,
    fechainicio?: string,fechacierre?: string,estado?:number) {
    this.id = id;
    this.aniosexperiencia = aniosexperiencia;
    this.rangoedad = rangoedad;
    this.experticia = experticia;
    this.sueldo = sueldo;
    this.provincia = provincia;
    this.ciudad = ciudad;
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
export interface PersonasCreacion{
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  pais: string;
  estado: string;
  ciudad: string;
}

export interface PersonasCreacionResponse{
  key: string;
  nombre: string;
}

export interface UsuariosCreacion{
  correoElectronico: string;
  contrasena: string;
  tipoUsuario: number;
  personaId:string;
  nombre?:string;
}

export interface UsuariosCreacionResponse{
  key: string;
  mail: string;
}
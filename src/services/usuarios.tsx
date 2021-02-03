import axios from 'axios'
import {baseUrlAPI} from '../app.json'
import {UsuariosCreacion,UsuariosCreacionResponse} from '../models/usuarios'

class UsuariosAPI{
  
  urlAPI:string = `${baseUrlAPI}usuarios/`;

  crear(usuario: UsuariosCreacion): Promise<UsuariosCreacionResponse> {
    return new Promise((resolve,reject) =>{
      return axios.post<UsuariosCreacionResponse>(this.urlAPI,usuario)
      .then((response) => resolve(response.data as UsuariosCreacionResponse))
      .catch(error => reject(error))
    })
  }

  obtenerPorId(id:number): Promise<UsuariosCreacion> {
    return new Promise((resolve,reject) =>{
      return axios.get<UsuariosCreacion>(`${this.urlAPI}${id}`)
      .then((response) => resolve(response.data) )
      .catch(error => reject(error) )
    })
  }

}

const usuariosAPI = new UsuariosAPI();
export default usuariosAPI;
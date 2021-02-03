import axios from 'axios'
import {baseUrlAPI} from '../app.json'
import {PersonasCreacion,PersonasCreacionResponse} from '../models/usuarios'

class PersonasAPI{
  
  urlAPI:string = `${baseUrlAPI}personas/`;

  crear(persona: PersonasCreacion): Promise<PersonasCreacionResponse> {
    return new Promise((resolve,reject) =>{
      return axios.post<PersonasCreacionResponse>(this.urlAPI,persona)
      .then((response) => resolve(response.data as PersonasCreacionResponse))
      .catch(error => reject(error))
    })
  }

  obtenerPorId(id:number): Promise<PersonasCreacion> {
    return new Promise((resolve,reject) =>{
      return axios.get<PersonasCreacion>(`${this.urlAPI}${id}`)
      .then((response) => resolve(response.data) )
      .catch(error => reject(error) )
    })
  }

}

const personasAPI = new PersonasAPI();
export default personasAPI;
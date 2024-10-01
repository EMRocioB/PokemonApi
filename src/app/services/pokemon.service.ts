import { Injectable } from '@angular/core';//Importa el decorador Injectable para que el servicio pueda ser inyectado en otros componentes o servicios
import { HttpClient } from '@angular/common/http';//Importa HttpClient para realizar peticiones HTTP
import { Observable } from 'rxjs';//Importa Observable de RxJS para manejar operaciones asíncronas

@Injectable({
  providedIn: 'root',//Proporciona el servicio en el root del modulo, lo que significa que estara disponible en toda la aplicación
})
export class PokemonService {
  private urlEndPoint = 'https://pokeapi.co/api/v2/';//Define la URL base de la API de Pokemon

  //Constructor que inyecta HttpClient para poder hacer peticiones HTTP.
  constructor(private http: HttpClient) {}

  /**
   * Obtiene información de un Pokemon por su nombre
   * @param nombre-El nombre del Pokemon que se desea buscar
   * @returns Un Observable que emite los datos del Pokemon
   */
  getPokemon(nombre: string): Observable<any> {//El tipo de retorno es Observable<any>, lo que significa que puede emitir cualquier tipo de datos
    return this.http.get<any>(`${this.urlEndPoint}/pokemon/${nombre}`); //Realiza una petición GET a la API y devuelve un Observable con los datos
  }

  /**
   * Obtiene informacion de la especie de un Pokemon por su nombre
   * @param nombre-El nombre del Pokemon cuya especie se desea obtener
   * @returns Un Observable que emite los datos de la especie del Pokemon
   */
  getPokemonEspecie(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/pokemon-species/${nombre}`);
  }

  /**
   * Obtiene la cadena de evolucion de un Pokemon por su ID
   * @param id-El ID de la cadena de evolución del Pokemon
   * @returns Un Observable que emite los datos de la cadena de evolucion
   */
  getPokemonEvolucion(id: number): Observable<any> { 
    return this.http.get<any>(`${this.urlEndPoint}/evolution-chain/${id}`); 
  }
}




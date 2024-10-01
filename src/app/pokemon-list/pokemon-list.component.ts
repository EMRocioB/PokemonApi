import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styles: []
})

export class PokemonListComponent {
  pokemonName: string = '';
  pokemonElegido: any = null;
  idEvolucion: number = 0;
  evolucionElegida: any;
  evoluciones: any[] = [];
  listaEvoluciones: any[]=[];
  mostrarEvoluciones: boolean = false;

  constructor(private pokemonService: PokemonService) {}//Inyeccion de Dependencia 


  /**
   * Metodo para buscar un Pokemon por su nombre
   * Reinicia la lista de evoluciones y solicita los datos del Pokemon al servicio correspondiente
   * Si se encuentra el Pokemon activa la visualizacion de las evoluciones
   */
  buscarPokemon(): void {
    this.listaEvoluciones=[];
    console.log('Buscando:', this.pokemonName);
    this.pokemonService.getPokemon(this.pokemonName).subscribe(
      response => {
        this.pokemonElegido = response;
        console.log(this.pokemonElegido);
        this.mostrarEvoluciones=true;
      }
    );
  }

  /**
   * Metodo para obtener la evolucion del Pokémon elegido
   * Verifica si el Pokemon tiene una especie asociada y solicita los datos de la especie al servicio
   * Extrae el ID de la evolución y llama al metodo correspondiente para obtener la evolucion
   */
  evolucion(): void {
    console.log("Buscando evolución");
    if (this.pokemonElegido && this.pokemonElegido.species) {
      this.pokemonService.getPokemonEspecie(this.pokemonElegido.species.name).subscribe(
        response => {
          const evolutionUrl = response.evolution_chain.url;
          const partesUrl = evolutionUrl.split('/');
          this.idEvolucion = +partesUrl[partesUrl.length - 2];//Extrae el ID de la evolucion
          console.log('idEvolucion:', this.idEvolucion);
          this.getEvolucion(this.idEvolucion);
        }
      );
    }
  }

  /**
   * Metodo para obtener los datos de la evolucion utilizando el ID
   * Solicita al servicio los datos de la cadena de evolucion y, una vez que se reciben, llama al metodo para analizar las evoluciones
   * @param idEvolucion-El ID de la evolucion a buscar
   */
  getEvolucion(idEvolucion: number): void {
    this.pokemonService.getPokemonEvolucion(idEvolucion).subscribe(
      response => {
        this.evolucionElegida = response;
        console.log('Evolución:', this.evolucionElegida);
        this.analizarEvoluciones(this.evolucionElegida.chain.evolves_to);
      }
    );
  }


   /**
   * Metodo para analizar la lista de evoluciones obtenidas
   * Itera sobre la lista de evoluciones y extrae las especies, almacenándolas en un arreglo
   * Luego llama al metodo para obtener
   * la lista de Pokemon evolucionados
   * 
   * @param lista-Lista de evoluciones a analizar
   */
  analizarEvoluciones(lista: any[]): void {
    this.evoluciones = [];
    let evoluciones = lista;
    while (evoluciones.length > 0) {
      let evolucion = evoluciones[0].species;
      this.evoluciones.push(evolucion); 
      evoluciones = evoluciones[0].evolves_to;
    }
    console.log('Evoluciones Obtenidas:', this.evoluciones);
    this.getListaPokemonEvolucionados();
  }

  /**
   * Metodo para obtener la lista de Pokemon que han evolucionado
   * Para cada Pokemon en la lista de evoluciones, solicita los datos al servicio y evita duplicados en la lista de Pokemon evolucionados
   */
  getListaPokemonEvolucionados(): void {
    this.evoluciones.forEach(p => {
      this.pokemonService.getPokemon(p.name).subscribe(
        response => {
          let pokemon = response;  
          // Verificar si el Pokemon ya esta en la lista para evitar duplicados
          const exists = this.listaEvoluciones.some(e => e.name === pokemon.name);
          if (!exists) {
            this.listaEvoluciones.push(pokemon);
            console.log('lista pokemon final:', this.listaEvoluciones);
          }
        }
      );
    });
  }
  

}


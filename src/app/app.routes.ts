import { Routes } from '@angular/router';//Importa el tipo Routes de Angular Router para definir las rutas de la aplicacion
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';//Importa el componente PokemonListComponent que se usara en las ruta

export const routes: Routes = [
  { 
    path: '',//Ruta raíz de la aplicacion.
    redirectTo: 'pokemon-list',//Redirige a la ruta 'pokemon-list' cuando se accede a la raiz
    pathMatch: 'full'//Asegura que la redireccion solo ocurra si la ruta coincide completamente con la raiz
  },
  { 
    path: 'pokemon-list',//Ruta para la lista de Pokemon.
    component: PokemonListComponent//Asocia el componente PokemonListComponent a esta ruta
  } 
];

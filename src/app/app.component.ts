import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ //Especifica las dependencias que se usaran en este componente
    RouterOutlet, //Permite el uso de rutas hijas dentro de este componente
    FormsModule //Permite usar formularios en este componente
  ],
  templateUrl: './app.component.html',
  styles: []
})


export class AppComponent {
  title = 'Pokemon World';
}






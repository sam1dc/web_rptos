import { Component, computed, inject} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-seccion-inicio',
  templateUrl: './seccion-inicio.component.html',
  styleUrls: ['./seccion-inicio.component.css']
})
export class SeccionInicioComponent {
  private authService = inject(AuthService)
  
  public user = computed(() => this.authService.usuarioActual());

  numero():void{
    console.log(this.user()?.nombre)
  }
}

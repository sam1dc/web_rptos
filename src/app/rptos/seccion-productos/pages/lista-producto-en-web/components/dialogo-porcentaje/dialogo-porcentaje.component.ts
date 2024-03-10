import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-porcentaje',
  templateUrl: './dialogo-porcentaje.component.html',
  styleUrls: ['./dialogo-porcentaje.component.css'],
})
export class DialogoPorcentajeComponent { 

  precio: any; 
  items = new Array(100);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.precio = Number(data);
  }

}


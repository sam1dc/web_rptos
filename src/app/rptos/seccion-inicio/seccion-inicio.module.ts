import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionInicioRoutingModule } from './seccion-inicio-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SeccionInicioComponent } from './seccion-inicio.component';


@NgModule({
  declarations: [
    SeccionInicioComponent
  ],
  imports: [
    CommonModule,
    SeccionInicioRoutingModule,
    MaterialModule
  ]
})
export class SeccionInicioModule { }

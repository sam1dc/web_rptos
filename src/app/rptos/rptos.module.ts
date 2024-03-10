import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RptosRoutingModule } from './rptos-routing.module';
import { RptosComponent } from './rptos.component';
import { SeccionInicioComponent } from './seccion-inicio/seccion-inicio.component';
import { SeccionProductosComponent } from './seccion-productos/seccion-productos.component';

@NgModule({
  declarations: [
    RptosComponent,
  ],
  imports: [
    CommonModule,
    RptosRoutingModule,
    MaterialModule
  ]
})
export class RptosModule { }

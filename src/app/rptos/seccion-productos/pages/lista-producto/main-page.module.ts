import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProductoRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DialogoAgregarProductosWebsComponent } from './components/dialogo-agregar-productos-webs/dialogo-agregar-productos-webs.component';
import { DialogoEvaluacionChoferComponent } from './components/dialogo-evaluacion-chofer/dialogo-evaluacion-chofer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogoVehiculoChoferComponent } from './components/dialogo-vehiculo-chofer/dialogo-vehiculo-chofer.component';
import { DialogoVerBancoComponent } from './components/dialogo-ver-banco/dialogo-ver-banco.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MainPageComponent,
    DialogoAgregarProductosWebsComponent,
    DialogoEvaluacionChoferComponent,
    DialogoVehiculoChoferComponent,
    DialogoVerBancoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ListaProductoRoutingModule,
    SharedModule
  ],
  exports: [
    DialogoEvaluacionChoferComponent,
  ]
})
export class ListaProductoModule { }

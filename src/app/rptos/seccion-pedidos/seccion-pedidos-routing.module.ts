import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeccionPedidosComponent } from './seccion-pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: SeccionPedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionPedidosRoutingModule { }

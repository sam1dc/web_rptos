import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductoEnWebComponent } from './lista-producto-en-web.component';
import { ControlProductosWebComponent } from './pages/control-productos-web/control-productos-web.component';
import { ControlVentasEnWebComponent } from './pages/control-ventas-en-web/control-ventas-en-web.component';

const routes: Routes = [
  {
    path: '',
    component: ListaProductoEnWebComponent,
    children: [
      {
        path:'control-productos-en-web',
        component: ControlProductosWebComponent,
      },
      {
        path:'control-ventas-web',
        component: ControlVentasEnWebComponent,
      },
      {
        path:'**',
        redirectTo: 'control-productos-en-web',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaProductoEnWebRoutingModule { }

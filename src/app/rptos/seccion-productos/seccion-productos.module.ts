import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionProductosRoutingModule } from './seccion-productos-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SeccionProductosComponent } from './seccion-productos.component';


@NgModule({
  declarations: [
    SeccionProductosComponent,
    SidenavComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SeccionProductosRoutingModule
  ]
})
export class SeccionProductosModule { }

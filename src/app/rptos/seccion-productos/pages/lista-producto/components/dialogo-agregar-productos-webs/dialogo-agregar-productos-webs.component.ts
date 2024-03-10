import { Component, Inject, ViewChild, computed, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { AuthService } from 'src/app/auth/services/auth.service';

import { ChoferTabla, Usuario } from 'src/app/rptos/seccion-productos/interfaces';
import Swal from 'sweetalert2';
import { ListaProductoWebService } from '../../../lista-producto-en-web/services/lista-producto-web.service';

interface ProductosEnVentasWeb {
  id_producto: number;
  precio1: string;
  precio2: string;
  id_usuario_ml: number;
}

@Component({
  selector: 'app-dialogo-agregar-productos-webs',
  templateUrl: './dialogo-agregar-productos-webs.component.html',
  styleUrls: ['./dialogo-agregar-productos-webs.component.css']
})
export class DialogoAgregarProductosWebsComponent {
  private productoService = inject(ListaProductoWebService)
  private authService = inject(AuthService)
  private dialofRef = inject(MatDialogRef<DialogoAgregarProductosWebsComponent>)
  public user = computed(() => this.authService.usuarioActual());


  productosAlaBBDD: ProductosEnVentasWeb[] = [];
  usuariosML: Usuario[] = []
  id_usuario_ml: number = 0;
  //escogioUsuario: boolean = false;

  //@ViewChildren(MatFormField) formFields?: QueryList<MatFormField>;
  @ViewChild('selectionList') selectionList?: MatSelectionList;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ChoferTabla[]) {
    if (this.user()?.rol == 1 || this.user()?.rol == 6) {
      this.productoService.getUsuariosML().subscribe(resp => {
        this.usuariosML = resp.usuarios;
      })
    } else if (this.user()?.rol != 3) {
      // this.productoService.getUsuariosML(this.user()?.usuario).subscribe(resp => {
      //   this.usuariosML = resp.usuarios;
      // })
    }
  }

  private sendInfoToBBDD(): void {
    this.productoService.postDesdeListaProducto(this.productosAlaBBDD).subscribe(resp => {
      if (resp["ok"] === true) {
        this.productosAlaBBDD = [];
        Swal.fire('Excelente', resp["msg"], 'success')
      }
      else {
        this.productosAlaBBDD = [];
        Swal.fire('Error', "Error. hablar con el administrador", 'error')
      }
    })
    this.productosAlaBBDD = []
  }

  private pushProductToList(): void {
    let cargar: ProductosEnVentasWeb;
    this.data.forEach(element => {
        cargar = {
          id_producto: element.id,
          precio1: '0.00',
          precio2: element.cedula,
          id_usuario_ml: this.id_usuario_ml
        }
        this.productosAlaBBDD.push(cargar);
    });
  }

  onSelectionChange() {
    const selectedOption = this.selectionList?.selectedOptions.selected[0];
    this.id_usuario_ml = selectedOption?.value;
    this.pushProductToList();
    this.sendInfoToBBDD();
    this.dialofRef.close()
    //this.productosAlaBBDD = []
    //this.escogioUsuario = true;
  }

  // onSubmit() {
  //   let esCampoVacio: boolean = false
  //   this.formFields?.forEach((formField: any) => {
  //     if (formField._control.value.length == 0) {
  //       Swal.fire('Error', "Tiene que colocar el precio a todos los productos", 'error')
  //       esCampoVacio = true;
  //     }
  //     return;
  //   });
  //   if (!esCampoVacio) {
  //     this.formFields?.forEach((formField: any) => {
  //       this.productosAlaBBDD.push(this.productOfUserById(formField));
  //     });

  //   }
  // }
}

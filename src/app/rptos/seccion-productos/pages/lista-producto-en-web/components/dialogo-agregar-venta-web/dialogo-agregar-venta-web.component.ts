import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ListaProductoWebService } from '../../services/lista-producto-web.service';
import { FormasDePago } from 'src/app/rptos/seccion-productos/interfaces/models/formas_de_pago';
import { TiendasEnWeb } from 'src/app/rptos/seccion-productos/interfaces/models/tiendas_web';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoWebsTable } from 'src/app/rptos/seccion-productos/interfaces';

@Component({
  selector: 'app-dialogo-agregar-venta-web',
  templateUrl: './dialogo-agregar-venta-web.component.html',
  styleUrls: ['./dialogo-agregar-venta-web.component.css']
})
export class DialogoAgregarVentaWebComponent{
  private productoService = inject(ListaProductoWebService)
  private fb = inject(FormBuilder)
  private dialofRef = inject(MatDialogRef<DialogoAgregarVentaWebComponent>)
  
  
  pagoSeleccionado: string = '';
  usuario_ml_id: number;
  tiendaSeleccionada: string = '';
  nombreProducto: string = '';
  formasDePago:FormasDePago[] = []
  tiendasWeb:TiendasEnWeb[] = []
  items: ProductoWebsTable[] = [];
  selectedFiles: File[] = [];
  
  notasFormulario: FormGroup = this.fb.group({
    pago: ['', [Validators.required, Validators.maxLength(255)]],
    tienda: ['', [Validators.required, Validators.maxLength(255)]],
    nombre_cliente: ['', [Validators.required, Validators.maxLength(255)]],
  });

  //formGroup: FormGroup;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: { usuario_ml_id: number; items: ProductoWebsTable[] }) {
    this.items = data.items;
    this.usuario_ml_id = data.usuario_ml_id;
    //this.formGroup = this.createForm();
    this.productoService.getFormaDePagos().subscribe(resp => {
        this.formasDePago = resp;
      });
      this.productoService.getRedesSociales().subscribe(resp => {
        this.tiendasWeb = resp;
      });

      // Crea el FormGroup dinámicamente utilizando el FormBuilder
      //this.formGroup = this.fb2.group({});
      
      // Agrega los mat-form-fields al FormGroup según el arreglo de items
      for (let index = 0; index < this.items.length; index++) {
        this.notasFormulario.addControl(`cantidad${index}`, this.fb.control('', [Validators.required, Validators.maxLength(255)])); 
      }
  }

  guardarNota(): void {
    let itemsArrglo: any[] = [];
    const { pago, tienda, nombre_cliente } = this.notasFormulario.value;
    for (let index = 0; index < this.items.length; index++) {
      const producto = {
        producto_id: this.items[index].id_producto,
        cantidad: this.notasFormulario.value[`cantidad${index}`],
        precio2: this.items[index].precio2,
        precio_porc: this.items[index].precio1_porc,
        precio2_porc: this.items[index].precio2_porc
      }
      itemsArrglo.push(producto)
    }
    const body = {
      usuario_ml_id: this.usuario_ml_id,
      items: itemsArrglo,
      nombre_cliente,
      pago,
      tienda
    }

    this.productoService.postVentas(body)
    .subscribe(resp => {
      if(resp["ok"] === true){

        Swal.fire('Excelente', resp["msg"], 'success')
      }
      else{
        Swal.fire('Error', "Error. hablar con el administrador", 'error')
      }
    })
    this.dialofRef.close()
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  clearSelectedFiles(): void{
    this.selectedFiles = [];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const dataTransfer = event.dataTransfer;
    if (dataTransfer?.files) {
      this.selectedFiles = Array.from(dataTransfer.files);
    }
  }

}

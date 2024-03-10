import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeccionPedidosService } from '../../services/seccion-pedidos.service';
import { FotoPedidoAlmacen } from '../../interfaces/models/foto_pedido_almacen';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { carouselImage } from 'src/app/shared/utils/carousel_image.interface';

@Component({
  selector: 'app-dialogo-mostrar-foto',
  templateUrl: './dialogo-mostrar-foto.component.html',
  styleUrls: ['./dialogo-mostrar-foto.component.css']
})
export class DialogoMostrarFotoComponent {
  private pedidoAlmacenService = inject(SeccionPedidosService);
  public fotoPedidoAlmacen: carouselImage[] = [];
  private baseUrl: string = environment.baseUrl;
  isLoading = false;
  selectedFiles: File[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
    this.pedidoAlmacenService.getFotosPedidoAlmacen(data)
    .subscribe(resp => {
      resp.map(e => {
        this.fotoPedidoAlmacen.push(
          {
            idImage: e.id,
            imageSrc:  `https://coreanosrptos.com/api/foto_pedido_almacen/uploads/${e.img}`,
            imageAlt: e.img
          }
        );
      });
    })
  }

  borrarImagen(id: number){
      Swal.fire({
      title: '¿Estás seguro de borrar esta imagen?',
      showCancelButton: true,
      confirmButtonText: 'Borrar Imagen',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoAlmacenService.borrarFotoPedido(id).subscribe(resp => {
          if(resp["ok"]){
            Swal.fire('Excelente', resp["msg"], 'success')
          }else{
            Swal.fire('Error', resp["msg"], 'error')
          }
        });
      } else if (result.isDenied) {
        
      }
    })
  }


  cargarArchivos(images: File[]){

    this.isLoading = true;

    const formData = new FormData();
    for (const file of images) {
      formData.append('images', file, file.name);
    }

    this.pedidoAlmacenService.postFotosPedidosAlmacen(formData, this.data)
    .subscribe( resp => {
      if(resp["ok"]){
        Swal.fire('Excelente', resp["message"], 'success')
        this.isLoading = false
      }
      else{
        Swal.fire('Hubo un error', resp["message"], 'error')
        this.isLoading = false
      }
    });

  }
}

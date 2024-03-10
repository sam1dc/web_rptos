import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FotoProducto } from 'src/app/rptos/seccion-productos/interfaces/models/foto_producto';
import { carouselImage } from 'src/app/shared/utils/carousel_image.interface';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Banco } from 'src/app/rptos/seccion-productos/interfaces/models/banco';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'app-dialogo-ver-imagen',
  templateUrl: './dialogo-ver-banco.component.html',
  styles: [
  ]
})
export class DialogoVerBancoComponent {
  private MainPageService = inject(MainPageService);
  private fb = inject(FormBuilder);

  bancoFormulario: FormGroup = this.fb.group({
    idBanco: ['', [Validators.maxLength(255)]],
    nroCuenta: ['', [Validators.maxLength(255)]],
  });

  choferId: number = 0;
  public fotoProducto: carouselImage[] = [];
  public bancos: Banco[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
    //Id del chofer
    this.choferId = data;

    this.MainPageService.getBancos()
      .subscribe(resp => {
        this.bancos = resp;
      })
    };


    guardarEntidadBancaria(): void {
      const estado = 'Activo';
      const { idBanco, nroCuenta } = this.bancoFormulario.value;
      const body = {idBanco, nroCuenta, estado}
      this.MainPageService.postBancoChofer(this.choferId, body)
      .subscribe(resp => {
        if(resp["message"] === 'Datos bancarios del chofer agregados con éxito.'){
          Swal.fire('Excelente', resp["message"], 'success')
        }
        else{
          Swal.fire('Error', "Error. hablar con el administrador", 'error')
        }
      })
    }

  }

//   cargarFotoProducto(images: File[]){
//     console.log(images);
//     const formData = new FormData();
//     for (const file of images) {
//       formData.append('images', file, file.name);
//     }

//     this.MainPageService.postFotosProducto(formData, this.productoId)
//     .subscribe( resp => {
//       Swal.fire('Excelente', resp["message"], ( resp["ok"] ) ? 'success' : 'error')
//     });
//    }
// }


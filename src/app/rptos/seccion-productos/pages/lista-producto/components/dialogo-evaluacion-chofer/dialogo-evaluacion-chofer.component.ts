import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ListaProductoWebService } from '../../../lista-producto-en-web/services/lista-producto-web.service';
import { EvaluacionChofer } from 'src/app/rptos/seccion-productos/interfaces/models/evaluacion_chofer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VehiculoTabla } from 'src/app/rptos/seccion-productos/interfaces/vehiculo-tabla';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'app-dialogo-nota-producto',
  templateUrl: './dialogo-evaluacion-chofer.component.html',
  styleUrls: ['./dialogo-evaluacion-chofer.component.css']
})
export class DialogoEvaluacionChoferComponent {
  private MainPageService = inject(MainPageService);
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
    this.MainPageService.getEvaluacionChofer(data)
    .subscribe( resp => {
      this.tagInput.nativeElement.value = resp.calificacion.toString();
    })
  }


  valueOfInput(): void{
    console.log("Hola");
    // const ubicacion = this.tagInput.nativeElement.value
    // const body = { productoid: this.data.productoid, distid: this.data.distid, ubicacion }
    // this.MainPageService.postUbicaciones(body)
    // .subscribe( resp => {
    //   if(resp["ok"] === true){
    //     Swal.fire('Excelente', resp["msg"], 'success');
    //     this.searchUbicacion();
    //   }
    //   else{
    //     Swal.fire('Error', "Error. hablar con el administrador", 'error');
    //   }
    // })
  }
}

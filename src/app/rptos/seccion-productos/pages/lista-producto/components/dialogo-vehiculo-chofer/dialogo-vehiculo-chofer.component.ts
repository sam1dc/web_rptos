import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Ubicacion } from 'src/app/rptos/seccion-productos/interfaces/models/ubicaciones';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoTabla } from 'src/app/rptos/seccion-productos/interfaces/vehiculo-tabla';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Vehiculo } from 'src/app/rptos/seccion-productos/interfaces/vehiculo-response';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'app-dialogo-ubicaciones',
  templateUrl: './dialogo-vehiculo-chofer.component.html',
  styles: [
  ]
})
export class DialogoVehiculoChoferComponent {
  private MainPageService = inject(MainPageService)

  displayedColumns: string[] = ['id', 'marca', 'color', 'placa', 'fecha', 'evaluacion'];
  dataSource!: MatTableDataSource<VehiculoTabla>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  public vehiculos: Vehiculo[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
    this.getVehiculo();
  }

  private getVehiculo():void{
    this.MainPageService.getVehiculosChofer(this.data)
    .subscribe( resp => {
      this.vehiculos = resp.chofer.vehiculos
      const users = Array.from({ length: this.vehiculos.length }, (_, k) => this.crearVehiculosChofer(k));
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

    /** Builds and returns a new Products. */
    crearVehiculosChofer(i: number): VehiculoTabla {
      return {
        id: this.vehiculos[i].id,
        marca: this.vehiculos[i].marca,
        color: this.vehiculos[i].color,
        placa: this.vehiculos[i].placa,
        anio_fabricacion: this.vehiculos[i].anio_fabricacion,
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    openDialogEvaluacionVehiculo(element:VehiculoTabla){
      console.log("Hola");
    }
}

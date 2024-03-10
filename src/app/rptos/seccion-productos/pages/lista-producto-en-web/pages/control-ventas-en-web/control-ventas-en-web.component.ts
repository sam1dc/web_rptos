import { Component, ViewChild, computed, inject } from '@angular/core';
import { DialogoNotasVentasComponent } from '../../components/dialogo-notas-ventas/dialogo-notas-ventas.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
// import { ProductoService } from 'src/app/rptos/productos/services/producto.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductoTablaVentas, Venta } from 'src/app/rptos/seccion-productos/interfaces';
// import { Venta } from 'src/app/rptos/productos/interface/ventas-web-response';
import { ListaProductoWebService } from '../../services/lista-producto-web.service';
import { DialogoDetalleVentaComponent } from '../../components/dialogo-detalle-venta/dialogo-detalle-venta.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-ventas-en-web',
  templateUrl: './control-ventas-en-web.component.html',
  styleUrls: ['./control-ventas-en-web.component.css']
})
export class ControlVentasEnWebComponent {
  private authService = inject(AuthService)
  private productoService = inject(ListaProductoWebService)
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder)

  fechaVentaFormulario: FormGroup = this.fb.group({
    mes: ['', [Validators.required, Validators.maxLength(255)]],
    anio: ['', [Validators.required, Validators.maxLength(255)]],
  });

  public anios = ['Todos', 2023]
  public meses = [
    {nombre: "Enero",value: 1},{nombre: "Febrero",value: 2},{nombre: "Marzo",value: 3},
    {nombre: "Abril",value: 4},{nombre: "Mayo",value: 5},{nombre: "Junio",value: 6},
    {nombre: "Julio",value: 7},{nombre: "Agosto",value: 8},{nombre: "Septiembre",value: 9},
    {nombre: "Octumbre",value: 10},{nombre: "Noviembre",value: 11},{nombre: "Diciembre",value: 12},
  ];
  isLoading = false;
  message: string = '';
  ventas: Venta[] = [];
  displayedColumns: string[] = ['id', 'vendedor', 'cliente', 'red', 'pago', 'fecha', 'notas', 'detalle', 'eliminar'];
  dataSource!: MatTableDataSource<ProductoTablaVentas>;
  public user = computed(() => this.authService.usuarioActual());

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getVentasFromBBDD()
  }

  public getVentasFromBBDD(): void {
    if (this.user()?.rol == 1 || this.user()?.rol == 6 || (this.user()?.rol == 2)) {
      this.productoService.getVentas().subscribe(resp => {
        this.ventas = resp.ventas
        const users = Array.from({ length: this.ventas.length }, (_, k) => this.creaInformacionDeVentas(k));
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
      })
    } else if (this.user()?.rol != 3) {
      // this.productoService.getVentas(this.user()?.usuario).subscribe(resp => {
      //   this.ventas = resp.ventas
      //   const users = Array.from({ length: this.ventas.length }, (_, k) => this.creaInformacionDeVentas(k));
      //   this.dataSource = new MatTableDataSource(users);
      //   this.dataSource.paginator = this.paginator;
      // })
    }
  }

  creaInformacionDeVentas(i: number): ProductoTablaVentas {
    return {
      id: this.ventas[i].id,
      vendedor: this.ventas[i].usuarios_mercadolibre.correo,
      cliente: this.ventas[i].nombre_cliente,
      forma_de_pago: this.ventas[i].formas_de_pago.nombre,
      red: this.ventas[i].tiendas_web.nombre,
      fecha: this.ventas[i].fecha_venta.toString()
    }
  }

  openDialogDetalles(element: ProductoTablaVentas) {
    // const usuario_ml_id = this.id_usuario_ml;
    // const producto_id = element.id_producto;
    // const tipoProducto = element.nombre;
    // const body = {usuario_ml_id, producto_id, tipoProducto};
    this.dialog.open(DialogoDetalleVentaComponent, {
      data: element.id
    })
  }

  borrarProducto(id: number) {
    Swal.fire({
      title: '¿Estás seguro de borrar esta venta?',
      text: "¡Este cambio no podrá ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productoService.deleteVenta(id).subscribe(resp => {
          if (resp["ok"] == true) {
            Swal.fire(
              'Borrado!',
              resp["msg"],
              'success'
            );
            this.getVentasFromBBDD();
          } else {
            Swal.fire(
              'Error!',
              resp["errorMsg"],
              'error'
            );
          }
        })
      }
    })
  }

  openDialog(element: any) {
    //console.log(element);
    this.dialog.open(DialogoNotasVentasComponent, {
      data: element.id,
    })
  }

  buscarPorFecha():void {
    const {mes, anio} = this.fechaVentaFormulario.value;
    if(anio === 'Todos'){
      this.getVentasFromBBDD();
    }else{
      this.productoService.getVentasPorFecha(mes, anio).
      subscribe( resp => {
        this.ventas = resp.ventas
          const users = Array.from({ length: this.ventas.length }, (_, k) => this.creaInformacionDeVentas(k));
          this.dataSource = new MatTableDataSource(users);
          this.dataSource.paginator = this.paginator;
      });
    }
  }
}

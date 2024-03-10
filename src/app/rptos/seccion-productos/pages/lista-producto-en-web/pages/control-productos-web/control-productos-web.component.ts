import { Component, ViewChild, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductoWebsTable, Usuario } from 'src/app/rptos/seccion-productos/interfaces';
import Swal from 'sweetalert2';
import { DialogoAgregarVentaWebComponent } from '../../components/dialogo-agregar-venta-web/dialogo-agregar-venta-web.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ListaProductoWebService } from '../../services/lista-producto-web.service';
import { Productosml } from 'src/app/rptos/seccion-productos/interfaces/producto-webs-response';
import { DialogoPorcentajeComponent } from '../../components/dialogo-porcentaje/dialogo-porcentaje.component';

@Component({
  selector: 'app-control-productos-web',
  templateUrl: './control-productos-web.component.html',
  styleUrls: ['./control-productos-web.component.css']
})
export class ControlProductosWebComponent {
  private authService = inject(AuthService)
  private productoService = inject(ListaProductoWebService)
  public dialog = inject(MatDialog)

  //id del la tabla usuarios_mercadolibre
  id_usuario_ml: number = 0;
  products: any[] = [];
  productsTemp: any[] = [];
  users: Usuario[] = [];
  isLoading = false;
  message: string = '';
  selectedFile?: File;
  dataSource!: MatTableDataSource<Usuario>;
  dataSourceTemp!: MatTableDataSource<ProductoWebsTable>;

  //checkbox
  selection = new SelectionModel<ProductoWebsTable>(true, []);
  selectedRows: ProductoWebsTable[] = [];
  showButton: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("MatProductosTempPaginator") productosTempPaginator!: MatPaginator;


  usersML: string[] = ['id', 'nombre', 'correo'];
  productsML: string[] = ['checkbox', 'id_producto', 'nombre', 'codigo', 'marca', 'precio2', 'precio1_porc', 'precio2_porc', 'perc', 'notas', 'eliminar']
  productsMLTemp: string[] = ['id_producto', 'nombre', 'codigo', 'marca', 'precio2', 'precio1_porc', 'precio2_porc', 'perc']
  public user = computed(() => this.authService.usuarioActual());
  
  constructor() { }

  ngOnInit(): void {
    if(this.user()?.rol == 1 || this.user()?.rol == 6){
      this.dataSource = new MatTableDataSource(this.products);
      this.productoService.getUsuariosML().subscribe(resp => {
        this.users = Array.from({ length: resp.usuarios.length }, (_, k) => this.createNewUser(k, resp.usuarios));
        this.dataSource = new MatTableDataSource(this.users);
      })
    }else if(this.user()?.rol != 3){
      // this.dataSource = new MatTableDataSource(this.products);
      // this.productoService.getUsuariosML(this.user()?.usuario).subscribe(resp => {
      //   this.users = Array.from({ length: resp.usuarios.length }, (_, k) => this.createNewUser(k, resp.usuarios));
      //   this.dataSource = new MatTableDataSource(this.users);
      // })
    }
  }

  //Cuando el usuario selecciona un empleado entonces se cargar los productos
  selectedUser(id_usuario_ml:number) {
    this.id_usuario_ml = id_usuario_ml;
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSourceTemp = new MatTableDataSource(this.productsTemp);

    // this.productoService.getProductosML(this.id_usuario_ml).subscribe(resp => {
    //   this.products = Array.from({ length: resp.productosml.length }, (_, k) => this.productOfUserById(k, resp.productosml));
    //   this.dataSource.data = this.products;
    //   this.dataSource.paginator = this.paginator;
    // });

    // this.productoService.getProductosmlTemp(this.id_usuario_ml).subscribe(resp => {
    //   this.productsTemp = Array.from({ length: resp.productosml.length }, (_, k) => this.productOfUserById(k, resp.productosml));
    //   this.dataSourceTemp.data = this.productsTemp;
    //   this.dataSourceTemp.paginator = this.productosTempPaginator;
    // });
  }

  selectedProduct(id:number){
    Swal.fire({
      title: '¿Estás seguro de borrar este artículo?',
      text: "¡Este cambio no podrá ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.productoService.deleteProduct(id).subscribe(resp => {
          if(resp["ok"] == true){
            Swal.fire(
              'Borrado!',
              resp["msg"],
              'success'
            );
            this.selectedUser(this.id_usuario_ml);
          }else{
            Swal.fire(
              'Error!',
              resp["errorMsg"],
              'error'
            );
          }
        })
      }
    });
  }

  DeleteAllProducts(){
    Swal.fire({
      title: '¿Estás seguro de borrar todos los artículo a actualizar?',
      text: "¡Este cambio no podrá ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.productoService.deleteAllProduct(this.id_usuario_ml).subscribe(resp => {
          if(resp["ok"] == true){
            Swal.fire(
              'Borrado!',
              resp["msg"],
              'success'
            );
            this.selectedUser(this.id_usuario_ml);
          }else{
            Swal.fire(
              'Error!',
              resp["errorMsg"],
              'error'
            );
          }
        })
      }
    });
  }

  selectedProductTemp(id:number){
    Swal.fire({
      title: '¿Estás seguro de montar este artículo?',
      text: "Usted esta realmente consiente que este acto quiere decir que dicho producto que seleccionó\
            ya fue montado o actualizado el precio en MercadoLibre. ¿Aun así quiere continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero continuar'
    }).then((result:any) => {
      if (result.isConfirmed) {
        // el primer id representa el id en la tabla producto_mercadolibre_temp
        // el segundo es el id del usuarios_mercadolibre
        this.productoService.getProductoML(id, this.id_usuario_ml).subscribe(resp => {
          if(resp["ok"] == true){
            Swal.fire(
              'Cargado!',
              resp["msg"],
              'success'
            );
            this.selectedUser(this.id_usuario_ml);
          }else{
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

  selectUserAgain(): void {
    this.id_usuario_ml = 0;
    this.selectedRows = [];
    this.dataSource = new MatTableDataSource(this.users);
  }


  onUpload() {
    if (this.selectedFile == undefined) {
      Swal.fire('Error', "No ha subido ningún archivo!", 'error')
    } else {
      this.isLoading = true;
      this.message = "Cargando/Actulizando productos. Espere un momento por favor."
      this.productoService.postExcelProductMl(this.id_usuario_ml, this.selectedFile, this.user()?.rol)
        .subscribe(resp => {
          if (resp["ok"] === true) {
            this.selectedUser(this.id_usuario_ml);
            Swal.fire('Todo correcto!!', resp["msg"], 'success')
          }
          else {
            Swal.fire('Error', "Sucedió un error. Notificar a administración", 'error')
          }
          this.isLoading = false;
        })
    }
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTemp.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTemp.paginator) {
      this.dataSourceTemp.paginator.firstPage();
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /** Builds and returns a new User. */
  createNewUser(id: number, usuarios: Usuario[]): any {
    return {
      id: usuarios[id].id,
      nombre: usuarios[id].empleado.nombre,
      correo: usuarios[id].correo,
      estado: usuarios[id].estado
    }
  }

  // productOfUserById(i: number, products: Productosml[]): any {
  //   return {
  //     id: products[i].id,
  //     id_producto:products[i].id_producto,
  //     nombre: products[i].producto.nombre,
  //     codigo: products[i].producto.codigo,
  //     precio1: products[i].precio1,
  //     precio2: products[i].precio2,
  //     precio1_porc: products[i].precio1_porc,
  //     precio2_porc: products[i].precio2_porc,
  //     marca: products[i].producto.marca.nombre,
  //   }
  // }

  openDialogNotas(element:ProductoWebsTable){
    console.log("Nota");
    // this.dialog.open(DialogoNotaProductoComponent, {
    //   data: element.id_producto,
    // })
  }

  onRowSelect(event:any, row:any) {
    if (event.checked) {
      this.selectedRows.push(row);
    } else {
      const index = this.selectedRows.indexOf(row);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      }
    }
    this.showButton = this.selectedRows.length > 0;
  }

  crearVenta() {
    const usuario_ml_id = this.id_usuario_ml;
    this.dialog.open(DialogoAgregarVentaWebComponent, {
      data: { 
        usuario_ml_id, 
        items: this.selectedRows 
      },
    })
  }

  openDialogPercent(event:any){
    this.dialog.open(DialogoPorcentajeComponent, {
      data: event.precio2 
    })
  }
}

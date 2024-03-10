import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environments';
import { Chofer, Chofere,} from '../../../interfaces';
import { ProductoService } from '../../../services/producto.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { UbicacionesResponse } from '../../../interfaces/ubicaciones-response';
import { Banco } from '../../../interfaces/models/banco';
import { EvaluacionChofer } from '../../../interfaces/models/evaluacion_chofer';
import { VehiculoResponse } from '../../../interfaces/vehiculo-response';

@Injectable({
  providedIn: 'root'
})
export class MainPageService extends ProductoService {

//Obtiene los choferes
  getChoferes(): Observable<Chofer>{
    const url = `${this.baseUrl}/choferes`;
    return this.http.get<Chofer>(url)
    // .pipe(
    //   tap (resp => {
    //     this.producto = resp.productos
    //   })
    // )
  }

//Obtiene los bancos
  getBancos(): Observable<Banco[]>{
    const url = `${this.baseUrl}/bancos`;
    return this.http.get<Banco[]>(url);
  }

  //Obtener la evaluacion del chofer
  getEvaluacionChofer(id:number): Observable<EvaluacionChofer>{
    const url = `${this.baseUrl}/choferes/${id}/evaluacion-psicologica`;
    return this.http.get<EvaluacionChofer>(url);
  }

  getVehiculosChofer(id:number): Observable<VehiculoResponse>{
    const url = `${this.baseUrl}/choferes/${id}/vehiculos`;
    return this.http.get<VehiculoResponse>(url);
  }

  //Para agregar una entidad bancaria como pago al chofer
  postBancoChofer(id:number, body: any): Observable<any>{
    const url = `${this.baseUrl}/agregar-banco-chofer/${id}`;
    return this.http.post<any>(url, body)
  }


  postExcelProduct(selectedFile?: File):Observable<any>{

    if(selectedFile != null){
      const formData = new FormData();
      formData.append('files', selectedFile, selectedFile.name);
      const url = `${this.baseUrl}/productos/actualizar_producto`;
      return this.http.post<any>(url, formData)
      .pipe(
        catchError( (error: Error) => of({ok: false, msg: error.message})),
      );;
    }
    return of("El archivo esta vacio"); 
  }

  getUbicaciones(productoid:number, distid:string):Observable<UbicacionesResponse>{
    const url = `${this.baseUrl}/ubicaciones/${productoid}/${distid}`;
    return this.http.get<UbicacionesResponse>(url)
  }

  postUbicaciones(body: any):Observable<any>{
    const url = `${this.baseUrl}/ubicaciones/postUbicacion`;
    return this.http.post<any>(url, body);
  }

  deleteUbicacion(id: number):Observable<any>{
    const url = `${this.baseUrl}/ubicaciones/deleteUbicacion/${id}`;
    return this.http.delete<any>(url);
  }

  postFotosProducto(body:any, idProducto: number): Observable<any>{
    const url = `${this.baseUrl}/foto_producto/postFotoProducto/${idProducto}`;
    return this.http.post<any>(url, body);
  }

  deleteProducts(body:any): Observable<any>{
    const url = `${this.baseUrl}/productos/deleteProducto`;
    return this.http.put<any>(url, body);
  }
}

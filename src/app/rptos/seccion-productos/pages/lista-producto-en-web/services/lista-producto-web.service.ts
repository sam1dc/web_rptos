import { Injectable } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Observable } from 'rxjs';
import { ItemsVentasWebResponse, NotaReponse, NotasVentasWebResponse, VentasWebResponse } from '../../../interfaces';
import { FormasDePago } from '../../../interfaces/models/formas_de_pago';
import { TiendasEnWeb } from '../../../interfaces/models/tiendas_web';
import { of } from 'rxjs/internal/observable/of';
import { UsuariosWebs } from '../../../interfaces/usuario-webs-response';
import { ProductosMercadolibreResponse } from '../../../interfaces/producto-webs-response';
import { FotoComprobante } from '../../../interfaces/models/foto_comprobante_pago';
import { FotoProductoVenta } from '../../../interfaces/models/foto_producto_venta';

@Injectable({
  providedIn: 'root'
})
export class ListaProductoWebService extends ProductoService {

  constructor() {
    super();
  }

  getUsuariosML(usuario:number = 0): Observable<UsuariosWebs>{
    if(usuario == 0){
      const url = `${this.baseUrl}/productos_ml/getUsuariosML`;
      return this.http.get<UsuariosWebs>(url);
    }else{
      const url = `${this.baseUrl}/productos_ml/getUsuariosML?usuario=${usuario}`;
      return this.http.get<UsuariosWebs>(url);
    }
  }

  getProductosML(id:number): Observable<ProductosMercadolibreResponse>{
    const url = `${this.baseUrl}/productos_ml/getproductos?userId=${id}`;
    return this.http.get<ProductosMercadolibreResponse>(url);
  }

  getProductosmlTemp(id:number): Observable<ProductosMercadolibreResponse>{
    const url = `${this.baseUrl}/productos_ml/getProductosmlTemp?userId=${id}`;
    return this.http.get<ProductosMercadolibreResponse>(url);
  }

  getProductoML(id_producto:number, id_usuario_ml:number): Observable<any>{
    const url = `${this.baseUrl}/productos_ml/getProductoML?id_producto=${id_producto}&usuario_ml=${id_usuario_ml}`;
    return this.http.get<any>(url)
  }

  postExcelProductMl(id:number, selectedFile?: File, rol:number = 0):Observable<any>{

    if(selectedFile != null){
      const formData = new FormData();
      formData.append('files', selectedFile, selectedFile.name);

      if( rol == 1 || rol == 6){
        const url = `${this.baseUrl}/productos_ml/postActualizarPrecio?usuario_ml=${id}`;
        return this.http.post<any>(url, formData);
      }else{
        const url = `${this.baseUrl}/productos_ml/uploads?usuario_ml=${id}`;
        return this.http.post<any>(url, formData);
      }
    }
    return of("El archivo esta vacio"); 
  }

  postDesdeListaProducto(body:any): Observable<any>{
    const url = `${this.baseUrl}/productos_ml/insertarDesdeListaProducto`;
    return this.http.post<any>(url, body);
  }

  deleteAllProduct(id_usuario_ml:number): Observable<any>{
    const url = `${this.baseUrl}/productos_ml/deleteAllProducto?id_usuario_ml=${id_usuario_ml}`;
    return this.http.delete<any>(url);
  }

  deleteProduct(id:number): Observable<any>{
    const url = `${this.baseUrl}/productos_ml/deleteProducto?id=${id}`;
    return this.http.delete<any>(url);
  }

  getNotasProductoById(id_producto:number): Observable<NotaReponse>{
    const url = `${this.baseUrl}/notas?id_producto=${id_producto}`;
    return this.http.get<NotaReponse>(url);
  }

  postNotasProducto(body:any): Observable<any>{
    const url = `${this.baseUrl}/notas/postNota`;
    return this.http.post<any>(url, body);
  }

  getNotasVentasWebById(id_ventas_web:number): Observable<NotasVentasWebResponse>{
    const url = `${this.baseUrl}/notas_web?id_ventas_web=${id_ventas_web}`;
    return this.http.get<NotasVentasWebResponse>(url);
  }

  postNotasVentasWeb(body:any): Observable<any>{
    const url = `${this.baseUrl}/notas_web/postNota`;
    return this.http.post<any>(url, body);
  }

  getVentas(usuario:number = 0): Observable<VentasWebResponse>{
    if(usuario == 0){
      const url = `${this.baseUrl}/ventas_web`;
      return this.http.get<VentasWebResponse>(url)
    }else{
      const url = `${this.baseUrl}/ventas_web?usuario=${usuario}`;
      return this.http.get<VentasWebResponse>(url)
    }
  }

  getVentasPorFecha(mes: number, anio: number):Observable<VentasWebResponse>{
    const url = `${this.baseUrl}/ventas_web/getventasPorFecha?mes=${mes}&anio=${anio}`;
    return this.http.get<VentasWebResponse>(url);
  }

  postVentas(body:any): Observable<any>{
    const url = `${this.baseUrl}/ventas_web/postVentas`;
    return this.http.post<any>(url, body);
  }

  deleteVenta(id:number): Observable<any>{
    const url = `${this.baseUrl}/ventas_web/deleteVenta?id=${id}`;
    return this.http.delete<any>(url);
  }

  getItemsVentasWeb(ventas_web_id:number):Observable<ItemsVentasWebResponse>{
    const url = `${this.baseUrl}/items_ventas_web/byId?ventas_web_id=${ventas_web_id}`;
    return this.http.get<ItemsVentasWebResponse>(url);
  }

  getFormaDePagos():Observable<FormasDePago[]>{
    const url = `${this.baseUrl}/formas_de_pago`;
    return this.http.get<FormasDePago[]>(url);
  }

  getRedesSociales():Observable<TiendasEnWeb[]>{
    const url = `${this.baseUrl}/tiendas_web`;
    return this.http.get<TiendasEnWeb[]>(url);
  }

  getFotosComprobante(idVenta: number): Observable<FotoComprobante[]>{
    const url = `${this.baseUrl}/foto_comprobante/${idVenta}`;
    return this.http.get<FotoComprobante[]>(url);
  }

  postFotosComprobante(body:any, idVenta: number): Observable<any>{
    const url = `${this.baseUrl}/foto_comprobante/postImagenVenta/${idVenta}`;
    return this.http.post<any>(url, body);
  }

  getFotosProductosVentas(idVenta: number): Observable<FotoProductoVenta[]>{
    const url = `${this.baseUrl}/foto_producto_venta/${idVenta}`;
    return this.http.get<FotoProductoVenta[]>(url);
  }

  postFotosProductosVentas(body:any, idVenta: number): Observable<any>{
    const url = `${this.baseUrl}/foto_producto_venta/postImagenProductoVenta/${idVenta}`;
    return this.http.post<any>(url, body);
  }
}

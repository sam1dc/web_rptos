// import { Producto } from "./models/chofer";

export interface ProductosMercadolibreResponse {
    ok:          boolean;
    productosml: Productosml[];
}

export interface Productosml {
    id:           number;
    id_producto:  number;
    precio1:      string;
    precio2:      string;
    precio1_porc: string;
    precio2_porc: string;
    precio3_porc: string;
    // producto:     Producto;
}

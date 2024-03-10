// import { Producto } from "./models/chofer";

export interface ItemsVentasWebResponse {
    ok:          boolean;
    itemsVentas: ItemsVenta[];
}

export interface ItemsVenta {
    id:               number;
    cantidad_vendida: number;
    estado:           boolean;
    // producto:         Producto;
}

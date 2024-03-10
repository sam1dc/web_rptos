import { Marca } from "./marca";

export interface ProductoWebsTable {
    id:           number;
    id_producto:  number;
    codigo:       string;
    nombre:       string;
    precio1:      string;
    precio2:      string;
    precio1_porc: string;
    precio2_porc: string;
    precio3_porc: string;
    marca:        Marca;
}
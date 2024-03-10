export interface NotasVentasWebResponse {
    ok:       boolean;
    detalles: Detalles;
}

export interface Detalles {
    id:            number;
    id_ventas_web: number;
    nota2:         string;
    nota3:         string;
}
